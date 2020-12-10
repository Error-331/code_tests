'use strict';

const LogServerMixin = (superClass) => class extends superClass {
    _printRequestHead() {
        const requestMethod = this._getRequestMethod();
        const requestHostname = this._getRequestHostname();

        console.log(`Method ${requestMethod.toUpperCase()} ${requestHostname}`);
        console.log('');
    }

    _printRequestURLParameters() {
        const preparedRequestURL = this._prepareRequestURL();
        console.log('Request URL: ', preparedRequestURL);

        const {urlPathParams, urlQueryParams} = this._prepareRequestURLPath(preparedRequestURL);
        console.log('URL path parameters: ', urlPathParams);
        console.log('URL query parameters: ', urlQueryParams);

        console.log('');
    }

    _printRequestPOSTData() {
        try {
            console.log('');
            console.log('-----------------');
            console.log('Request post data');
            console.log('-----------------');
            console.log('');

            console.log(`POST(raw) data: ${this._rawPostData} (${typeof this._rawPostData})`);
            console.log('POST data: ', this._postData);
        } catch(error) {
            console.error('Cannot extract POST data');
        }
    }

    _printRequestCookies() {
        console.log('');
        console.log('---------------');
        console.log('Request cookies');
        console.log('---------------');
        console.log('');

        console.log('Cookies data: ', this.cookies);
    }

    _printRequestMeta() {
        console.log(`Request (${new Date().toTimeString()})`);
        console.log('');
    }

    _printRequestHeaders() {
        const requestHeaders = this._request.headers;

        console.log('');
        console.log('---------------');
        console.log('Request headers');
        console.log('---------------');
        console.log('');

        for (let headerName in requestHeaders) {
            console.log(`${headerName}: ${requestHeaders[headerName]}`);
        }
    }

    async _printRequestData() {
        this._printRequestMeta();
        this._printRequestHead();
        this._printRequestURLParameters();
        this._printRequestPOSTData();
        this._printRequestCookies();
        this._printRequestHeaders();

        console.log('');
        console.log('=======================================');
        console.log('');
    }

    async _onBeforeRouteRequest() {
        await super._onBeforeRouteRequest();
        await this._printRequestData()
    }

    constructor(...serverParams) {
        super(...serverParams);
    }
};

module.exports = LogServerMixin;
