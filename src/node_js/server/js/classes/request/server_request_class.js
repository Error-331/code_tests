'use strict';

const queryString = require('querystring');

const { X_WWW_FORM_URLENCODED_MIME_TYPE, MULTIPART_FORM_DATA_MIME_TYPE } = require('./../../constants/mime_types_constants');

const PostDataClass = require('./post_data_class');

class ServerRequestClass {
    #rawRequest = null;
    #tempUploadDirPath = null;

    #preparedRequestURL = '';
    #urlPathParams = [];
    #urlQueryParams = {};

    #postData = {};
    #cookies = {};

    #parseCookies() {
        const cookiesHeader = this.rawCookies;

        if (
            cookiesHeader !== undefined &&
            cookiesHeader !== null
        ) {
            this.#cookies = cookiesHeader.split(';').reduce((parsedCookies, cookieKeyValue) => {
                const [key, value] = cookieKeyValue.trim().split('=');
                parsedCookies[key] = value;

                return parsedCookies;
            }, {});
        } else {
            this.#cookies = {};
        }
    }

    #parseURLPathParams = (pathString) => {
        return pathString ? pathString.split('/').map(param => decodeURIComponent(param)) : [];
    };

    #prepareRequestURLPath() {
        const [urlPathString, urlQueryString] = this.#preparedRequestURL ? this.#preparedRequestURL.split('?') : ['', ''];

        this.#urlPathParams = this.#parseURLPathParams(urlPathString);
        this.#urlQueryParams = queryString.parse(urlQueryString);
    }

    #prepareRequestURL() {
        const decodedRequestURL = decodeURI(this.#rawRequest.url);
        this.#preparedRequestURL =  decodedRequestURL[0] === '/' ? decodedRequestURL.substring(1) : decodedRequestURL;
    }

    isRequestHeaderExist(headerName) {
        const preparedHeaderName = headerName.toLowerCase();

        return this.headers[headerName] && this.headers[preparedHeaderName];
    }

    isPost() {
        return this.method === 'post';
    }

    isMultipartFormData() {
        return this.isPost() && (this.getHeader('content-type').toLowerCase() === X_WWW_FORM_URLENCODED_MIME_TYPE);
    }

    isApplicationXWWFormUrlencoded() {
        return this.isPost() && (this.getHeader('content-type').toLowerCase() === MULTIPART_FORM_DATA_MIME_TYPE);
    }

    addURLPathParam(param) {
        this.#urlPathParams.push(param);
    }

    async prepare() {
        if (this.isMultipartFormData()) {
            const postData = new PostDataClass(this);
            this.#postData = await postData.parse();
        } else if (this.isApplicationXWWFormUrlencoded()) {

        } else {

        }
    }

    getHeader(headerName) {
        const preparedHeaderName = headerName.toLowerCase();

        return this.headers[headerName] || this.headers[preparedHeaderName];
    }

    get rawRequest() {
        return this.#rawRequest;
    }

    get tempUploadDirPath() {
        return this.#tempUploadDirPath;
    }

    get preparedRequestURL() {
        return this.#preparedRequestURL;
    }

    get urlPathParams() {
        return this.#urlPathParams;
    }

    get requestURLPath() {
        return this.#urlPathParams.join('/');
    }

    get normalizeURLPath() {
        return ServerRequestClass.normalizeURLPath(this.requestURLPath);
    };

    get urlQueryParams() {
        return this.#urlQueryParams;
    }

    get method() {
        return this.#rawRequest.method.toLowerCase();
    }

    get headers() {
        return this.#rawRequest.headers;
    }

    get rawCookies() {
        return this.getHeader('cookie');
    }

    get cookies() {
        return this.#cookies;
    }

    get postData() {
        return this.#postData;
    }

    setHeader(name, value) {
        this.#headers[name] = value;
    }

    constructor(rawRequest, tempUploadDirPath) {
        this.#rawRequest = rawRequest;
        this.#tempUploadDirPath = tempUploadDirPath;

        this.#prepareRequestURL();
        this.#prepareRequestURLPath();

        this.#parseCookies();
    }

    static normalizeURLPath(urlPath) {
        urlPath = urlPath.toLowerCase();

        const urlPathLength = urlPath.length;
        return urlPath[urlPathLength - 1] === '/' ? urlPath.substr(0, urlPathLength - 1) : urlPath;
    }
}

module.exports = ServerRequestClass;
