'use strict';

const queryString = require('querystring');
const url = require('url');

const {cloneDeep} = require('./../utils/object_utils');

const {
    normalizeURLPath,
    parseURLPathParams,
    extractPOSTDataFromRequest,
    getMIMETypeForFileExtension
} = require('./../utils/server_request_utils');

const {
    SERVER_DOMAIN,
    HTML_PAGES_DIRECTORY_PATH,
    RESOURCES_DIRECTORY_PATH,
} = require ('./../constants/general_server_constants');

const HTTP_STATUS_CODES = require('./../constants/http_status_codes');

class BasicServerClass {
    _isHTTPSUsed() {
        return this._isHTTPS;
    }

    _isRequestHeaderExist(headerName) {
        const preparedHeaderName = headerName.toLowerCase();

        return this._request.headers[headerName] && this._request.headers[preparedHeaderName];
    }

    _prepareRequestURLPath(preparedRequestURL) {
        const [urlPathString, urlQueryString] = preparedRequestURL ? preparedRequestURL.split('?') : ['', ''];

        return {
            urlPathParams: parseURLPathParams(urlPathString),
            urlQueryParams: queryString.parse(urlQueryString)
        };
    }

    _prepareRequestURL() {
        const decodedRequestURL = decodeURI(this._request.url);
        return decodedRequestURL[0] === '/' ? decodedRequestURL.substring(1) : decodedRequestURL;
    }

    _addCustomRoute(customRoute) {
        this._routes.push(customRoute);
    }

    _findCustomRouteForCurrentRequest() {
        const urlPath = this._getRequestURLPath();
        const preparedURLPath = normalizeURLPath(urlPath);
        const requestMethod = this._getRequestMethod();
        const requestHostname = this._getRequestHostname();

        return this._routes.find(route => {
            if (route.method && route.method.toLocaleLowerCase() !== requestMethod) {
                return false;
            }

            if (route.hostname && route.hostname !== requestHostname) {
                return false;
            }

            if (typeof route.path === 'string') {
                const normalizedURLPath = normalizeURLPath(route.path);
                return normalizedURLPath === '' ? false : normalizedURLPath === preparedURLPath;
            } else {
                return route.path.test(preparedURLPath);
            }
        });
    }

    _writeHead(statusCode) {
        this._response.writeHead(statusCode, this._responseHeaders);
    };

    _clearResponseHeaders() {
        this._responseHeaders = [];
    }

    _addResponseHeader(headerName, headerValue, override = true) {
        let headerIndex = -1;
        const normalizedHeaderName = headerName.toLowerCase();

        if (override) {
            headerIndex = this._responseHeaders.findIndex(header => {
                return header[0] === normalizedHeaderName;
            });
        }

        if (headerIndex === -1) {
            this._responseHeaders.push([normalizedHeaderName, headerValue])
        } else {
            this._responseHeaders[headerIndex][1] = headerValue;
        }
    }

    _addResponseHeaders(responseHeaders) {
        for (const headerName in responseHeaders) {
            this._addResponseHeader(headerName, responseHeaders[headerName ]);
        }
    }

    _serveEmptyResponse(code = 200) {
        this._writeHead(code);
        this._response.end();
    }

    _serveErrorPage(code = 500, error = '') {
        if (this._errorPageWasServed) {
            return;
        }

        const textMIMEType = getMIMETypeForFileExtension('txt');

        this._addResponseHeader('Content-Type', textMIMEType);
        this._writeHead(code);

        let errorMessage = '';

        if (typeof error === 'object') {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }

        this._response.end(errorMessage);
        console.error(errorMessage);
    }

    async _serverDataByURLParams() {
        const foundRoute = this._findCustomRouteForCurrentRequest();

        if (!foundRoute) {
            return this._serveErrorPage(404, 'Route handler not found');
        }

        if(!foundRoute.handler || typeof foundRoute.handler !== 'function') {
            return this._serveErrorPage(404, 'Route handler function not found');
        }

        try {
            await foundRoute.handler.call(this);
        } catch(error) {
            return this._serveErrorPage(500, error);
        }
    };

    async _routeRequest() {
        if (this._urlPathParams.length === 0) {
            this._urlPathParams.push('index.html');
        }

        const customRouteParamsObj = this._findCustomRouteForCurrentRequest();

        try {
            if (customRouteParamsObj) {
                await this._serverDataByURLParams();
            } else {
                const error = new Error(`Cannot find rout handler for: "${this._urlPathParams.join('/')}"`);
                this._serveErrorPage(404, error);
            }
        } catch(error) {
            this._serveErrorPage(500, error);
        }
    }

