'use strict';

const queryString = require('querystring');
const path = require('path');
const fs = require('fs');

const {
    HTML_PAGES_DIRECTORY_PATH,
    RESOURCES_DIRECTORY_PATH,
    FILE_EXTENSION_TO_MIME_TYPE,
    MAX_POST_DATA_SIZE
} = require ('./constants');

class ServerClass {
    _normalizeURLPath(urlPath) {
        urlPath = urlPath.toLowerCase();

        const urlPathLength = urlPath.length;
        return urlPath[urlPathLength - 1] === '/' ? urlPath.substr(0, urlPathLength - 1) : urlPath;
    };

    _getMIMETypeForFileExtension(fileExtension) {
        const fileMIMEType = FILE_EXTENSION_TO_MIME_TYPE[fileExtension.toLowerCase()];
        return fileMIMEType ? fileMIMEType : undefined;
    };

    _extractFileExtensionFromPathParams(pathParams) {
        const pathParamsCount = pathParams.length;

        if (pathParamsCount === 0) {
            return;
        }

        const lastPathParam = pathParams[pathParamsCount - 1];
        const requestedFileExtension = path.extname(lastPathParam);

        return requestedFileExtension ? requestedFileExtension.substr(1) : undefined;
    }

    _extractFileNameFromPathParams(pathParams) {
        const fileExtension = this._extractFileExtensionFromPathParams(pathParams);

        if (!fileExtension) {
            return;
        }

        const pathParamsCount = pathParams.length;

        if (pathParamsCount === 0) {
            return;
        }

        const lastPathParam = pathParams[pathParamsCount - 1];
        const fileName = path.basename(lastPathParam, `.${fileExtension}`);

        return fileName ? fileName : undefined;
    }

    _extractPOSTData() {
        return new Promise((resolve, reject) => {
            let postData = '';

            if (this._request.method !== "POST") {
                return resolve(postData);
            }

            this._request.on('data', postDataChunk => {
                postData += postDataChunk;

                if (postData.length > MAX_POST_DATA_SIZE) {
                    reject('POST data is to big');
                }
            });

            this._request.on('end', function() {
                const preparedPostData = queryString.parse(postData);
                resolve(preparedPostData);
            });
        });
    };

    _parseURLPathParams(pathString) {
        return pathString ? pathString.split('/').map(param => decodeURIComponent(param)) : [];
    };

    _prepareRequestURLPath() {
        const [urlPathString, urlQueryString] = this._preparedRequestURL ? this._preparedRequestURL.split('?') : ['', ''];

        this._urlPathParams = this._parseURLPathParams(urlPathString);
        this._urlQueryParams = queryString.parse(urlQueryString);
    }

    _prepareRequestURL() {
        const requestURL = this._request.url.toLowerCase();
        const decodedRequestURL = decodeURI(requestURL);

        this._preparedRequestURL = decodedRequestURL[0] === '/' ? decodedRequestURL.substring(1) : decodedRequestURL;
    }

    _serveErrorPage(code = 500, message = '') {
        this._response.writeHead(code);
        this._response.end(message);
    }

    _findCustomRouteForCurrentRequest() {
        const urlPath = this._urlPathParams.join('/');
        const preparedURLPath  = this._normalizeURLPath(urlPath);

        return this._routes.find(route => {
            const normalizedURLPath = this._normalizeURLPath(route.path);
            return normalizedURLPath === '' ? false : normalizedURLPath === preparedURLPath;
        });
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

            const fileExtension = this._extractFileExtensionFromPathParams(this._urlPathParams);
            const fileName = this._extractFileNameFromPathParams(this._urlPathParams);

            const fileMIMEType = this._getMIMETypeForFileExtension(fileExtension);

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

            staticFileStream.on('open', () => {
                this._response.writeHead(200, {
                    'Content-Type': fileMIMEType,
                });
            });

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
        const requestedFileExtension = this._extractFileExtensionFromPathParams(this._urlPathParams)

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

    _getHTMLPagesDirectoryPath() {
        return this._constantsOverrides.HTML_PAGES_DIRECTORY_PATH ? this._constantsOverrides.HTML_PAGES_DIRECTORY_PATH : HTML_PAGES_DIRECTORY_PATH;
    }

    _getResourcesDirectoryPath() {
        return this._constantsOverrides.RESOURCES_DIRECTORY_PATH ? this._constantsOverrides.RESOURCES_DIRECTORY_PATH : RESOURCES_DIRECTORY_PATH;
    }

    async onHandleRequest() {
        this._prepareRequestURL();
        this._prepareRequestURLPath();

        try {
            this._postData = await this._extractPOSTData();
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

        this._constantsOverrides = constantsOverrides;
    }
}

module.exports = ServerClass;