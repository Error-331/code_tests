'use strict';

const queryString = require('querystring');
const fs = require('fs');

const {
    normalizeURLPath,
    parseURLPathParams,
    extractFileExtensionFromPathParams,
    extractFileNameFromPathParams,
    extractPOSTDataFromRequest,
    getMIMETypeForFileExtension
} = require('./../utils/server_request_utils');

const {
    SERVER_DOMAIN,
    HTML_PAGES_DIRECTORY_PATH,
    RESOURCES_DIRECTORY_PATH,
} = require ('./../constants/general_server_constants');

class BasicServerClass {
    _prepareRequestURLPath() {
        const [urlPathString, urlQueryString] = this._preparedRequestURL ? this._preparedRequestURL.split('?') : ['', ''];

        this._urlPathParams = parseURLPathParams(urlPathString);
        this._urlQueryParams = queryString.parse(urlQueryString);
    }

    _prepareRequestURL() {
        const requestURL = this._request.url.toLowerCase();
        const decodedRequestURL = decodeURI(requestURL);

        this._preparedRequestURL = decodedRequestURL[0] === '/' ? decodedRequestURL.substring(1) : decodedRequestURL;
    }

    _findCustomRouteForCurrentRequest() {
        const urlPath = this._urlPathParams.join('/');
        const preparedURLPath  = normalizeURLPath(urlPath);

        return this._routes.find(route => {
            const normalizedURLPath = normalizeURLPath(route.path);
            return normalizedURLPath === '' ? false : normalizedURLPath === preparedURLPath;
        });
    }

    _writeHead(statusCode) {
        this._response.writeHead(statusCode, this._responseHeaders);
    };

    _clearResponseHeaders() {
        this._responseHeaders = [];
    }

    _addResponseHeader(headerName, headerValue) {
        this._responseHeaders.push([headerName, headerValue]);
    }

    _serveErrorPage(code = 500, message = '') {
        this._response.writeHead(code);
        this._response.end(message);
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

    _serveStaticFileByURLParams() {
        return new Promise(async (resolve, reject) => {
            let pathToFile;

            const fileExtension = extractFileExtensionFromPathParams(this._urlPathParams);
            const fileName = extractFileNameFromPathParams(this._urlPathParams);

            const fileMIMEType = getMIMETypeForFileExtension(fileExtension);

            if (!fileMIMEType) {
                const errorMessage = `Cannot find MIME type for file extension of ".${fileExtension}"`;

                this._serveErrorPage(400, errorMessage);
                return reject(new Error(errorMessage));
            }

            const pathParamsCopy = this._urlPathParams.slice();
            pathParamsCopy.pop();

            const pathToDirectory = pathParamsCopy.length > 0 ? `/${pathParamsCopy.join('/')}/` : '/';

            if (fileExtension === 'html') {
                pathToFile = `${this._serverRootDir}/${this._getHTMLPagesDirectoryPath()}${pathToDirectory}${fileName}.${fileExtension}`;
            } else {
                pathToFile = `${this._serverRootDir}/${this._getResourcesDirectoryPath()}${pathToDirectory}${fileName}.${fileExtension}`;
            }

            const staticFileStream = fs.createReadStream(pathToFile, {
                flags: 'r',
                autoClose: true
            });

            this._addResponseHeader('Content-Type', fileMIMEType);
            this._writeHead(200);

            staticFileStream.on('close', () => {
                resolve();
            });

            staticFileStream.on('error', (error) => {
                console.log(error);

                if (error.code === 'ENOENT') {
                    this._serveErrorPage(404, `Cannot find file: "${fileName}.${fileExtension}"`);
                } else {
                    this._serveErrorPage(400, `Cannot open file: "${fileName}.${fileExtension}"`);
                }

                resolve();
            });

            staticFileStream.pipe(this._response);
        });
    };

    async _routeRequest() {
        if (this._urlPathParams.length === 0) {
            this._urlPathParams.push('index.html');
        }
        const customRouteParamsObj = this._findCustomRouteForCurrentRequest();
        const requestedFileExtension = extractFileExtensionFromPathParams(this._urlPathParams);

        try {
            if (customRouteParamsObj) {
                await this._serverDataByURLParams();
            } else if (requestedFileExtension) {
                await this._serveStaticFileByURLParams();
            }
        } catch(error) {
            this._serveErrorPage(500, error);
            console.log(error);
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

    constructor(request, response, routes, serverRootDir, constantsOverrides) {
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