    _getServerDomain() {
        return this._constantsOverrides.SERVER_DOMAIN ? this._constantsOverrides.SERVER_DOMAIN : SERVER_DOMAIN;
    }

    _getHTMLPagesDirectoryPath() {
        return this._constantsOverrides.HTML_PAGES_DIRECTORY_PATH ? this._constantsOverrides.HTML_PAGES_DIRECTORY_PATH : HTML_PAGES_DIRECTORY_PATH;
    }

    _getResourcesDirectoryPath() {
        return this._constantsOverrides.RESOURCES_DIRECTORY_PATH ? this._constantsOverrides.RESOURCES_DIRECTORY_PATH : RESOURCES_DIRECTORY_PATH;
    }

    _getRequestMethod() {
        return this._request.method.toLowerCase();
    }

    _getResponseHeaders() {
        return this._responseHeaders;
    }

    _getRequestHeaders() {
        return this._request.headers;
    }

    _getRequestHeader(headerName) {
        const preparedHeaderName = headerName.toLowerCase();

        return this._request.headers[headerName] || this._request.headers[preparedHeaderName];
    }

    _getResponseHeaderIndexByNameValue(headerName, headerValue) {
        const normalizedHeaderName = headerName.toLowerCase();

        return this._responseHeaders.findIndex(headerArr => {
            return headerArr[0] === normalizedHeaderName && headerArr[1] === headerValue;
        });
    }

    _getResponseHeaderByNameValue(headerName, headerValue) {
        const normalizedHeaderName = headerName.toLowerCase();

        return this._responseHeaders.find(headerArr => {
            return headerArr[0] === normalizedHeaderName && headerArr[1] === headerValue;
        });
    }

    _getRequestHostname() {
        const hostHeader = this._getRequestHeader('host');
        const protocol = this._getProtocol();

        if (hostHeader) {
            return url.parse(`${protocol}://${hostHeader}`).hostname;
        }
    }

    _getRequestPort() {
        const hostHeader = this._getRequestHeader('host');
        const protocol = this._getProtocol();

        if (hostHeader) {
            return url.parse(`${protocol}://${hostHeader}`).port;
        }
    }

    _getRequestURLPath() {
        return this._urlPathParams.join('/');
    }

    _getProtocol() {
        return this._isHTTPSUsed() ? 'https' : 'http';
    }

    _getProtocolVersion() {
        return this._protocolVersion;
    }

    _getStatusCodeString(statusCode) {
        return HTTP_STATUS_CODES[statusCode.toString()];
    }

    _setResponseHeaders(responseHeaders) {
        this._responseHeaders = responseHeaders;
    }

    _setResponseHeaderValueAtIndex(headerIndex, headerValue) {
        this._responseHeaders[headerIndex][1] = headerValue;
    }

    async onHandleRequest() {
        this._preparedRequestURL  = this._prepareRequestURL();
        const {urlPathParams, urlQueryParams} = this._prepareRequestURLPath(this._preparedRequestURL);

        this._urlPathParams = urlPathParams;
        this._urlQueryParams = urlQueryParams;

        try {
            this._postData = await extractPOSTDataFromRequest(this._request);
        } catch(error) {
            this._serveErrorPage(400, error);
            return this._request.connection.destroy();
        }

        await this._routeRequest();
    }

    constructor(request, response, options = {}, routes = [], serverRootDir, constantsOverrides) {
        this._errorPageWasServed = false;

        this._request = request;
        this._response = response;

        this._isHTTPS = options.isHTTPS !== undefined ? options.isHTTPS : false;
        this._protocolVersion = '1.1';

        this._routes = cloneDeep(routes);
        this._serverRootDir = serverRootDir;

        this._preparedRequestURL = '';
        this._urlPathParams = [];
        this._urlQueryParams = {};

        this._postData = {};
        this._responseHeaders = [];

        this._constantsOverrides = constantsOverrides ? constantsOverrides : {};
    }

    getQueryParam(paramName) {
        const paramValue = this._urlQueryParams[paramName];

        if (paramValue === undefined || paramValue === null) {
            return null;
        } else {
            return paramValue;
        }
    }
}

module.exports = BasicServerClass;