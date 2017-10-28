'use strict';

const queryString = require('querystring');

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

class BasicServerClass {
    _isRequestHeaderExist(headerName) {
        const preparedHeaderName = headerName.toLowerCase();

        return this._request.headers[headerName] && this._request.headers[preparedHeaderName];
    }

    _prepareRequestURLPath() {
        const [urlPathString, urlQueryString] = this._preparedRequestURL ? this._preparedRequestURL.split('?') : ['', ''];

        this._urlPathParams = parseURLPathParams(urlPathString);
        this._urlQueryParams = queryString.parse(urlQueryString);
    }

    _prepareRequestURL() {
        const decodedRequestURL = decodeURI(this._request.url);
        this._preparedRequestURL = decodedRequestURL[0] === '/' ? decodedRequestURL.substring(1) : decodedRequestURL;
    }

    _addCustomRoute(customRoute) {
        this._routes.push(customRoute);
    }

    _findCustomRouteForCurrentRequest() {
        const urlPath = this._urlPathParams.join('/');
        const preparedURLPath = normalizeURLPath(urlPath);
        const requestMethod = this._request.method.toLowerCase();

        return this._routes.find(route => {
            if (route.method && route.method.toLocaleLowerCase() !== requestMethod) {
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

    _addResponseHeader(headerName, headerValue) {
        const normalizedHeaderName = headerName.toLowerCase();
        const headerIndex = this._responseHeaders.findIndex(header => {
            return header[0] === normalizedHeaderName;
        });

        if (headerIndex === -1) {
            this._responseHeaders.push([normalizedHeaderName, headerValue])
        } else {
            this._responseHeaders[headerIndex][1] = headerValue;
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
        return this._constantsOverrides.HTML_PAGES_DIRECTORY_PATH ? this._constantsOverrides.HTML_PAGES_DIRECTORY_PATH : SERVER_DOMAIN;
    }

    _getHTMLPagesDirectoryPath() {
        return this._constantsOverrides.HTML_PAGES_DIRECTORY_PATH ? this._constantsOverrides.HTML_PAGES_DIRECTORY_PATH : HTML_PAGES_DIRECTORY_PATH;
    }

    _getResourcesDirectoryPath() {
        return this._constantsOverrides.RESOURCES_DIRECTORY_PATH ? this._constantsOverrides.RESOURCES_DIRECTORY_PATH : RESOURCES_DIRECTORY_PATH;
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

    _setResponseHeaders(responseHeaders) {
        this._responseHeaders = responseHeaders;
    }

    async onHandleRequest() {
        this._prepareRequestURL();
        this._prepareRequestURLPath();

        try {
            this._postData = await extractPOSTDataFromRequest(this._request);
        } catch(error) {
            this._serveErrorPage(400, error);
            return this._request.connection.destroy();
        }

        await this._routeRequest();
    }

    constructor(request, response, routes = [], serverRootDir, constantsOverrides) {
        this._errorPageWasServed = false;

        this._request = request;
        this._response = response;

        this._routes = routes;
        this._serverRootDir = serverRootDir;

        this._preparedRequestURL = '';
        this._urlPathParams = [];
        this._urlQueryParams = {};

        this._postData = {};
        this._responseHeaders = [];

        this._constantsOverrides = constantsOverrides ? constantsOverrides : {};
    }
}

module.exports = BasicServerClass;