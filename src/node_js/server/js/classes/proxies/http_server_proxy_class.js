'use strict';

class HTTPServerProxyClass {
    #server = null;

    serveJSON(jsonObject) {
        return this.server.response.serveJSON(jsonObject);
    }

    addResponseHeader(headerName, headerValue, override = true) {
        return this.response.addResponseHeader(headerName, headerValue, override);
    }

    writeHead(statusCode) {
        return this.response.writeHead(statusCode);
    }

    get server() {
        return this.#server;
    }

    get request() {
        return this.#server.request;
    }

    get response() {
        return this.#server.response;
    }

    get constantsOverrides() {
        return this.server.constantsOverrides;
    }

    get serverRootDir() {
        return this.server.serverRootDir
    }

    get urlPathParams() {
        return this.request.urlPathParams;
    }

    getPostValueByKey(key) {
        return this.request.getPostValueByKey(key);
    }

    constructor(server) {
        this.#server = server;
    }
}

module.exports = HTTPServerProxyClass;
