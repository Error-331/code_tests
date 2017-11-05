'use strict';

const {readFileSync} = require('fs');
const http = require('http');
const https = require('https');

const {normalizeURLPath} = require('./../utils/server_request_utils');
const {OPEN_PROXY_DOMAIN_TO_FORWARD_TO, OPEN_PROXY_FORWARD_PORT} = require('./../constants/open_proxy_constants');

const OpenProxyServerMixin = (superClass) => class extends superClass {
    _prepareOpenProxyGeneralOptions() {
        const requestHeaders = this._getRequestHeaders();
        requestHeaders.host = this._getDomainToForwardTo();

        let urlPath = this._getRequestURLPath();
        let urlPathPrefix = this._getPathToForwardPrefix();

        urlPath = urlPath[0] === '/' ? urlPath : `/${urlPath}`;
        urlPath = `${urlPathPrefix}${urlPath}`;

        const options = {
            hostname: this._getDomainToForwardTo(),
            port: this._getPortToForwardTo(),
            method: this._getRequestMethod(),
            path: urlPath,
            headers: requestHeaders
        };

        if (this._isHTTPSUsed()) {
            options.key = readFileSync('./ssl/server.key', 'utf8');
            options.cert = readFileSync('./ssl/server.crt', 'utf8');
        }

        return options;
    }

    _forwardOpenProxyRequest() {
        return new Promise((resolve, reject) => {
            const requestOptions = this._prepareOpenProxyGeneralOptions();
            const requestFunc = this._isHTTPSUsed() ? https.request : http.request;

            const remoteRequest = requestFunc(requestOptions, (proxyResponse) => {
                this._addResponseHeaders(proxyResponse.headers);
                this._writeHead(proxyResponse.statusCode);


                proxyResponse.on('error', (error) => {
                    console.error(error);
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

    _getPathToForwardPrefix() {
        if (!this._pathToForwardPrefix) {
            return '';
        } else {
            return this._pathToForwardPrefix;
        }
    }

    _setPortToForwardTo(portToForwardTo) {
        this._portToForwardPort = portToForwardTo;
    }

    _setDomainToForwardTo(domainToForwardTo) {
        this._domainToForward = domainToForwardTo;
    }

    _setPathToForwardPrefix(pathPrefix) {
        if (pathPrefix.length === 0) {
            return;
        }

        pathPrefix = normalizeURLPath(pathPrefix);
        pathPrefix = pathPrefix[0] === '/' ? pathPrefix : `/${pathPrefix}`;

        this._pathToForwardPrefix = pathPrefix;
    }

    constructor(...serverParams) {
        super(...serverParams);

        this._domainToForward = this._constantsOverrides.OPEN_PROXY_DOMAIN_TO_FORWARD_TO ? this._constantsOverrides.OPEN_PROXY_DOMAIN_TO_FORWARD_TO : OPEN_PROXY_DOMAIN_TO_FORWARD_TO;
        this._portToForwardPort = this._constantsOverrides.OPEN_PROXY_FORWARD_PORT ? this._constantsOverrides.OPEN_PROXY_FORWARD_PORT : OPEN_PROXY_FORWARD_PORT;
        this._pathToForwardPrefix = undefined;
    }
};

module.exports = OpenProxyServerMixin;