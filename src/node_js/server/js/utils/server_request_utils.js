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

        if (request.method !== "POST") {
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

module.exports.normalizeURLPath = normalizeURLPath;
module.exports.parseURLPathParams = parseURLPathParams;
module.exports.extractFileExtensionFromPathParams = extractFileExtensionFromPathParams;
module.exports.extractFileNameFromPathParams = extractFileNameFromPathParams;
module.exports.extractPOSTDataFromRequest = extractPOSTDataFromRequest;
module.exports.getMIMETypeForFileExtension = getMIMETypeForFileExtension;