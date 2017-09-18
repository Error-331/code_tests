"use strict";

const http = require('http');
const path = require('path');
const fs = require('fs');

const {SERVER_PORT, HTML_PAGES_DIRECTORY_PATH, RESOURCES_DIRECTORY_PATH, FILE_EXTENSION_TO_MIME_TYPE} = require ('./js/constants');

const getMIMETypeForFileExtension = (fileExtension) => {
    const fileMIMEType = FILE_EXTENSION_TO_MIME_TYPE[fileExtension.toLocaleLowerCase()];
    return fileMIMEType ? fileMIMEType : null;
};

const extractFileExtensionFromPathParams = (pathParams) => {
    const pathParamsCount = pathParams.length;

    if (pathParamsCount === 0) {
        return null;
    }

    const lastPathParam = pathParams[pathParamsCount - 1];
    const requestedFileExtension = path.extname(lastPathParam);

    return requestedFileExtension ? requestedFileExtension.substr(1) : null;
};

const extractFileNameFromPathParams = (pathParams) => {
    const fileExtension = extractFileExtensionFromPathParams(pathParams);

    if (fileExtension === null) {
        return null;
    }

    const pathParamsCount = pathParams.length;

    if (pathParamsCount === 0) {
        return null;
    }

    const lastPathParam = pathParams[pathParamsCount - 1];
    const fileName = path.basename(lastPathParam, `.${fileExtension}`);

    return fileName ? fileName : null;
};

const serveErrorPage = (response, code = 500, message = '') => {
    response.writeHead(code);
    response.end(message);
};

const loadLocalFile = async (fileAbsolutePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileAbsolutePath, (error, fileContents) => {
            if (error) {
                return reject(error);
            } else  {
                return resolve(fileContents);
            }
        });
    });
};

const serverDataByURLParams = (request, response, pathParams, queryParams) => {
    return new Promise(async (resolve, reject) => {
        response.writeHead(200);
        response.end('');
        resolve();
    });

};

const serveStaticFileByURLParams = (request, response, pathParams, queryParams) => {
    return new Promise(async (resolve, reject) => {
        let pathToFile;

        const fileExtension = extractFileExtensionFromPathParams(pathParams);
        const fileName = extractFileNameFromPathParams(pathParams);

        const fileMIMEType = getMIMETypeForFileExtension(fileExtension);

        if (fileMIMEType === null) {
            const errorMessage = `Cannot find MIME type for file extension of ".${fileExtension}"`;

            serveErrorPage(response, 400, errorMessage);
            return reject(new Error(errorMessage));
        }

        if (fileExtension === 'html') {
            pathToFile = `${__dirname}/${HTML_PAGES_DIRECTORY_PATH}/${fileName}.${fileExtension}`;

        } else {
            const pathParamsCopy = pathParams;
            pathParams.pop();

            const pathToDirectory = pathParamsCopy.length > 0 ? `/${pathParamsCopy.join('/')}/` : '/';
            pathToFile = `${__dirname}/${RESOURCES_DIRECTORY_PATH}${pathToDirectory}${fileName}.${fileExtension}`;
        }

        let fileContents;

        try {
            fileContents = await loadLocalFile(pathToFile);
        } catch(error) {
            if (error.code === 'ENOENT') {
                serveErrorPage(response, 400, `Cannot find file: "${fileName}.${fileExtension}"`);
            } else {
                serveErrorPage(response, 500, `An internal server error occurred while the file "${fileName}.${fileExtension}" was being loaded`);
            }

            return reject(error);
        }

        response.writeHead(200, {
            'Content-Type': fileMIMEType,
            'Content-Length': fileContents.length
        });

        response.end(fileContents);
        resolve();
    });
};

const routeRequest = async (request, response, pathParams, queryParams) => {
    const pathParamsCopy = pathParams.slice();

    if (pathParamsCopy.length === 0) {
        pathParamsCopy.push('index.html');
    }

    try {
        if (extractFileExtensionFromPathParams(pathParamsCopy)) {
            await serveStaticFileByURLParams(request, response, pathParamsCopy, queryParams);
        } else {
            await serverDataByURLParams(request, response, pathParamsCopy, queryParams);
        }
    } catch(error) {
        console.log(error);
    }
};

const parseURLQueryString = (queryString) => {
    if (!queryString) {
        return [];
    }

    const queryFragments = queryString.split('&');
    return queryFragments.reduce((paramsObj, paramPair) => {
        const params = paramPair.split('=');

        if (params.length !== 2) {
            return paramsObj;
        }

        const [paramKey, paramValue] = params;

        paramsObj[paramKey] = paramValue;
        return paramsObj
    }, {});
};

const parseURLPathParams = (pathString) => {
    return pathString ? pathString.split('/').map(param => decodeURIComponent(param)) : [];
};

const requestHandler = async (request, response) => {
    const requestURL = request.url.toLowerCase();
    const decodedRequestURL = decodeURI(requestURL);
    const preparedRequestURL = decodedRequestURL[0] === '/' ? decodedRequestURL.substring(1) : decodedRequestURL;

    const [urlPathString, urlQueryString] = preparedRequestURL ? preparedRequestURL.split('?') : ['', ''];
    const urlPathParams = parseURLPathParams(urlPathString);
    const urlQueryParams = parseURLQueryString(urlQueryString);

    await routeRequest(request, response, urlPathParams, urlQueryParams);
};

const server = http.createServer(requestHandler);

server.listen(SERVER_PORT, (error) => {
    if (error) {
        return console.error('Error while starting server -', error);
    } else {
        console.log(`Server is listening on ${SERVER_PORT}`);
    }
});