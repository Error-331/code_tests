'use strict';

const cluster = require('cluster');
const ServerMixinErrorClass = require('./../server_mixin_error_class');

class LogServerMiddlewareClass {
    #printRequestError(code, error) {
        console.error('');
        console.error('-----');
        console.error('Error');
        console.error('------');
        console.error('');

        console.error('Code:', code);
        console.error('Message:', error.message);

        console.log('');

        console.error('Stack trace:', error.stack);
    }

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

            console.log('POST(raw) data:', server.request.postData.rawData);
            console.log('POST data: ', server.request.postData.data);
        } catch(error) {
            this.#printRequestError(null, new Error('Cannot extract POST data'));
        }
    }

    #printRequestCookies(server) {
        console.log('');
        console.log('---------------');
        console.log('Request cookies');
        console.log('---------------');
        console.log('');

        console.log('Raw cookies data: ', server.request.rawCookies);
        console.log('Cookies data: ', server.request.cookies);
    }

    #printRequestURLParameters(server) {
        console.log('URL:', server.request.url);
        console.log('Prepared URL: ', server.request.preparedURL);

        console.log('');

        console.log('URL path: ', server.request.urlPath);
        console.log('Normalized URL path: ', server.request.normalizedURLPath);
        console.log('URL path parameters: ', server.request.urlPathParams);

        console.log('');

        console.log('URL query parameters: ', server.request.urlQueryParams);
    }

    #printRequestHead(server) {
        console.log('Host:', server.request.hostname);
        console.log('');
    }

    #printRequestMeta(server) {
        console.log('');
        console.log('------------');
        console.log('Request Meta');
        console.log('------------');
        console.log('');

        console.log('Date:', new Date().toTimeString());
        console.log('Worker id:', cluster.worker.id);
        console.log('');

        console.log('Method:', server.request.method.toUpperCase());
        console.log('Is POST:', server.request.isPost);

        console.log('');

        console.log('Port:', server.port);
        console.log('Protocol:', server.protocol);
        console.log('Protocol version:', server.request.protocolVersion);
        console.log('Is HTTPS:', server.isHTTPS);

        console.log('');
    }

    #printRequestData(server) {
        this.#printRequestMeta(server);
        this.#printRequestHead(server);
        this.#printRequestURLParameters(server);
        this.#printRequestPOSTData(server);
        this.#printRequestCookies(server);
        this.#printRequestHeaders(server);

        console.log('');
        console.log('=======================================');
        console.log('');
    }

    async onBeforeErrorSent(server, error) {
        if (error instanceof ServerMixinErrorClass) {
            this.#printRequestError(error.httpResponseCode, error);
        } else {
            this.#printRequestError(500, error);
        }
    }

    async onBeforeRouteRequest(server) {
        this.#printRequestData(server)
    }
}

module.exports = LogServerMiddlewareClass;
