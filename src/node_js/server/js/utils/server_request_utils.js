'use strict';

const path = require('path');
const queryString = require('querystring');

const {FILE_EXTENSION_TO_MIME_TYPE} = require ('./../constants/mime_types_constants');
const {MAX_POST_DATA_SIZE} = require ('./../constants/general_server_constants');

const MultipartBodyParserContext = require('./../classes/multipart_body_parser/multipart_body_parser_context');

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

const extractRawPOSTDataFromRequest = async (request) =>  {
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
            resolve(postData);
        });
    });



  /*  let postData = null;

    if (request.method !== 'POST') {
        return postData;
    }
    //multipart/mixed

    if (typeof request.headers['content-type'] === 'string' && request.headers['content-type'].toLowerCase().indexOf('multipart/form-data') !== -1) {
        const multipartBodyParser = new MultipartBodyParserContext(request);

        multipartBodyParser.on('MB_PARSER_PREAMBLE_FOUND', (b, i,c) => console.log('PREAMBLE_FOUND', b, i, c.replace(new RegExp(`\r\n`, 'g'), '--R---N--'), '--END--'));
        multipartBodyParser.on('MB_PARSER_INITIAL_BOUNDARY_FOUND', (b, i,c) => console.log('INITIAL_BOUNDARY_FOUND', b, i, c.replace(new RegExp(`\r\n`, 'g'), '--R---N--'), '--END--'));

        multipartBodyParser.on('MB_PARSER_BOUNDARY_HEADERS_START_FOUND', (b, i,c) => console.log('BOUNDARY_HEADERS_START_FOUND', b, i, c.replace(new RegExp(`\r\n`, 'g'), '--R---N--'), '--END--'));
        multipartBodyParser.on('MB_PARSER_BOUNDARY_HEADERS_FOUND', (b, i,c) => console.log('BOUNDARY_HEADERS_FOUND', b, i, c.replace(new RegExp(`\r\n`, 'g'), '--R---N--'), '--END--'));
        multipartBodyParser.on('MB_PARSER_BOUNDARY_HEADERS_END_FOUND', (b, i,c) => console.log('BOUNDARY_HEADERS_END_FOUND', b, i, c.replace(new RegExp(`\r\n`, 'g'), '--R---N--'), '--END--'));

        multipartBodyParser.on('MB_PARSER_NEXT_OR_FINAL_BOUNDARY_FOUND', (b, i,c) => console.log('MB_PARSER_NEXT_OR_FINAL_BOUNDARY_FOUND', b, i, c.replace(new RegExp(`\r\n`, 'g'), '--R---N--'), '--END--'));
        multipartBodyParser.on('MB_PARSER_BOUNDARY_FOUND', (b, i,c) => console.log('MB_PARSER_BOUNDARY_FOUND', b, i, c.replace(new RegExp(`\r\n`, 'g'), '--R---N--'), '--END--'));
        multipartBodyParser.on('MB_PARSER_FINAL_BOUNDARY_FOUND', (b, i,c) => console.log('MB_PARSER_FINAL_BOUNDARY_FOUND', b, i, c.replace(new RegExp(`\r\n`, 'g'), '--R---N--'), '--END--'));

        multipartBodyParser.on('MB_PARSER_BODY_PART_FOUND', (b, i,c) => console.log('MB_PARSER_BODY_PART_FOUND', b, i, c.replace(new RegExp(`\r\n`, 'g'), '--R---N--'), '--END--'));
        multipartBodyParser.on('MB_PARSER_BODY_PARSED', () => console.log('MB_PARSER_BODY_PARSED', '--END--'));

        await multipartBodyParser.parse();
    }*/
};




const extractPOSTDataFromRequest = (request) =>  {
    extractRawPOSTDataFromRequest(request)
        .then(rawPOSTData => queryString.parse(rawPOSTData))
};

const extractCookies = (request) => {
    const cookiesHeader = request.headers['cookie'];

    if (
        cookiesHeader !== undefined &&
        cookiesHeader !== null
    ) {
        return cookiesHeader.split(';').reduce((parsedCookies, cookieKeyValue) => {
            console.log('hul', cookieKeyValue);

            const [key, value] = cookieKeyValue.trim().split('=');
            parsedCookies[key] = value;

            return parsedCookies;
        }, {});
    } else {
        return {};
    }
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
module.exports.extractFileExtensionFromPathParams = extractFileExtensionFromPathParams;
module.exports.extractFileNameFromPathParams = extractFileNameFromPathParams;
module.exports.extractRawPOSTDataFromRequest = extractRawPOSTDataFromRequest;
module.exports.extractPOSTDataFromRequest = extractPOSTDataFromRequest;
module.exports.extractCookies = extractCookies;
module.exports.getMIMETypeForFileExtension = getMIMETypeForFileExtension;
module.exports.getMIMETypeForPathParams = getMIMETypeForPathParams;
