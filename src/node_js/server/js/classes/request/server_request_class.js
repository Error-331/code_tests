'use strict';

const queryString = require('querystring');

const { X_WWW_FORM_URLENCODED_MIME_TYPE, MULTIPART_FORM_DATA_MIME_TYPE } = require('./../../constants/mime_types_constants');

const PostDataClass = require('./post_data_class');
const ReqResUtilClass = require('./../utils/req_res_util_class');

class ServerRequestClass {
    #rawRequest = null;
    #tempUploadDirPath = null;

    #preparedURL = '';
    #urlPathParams = [];
    #urlQueryParams = {};

    #postData = {};
    #cookies = {};

    #closeSocket(error) {
        this.#rawRequest.socket.destroy(error);
    }

    #parseCookies() {
        const cookiesHeader = this.rawCookies;

        if (
            cookiesHeader !== undefined &&
            cookiesHeader !== null
        ) {
            this.#cookies = ReqResUtilClass.parseRequestCookies(this.rawCookies);
        } else {
            this.#cookies = {};
        }
    }

    #parseURLPathParams = (pathString) => {
        return pathString ? pathString.split('/').map(param => decodeURIComponent(param)) : [];
    };

    #prepareRequestURLPath() {
        const [urlPathString, urlQueryString] = this.#preparedURL ? this.#preparedURL.split('?') : ['', ''];

        this.#urlPathParams = this.#parseURLPathParams(urlPathString);
        this.#urlQueryParams = queryString.parse(urlQueryString);
    }

    #prepareRequestURL() {
        const decodedRequestURL = decodeURI(this.#rawRequest.url);
        this.#preparedURL =  decodedRequestURL[0] === '/' ? decodedRequestURL.substring(1) : decodedRequestURL;
    }

    isRequestHeaderExist(headerName) {
        const preparedHeaderName = headerName.toLowerCase();
        return this.headers[headerName] && this.headers[preparedHeaderName];
    }

    isMultipartFormData() {
        return this.isPost && (this.getHeader('content-type').toLowerCase() === X_WWW_FORM_URLENCODED_MIME_TYPE);
    }

    isApplicationXWWFormUrlencoded() {
        return this.isPost && (this.getHeader('content-type').toLowerCase() === MULTIPART_FORM_DATA_MIME_TYPE);
    }

    addURLPathParam(param) {
        this.#urlPathParams.push(param);
    }

    async destroy() {
        this.#closeSocket();

        this.#rawRequest = null;
        this.#tempUploadDirPath = null;

        this.#preparedURL = '';
        this.#urlPathParams = [];
        this.#urlQueryParams = {};

        this.#postData = {};
        this.#cookies = {};
    }

    async prepare() {
        if (this.isMultipartFormData()) {
            this.#postData = new PostDataClass();
            await this.#postData.parse(this);
        } else if (this.isApplicationXWWFormUrlencoded()) {

        } else {

        }
    }

    get rawRequest() {
        return this.#rawRequest;
    }

    get method() {
        return this.#rawRequest.method.toLowerCase();
    }

    get isPost() {
        return this.method === 'post';
    }

    getHeader(headerName) {
        const preparedHeaderName = headerName.toLowerCase();
        return this.headers[headerName] || this.headers[preparedHeaderName];
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

    getPostValueByKey(key) {
        return this.#postData.getValueByKey(key);
    }

    get rawPostData() {
        if (this.#postData.rawData !== undefined && this.#postData.rawData !== null) {
            return this.#postData.rawData;
        } else {
            return null;
        }
    }

    get preparedPostData() {
        if (this.#postData.data !== undefined && this.#postData.data !== null) {
            return this.#postData.data;
        } else {
            return null;
        }
    }

    get protocolVersion() {
        return this.#rawRequest.httpVersion;
    }

    get hostname() {
        return this.getHeader('host');
    }

    get url() {
        return this.#rawRequest.url;
    }

    get preparedURL() {
        return this.#preparedURL;
    }

    get urlPath() {
        return this.#urlPathParams.join('/');
    }

    get normalizedURLPath() {
        return ReqResUtilClass.normalizeURLPath(this.urlPath);
    };

    get urlPathParams() {
        return this.#urlPathParams;
    }

    get urlQueryParams() {
        return this.#urlQueryParams;
    }

    get tempUploadDirPath() {
        return this.#tempUploadDirPath;
    }

    setHeader(name, value) {
        this.headers[name] = value;
    }

    constructor(rawRequest, tempUploadDirPath) {
        this.#rawRequest = rawRequest;
        this.#tempUploadDirPath = tempUploadDirPath;

        this.#prepareRequestURL();
        this.#prepareRequestURLPath();

        this.#parseCookies();
    }
}

module.exports = ServerRequestClass;
