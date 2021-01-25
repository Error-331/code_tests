'use strict';

const { STATUS_CODES } = require('http');
const path = require('path');

const { FILE_EXTENSION_TO_MIME_TYPE } = require ('./../../constants/mime_types_constants');

class ReqResUtilClass {
    static parseRequestCookies(cookiesHeader) {
        return cookiesHeader.split(';').reduce((parsedCookies, cookieKeyValue) => {
            const [key, value] = cookieKeyValue.trim().split('=');
            parsedCookies[key] = value;

            return parsedCookies;
        }, {});
    }

    static extractFileExtensionFromPathParams(pathParams) {
        const pathParamsCount = pathParams.length;

        if (pathParamsCount === 0) {
            return;
        }

        const lastPathParam = pathParams[pathParamsCount - 1];
        const requestedFileExtension = path.extname(lastPathParam);

        return requestedFileExtension ? requestedFileExtension.substr(1) : undefined;
    };

    static extractFileNameFromPathParams(pathParams) {
        const fileExtension = ReqResUtilClass.extractFileExtensionFromPathParams(pathParams);

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

    static normalizeURLPath(urlPath) {
        urlPath = urlPath.toLowerCase();

        const urlPathLength = urlPath.length;
        return urlPath[urlPathLength - 1] === '/' ? urlPath.substr(0, urlPathLength - 1) : urlPath;
    }

    static findMIMETypeByFileExtension(fileExtension) {
        const fileMIMEType = FILE_EXTENSION_TO_MIME_TYPE[fileExtension.toLowerCase()];
        return fileMIMEType ? fileMIMEType : undefined;
    };

    static findMIMETypeByPathParams(pathParams) {
        const fileExtension = ReqResUtilClass.extractFileExtensionFromPathParams(pathParams);
        return ReqResUtilClass.findMIMETypeByFileExtension(fileExtension);
    };

    static findMIMETypeByFileExtension(fileExtension)  {
        const fileMIMEType = FILE_EXTENSION_TO_MIME_TYPE[fileExtension.toLowerCase()];
        return fileMIMEType ? fileMIMEType : undefined;
    }

    static findStatusCodeStringByStatusCode(statusCode) {
        return STATUS_CODES[statusCode];
    }
}

module.exports = ReqResUtilClass;
