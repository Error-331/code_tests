'use strict';

class HTTPServerProxyClass {
    #server = null;

    serveJSON(jsonObject) {
        return this.server.response.serveJSON(jsonObject);
    }

    writeHead(statusCode) {
        return this.response.writeHead(statusCode);
    }

    addResponseHeader(headerName, headerValue, override = true) {
        return this.response.addResponseHeader(headerName, headerValue, override);
    }

    addTransformStream(transformStream) {
        this.response.addTransformStream(transformStream);
    }

    addCustomRoute(customRoute) {
        this.router.addCustomRoute(customRoute);
    }

    use(nextMiddleware) {
        this.server.use(nextMiddleware);
    }

    pipeToResponseFrom(readableStream) {
        return this.response.pipeFrom(readableStream);
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

    get router() {
        return this.#server.router;
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
