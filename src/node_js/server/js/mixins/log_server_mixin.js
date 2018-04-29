'use strict';

const {extractPOSTDataFromRequest} = require('./../utils/server_request_utils');

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

    async _printRequestPOSTData() {
        try {
            const postData = await extractPOSTDataFromRequest(this._request);
            console.log('POST data: ', postData);
        } catch(error) {
            console.error('Cannot extract POST data');
        }

        console.log('');
    }

    _printRequestHeaders() {
        const requestHeaders = this._request.headers;

        console.log('Request headers');
        console.log('---------------');
        console.log('');

        for (let headerName in requestHeaders) {
            console.log(`${headerName}: ${requestHeaders[headerName]}`);
        }
    }

    async _printRequestData() {
        console.log(`Request (${new Date().toTimeString()})`);
        console.log('');

        this._printRequestHead();
        this._printRequestURLParameters();
        await this._printRequestPOSTData();
        this._printRequestHeaders();

        console.log('');
        console.log('----------------------------------');
        console.log('');
    }

    constructor(...serverParams) {
        super(...serverParams);

        this._printRequestData();
    }
};

module.exports = LogServerMixin;