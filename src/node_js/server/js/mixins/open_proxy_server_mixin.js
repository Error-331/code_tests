'use strict';

const http = require('http');
const {OPEN_PROXY_DOMAIN_TO_FORWARD_TO, OPEN_PROXY_FORWARD_PORT} = require('./../constants/open_proxy_constants');

const OpenProxyServerMixin = (superClass) => class extends superClass {
    _prepareOpenProxyGeneralOptions() {
        const requestHeaders = this._getRequestHeaders();
        requestHeaders.host = this._getDomainToForwardTo();

        let urlPath = this._getRequestURLPath();
        urlPath = urlPath[0] === '/' ? urlPath : `/${urlPath}`;

        return {
            hostname: this._getDomainToForwardTo(),
            port: this._getPortToForwardTo(),
            path: urlPath,
            headers: requestHeaders
        }
    }

    _forwardOpenProxyRequest() {
        return new Promise((resolve, reject) => {
            const requestOptions = this._prepareOpenProxyGeneralOptions();

            const remoteRequest = http.request(requestOptions, (proxyResponse) => {
                this._addResponseHeaders(proxyResponse.headers);
                this._writeHead(proxyResponse.statusCode);


                proxyResponse.on('error', (error) => {
                    reject(error);
                });

                proxyResponse.on('end', () => {
                    resolve(proxyResponse);
                });

                proxyResponse.pipe(this._response, {end: true});
            });


            this._request.pipe(remoteRequest, {end: true});
        });
    }

    _getPortToForwardTo() {
        return this._portToForwardPort;
    }

    _getDomainToForwardTo() {
        return this._domainToForward
    }

    _setPortToForwardTo(portToForwardTo) {
        this._portToForwardPort = portToForwardTo;
    }

    _setDomainToForwardTo(domainToForwardTo) {
        this._domainToForward = domainToForwardTo;
    }

    constructor(...serverParams) {
        super(...serverParams);

        this._domainToForward = this._constantsOverrides.OPEN_PROXY_DOMAIN_TO_FORWARD_TO ? this._constantsOverrides.OPEN_PROXY_DOMAIN_TO_FORWARD_TO : OPEN_PROXY_DOMAIN_TO_FORWARD_TO;
        this._portToForwardPort = this._constantsOverrides.OPEN_PROXY_FORWARD_PORT ? this._constantsOverrides.OPEN_PROXY_FORWARD_PORT : OPEN_PROXY_FORWARD_PORT;
    }
};

module.exports = OpenProxyServerMixin;