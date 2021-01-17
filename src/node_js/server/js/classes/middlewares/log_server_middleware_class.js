'use strict';

class LogServerMiddlewareClass {
    #printRequestHeaders(server) {
        const requestHeaders = server.request.headers;

        console.log('');
        console.log('---------------');
        console.log('Request headers');
        console.log('---------------');
        console.log('');

        for (let headerName in requestHeaders) {
            console.log(`${headerName}: ${requestHeaders[headerName]}`);
        }
    }

    #printRequestPOSTData(server) {
        try {
            console.log('');
            console.log('-----------------');
            console.log('Request post data');
            console.log('-----------------');
            console.log('');

            console.log(`POST(raw) data: ${server.request.postData.rawData} (${typeof server.request.postData.rawData})`);
            console.log('POST data: ', server.request.postData.data);
        } catch(error) {
            console.error('Cannot extract POST data');
        }
    }

    #printRequestCookies(server) {
        console.log('');
        console.log('---------------');
        console.log('Request cookies');
        console.log('---------------');
        console.log('');

        console.log('Cookies data: ', server.request.rawCookies);
    }

    #printRequestURLParameters(server) {
        console.log('Request URL: ', server.request.preparedRequestURL);
        console.log('URL path parameters: ', server.request.urlPathParams);
        console.log('URL query parameters: ', server.request.urlQueryParams);

        console.log('');
    }

    #printRequestHead(server) {
        console.log(`Method ${server.request.method.toUpperCase()} ${server.hostname}`);
        console.log('');
    }

    #printRequestMeta() {
        console.log(`Request (${new Date().toTimeString()})`);
        console.log('');
    }

    async #printRequestData(server) {
        this.#printRequestMeta();
        this.#printRequestHead(server);
        this.#printRequestURLParameters(server);
        this.#printRequestPOSTData(server);
        this.#printRequestCookies(server);
        this.#printRequestHeaders(server);

        console.log('');
        console.log('=======================================');
        console.log('');
    }

    async onBeforeRouteRequest(server) {
        await this.#printRequestData(server)
    }

    constructor() {
    }
}
;

module.exports = LogServerMiddlewareClass;
