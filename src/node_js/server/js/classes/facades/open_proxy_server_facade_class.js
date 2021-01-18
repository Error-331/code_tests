'use strict';

const {readFileSync} = require('fs');
const http = require('http');
const https = require('https');

const ServerFacadeClass = require('./server_facade_class');
const ServerRequestClass = require('./request/server_request_class');

const {OPEN_PROXY_DOMAIN_TO_FORWARD_TO, OPEN_PROXY_FORWARD_PORT} = require('../../constants/open_proxy_constants');

class OpenProxyServerFacadeClass extends ServerFacadeClass {
    #domainToForward = null;
    #portToForwardPort = null;
    #pathToForwardPrefix = null;

    #prepareOpenProxyGeneralOptions() {
        const server = this.server;

        server.request.setHeader('host', this.domainToForward);

        let urlPath = server.request.requestURLPath;
        let urlPathPrefix = this.pathToForwardPrefix;

        urlPath = urlPath[0] === '/' ? urlPath : `/${urlPath}`;
        urlPath = `${urlPathPrefix}${urlPath}`;

        const options = {
            hostname: this.domainToForward,
            port: this.portToForwardPort,
            method: this.request.method,
            path: urlPath,
            headers: server.request.headers
        };

        if (server.isHTTPSUsed) {
            options.key = readFileSync('./ssl/server.key', 'utf8');
            options.cert = readFileSync('./ssl/server.crt', 'utf8');
        }

        return options;
    }

    forwardOpenProxyRequest() {
        return new Promise((resolve, reject) => {
            const server = this.server;
            const requestOptions = this.#prepareOpenProxyGeneralOptions();
            const requestFunc = server.request.isHTTPSUsed() ? https.request : http.request;

            const remoteRequest = requestFunc(requestOptions, (proxyResponse) => {
                server.response.addResponseHeader(proxyResponse.headers);
                server.request.writeHead(proxyResponse.statusCode);

                proxyResponse.on('error', (error) => {
                    console.error(error);
                    reject(error);
                });

                proxyResponse.on('end', () => {
                    resolve(proxyResponse);
                });

                // TODO: response class must support 'pipe' method
                proxyResponse.pipe(server.response.rawResponse, {end: true});
            });

            // TODO: request class must support 'pipe' method
            server.request.rawResponse.pipe(remoteRequest, {end: true});
        });
    }

    get portToForwardPort() {
        return this.#portToForwardPort;
    }

    get domainToForward() {
        return this.#domainToForward
    }

    get pathToForwardPrefix() {
        if (this.#pathToForwardPrefix === undefined || this.#pathToForwardPrefix === null) {
            return '';
        } else {
            return this.#pathToForwardPrefix;
        }
    }

    set portToForwardPort(portToForwardPort) {
        this.#portToForwardPort = portToForwardPort;
    }

    set domainToForward(domainToForward) {
        this.#domainToForward = domainToForward;
    }

    set pathToForwardPrefix(pathPrefix) {
        if (pathPrefix.length === 0) {
            return;
        }

        pathPrefix = ServerRequestClass.normalizeURLPath(pathPrefix);
        pathPrefix = pathPrefix[0] === '/' ? pathPrefix : `/${pathPrefix}`;

        this.#pathToForwardPrefix = pathPrefix;
    }

    constructor(parentServerFacade) {
        super(parentServerFacade);

        const constantsOverrides = this.server.constantsOverrides;

        this.#domainToForward = constantsOverrides.OPEN_PROXY_DOMAIN_TO_FORWARD_TO ? constantsOverrides.OPEN_PROXY_DOMAIN_TO_FORWARD_TO : OPEN_PROXY_DOMAIN_TO_FORWARD_TO;
        this.#portToForwardPort = constantsOverrides.OPEN_PROXY_FORWARD_PORT ? constantsOverrides.OPEN_PROXY_FORWARD_PORT : OPEN_PROXY_FORWARD_PORT;
    }
}

module.exports = OpenProxyServerFacadeClass;
