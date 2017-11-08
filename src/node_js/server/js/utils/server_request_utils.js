'use strict';

const path = require('path');
const queryString = require('querystring');

const {FILE_EXTENSION_TO_MIME_TYPE} = require ('./../constants/mime_types_constants');
const {MAX_POST_DATA_SIZE} = require ('./../constants/general_server_constants');

const normalizeURLPath = (urlPath) => {
    urlPath = urlPath.toLowerCase();

    const urlPathLength = urlPath.length;
    return urlPath[urlPathLength - 1] === '/' ? urlPath.substr(0, urlPathLength - 1) : urlPath;
};

const parseURLPathParams = (pathString) => {
    return pathString ? pathString.split('/').map(param => decodeURIComponent(param)) : [];
};

const parseHTTPHead = (headString) => {
    const [method, target, protocolVersion] = headString.split(' ');
    const [protocol, versionNumber] = protocolVersion.split('/');
    const parsedHead = {method, target, protocolVersion: {protocol, versionNumber}};

    parsedHead.method = parsedHead.method.toLowerCase();
    parsedHead.protocolVersion.protocol = parsedHead.protocolVersion.protocol.toLowerCase();

    return parsedHead;
};

const parseHTTPHeader = (headerString) => {
    const splittedHeaderString = headerString.split(':');

    if (splittedHeaderString.length <= 0) {
        return null;
    }

    let headerName = splittedHeaderString[0].toLowerCase();
    let headerValue = splittedHeaderString[1];

    if (splittedHeaderString.length >= 2) {
        headerValue = splittedHeaderString.slice(1).join(':').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    return [headerName, headerValue];
};

// TODO: add body parser
const parseHTTPRequest = (stringToParse) => {
    const parsedLines = stringToParse.split('\r\n');
    const httpRequestData = {
        head: {},
        headers: {},
        body: ''
    };

    return parsedLines.reduce((parsedData, parsedLine, parsedLineIndex) => {
        let isHeadersParsed = false;

        // first line - parse head
        if (parsedLineIndex === 0) {
            parsedData.head = parseHTTPHead(parsedLine);
            return parsedData;
        }

        // delimiter line reached
        if (parsedLine.length === 0) {
            isHeadersParsed = true;
            return parsedData;
        }

        if (!isHeadersParsed) {
            // parse header
            const parsedHeader = parseHTTPHeader(parsedLine);

            if (parsedHeader === null) {
                return parsedData;
            }

            const parsedHeaderName = parsedHeader[0];
            const parsedHeaderValue = parsedHeader[1];
            const headerValue = httpRequestData.headers[parsedHeaderName];

            if (headerValue) {
                typeof headerValue !== 'object' ? httpRequestData.headers[parsedHeaderName] = [headerValue] : headerValue.push(parsedHeaderValue);
            } else {
                httpRequestData.headers[parsedHeaderName] = parsedHeaderValue;
            }
        } else {
            // parse body line
        }

        return parsedData;
    }, httpRequestData);
};

const extractFileExtensionFromPathParams = (pathParams) => {
    const pathParamsCount = pathParams.length;

    if (pathParamsCount === 0) {
        return;
    }

    const lastPathParam = pathParams[pathParamsCount - 1];
    const requestedFileExtension = path.extname(lastPathParam);

    return requestedFileExtension ? requestedFileExtension.substr(1) : undefined;
};

const extractFileNameFromPathParams = (pathParams) => {
    const fileExtension = extractFileExtensionFromPathParams(pathParams);

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
};

const extractPOSTDataFromRequest = (request) =>  {
    return new Promise((resolve, reject) => {
        let postData = '';

        if (request.method !== 'POST') {
            return resolve(postData);
        }

        request.on('data', postDataChunk => {
            postData += postDataChunk;

            if (postData.length > MAX_POST_DATA_SIZE) {
                reject('POST data is to big');
            }
        });

        request.on('end', function() {
            const preparedPostData = queryString.parse(postData);
            resolve(preparedPostData);
        });
    });
};

const getMIMETypeForFileExtension = (fileExtension) => {
    const fileMIMEType = FILE_EXTENSION_TO_MIME_TYPE[fileExtension.toLowerCase()];
    return fileMIMEType ? fileMIMEType : undefined;
};

const getMIMETypeForPathParams = (pathParams) => {
    const fileExtension = extractFileExtensionFromPathParams(pathParams);
    return getMIMETypeForFileExtension(fileExtension);
};

module.exports.normalizeURLPath = normalizeURLPath;
module.exports.parseURLPathParams = parseURLPathParams;
module.exports.parseHTTPHead = parseHTTPHead;
module.exports.parseHTTPHeader = parseHTTPHeader;
module.exports.parseHTTPRequest = parseHTTPRequest;
module.exports.extractFileExtensionFromPathParams = extractFileExtensionFromPathParams;
module.exports.extractFileNameFromPathParams = extractFileNameFromPathParams;
module.exports.extractPOSTDataFromRequest = extractPOSTDataFromRequest;
module.exports.getMIMETypeForFileExtension = getMIMETypeForFileExtension;
module.exports.getMIMETypeForPathParams = getMIMETypeForPathParams;