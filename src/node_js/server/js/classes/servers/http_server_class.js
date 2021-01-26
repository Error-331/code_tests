'use strict';

const http = require('http');
const EventEmitter = require('events');

const { SERVER_ERROR_EVENT } = require('./../../constants/server/server_events_constants');

const ServerRequestClass = require('./../request/server_request_class');
const ServerResponseClass = require('./../server_response_class');

const ServerRouterClass = require('./../server_router_class');
const ServerMixinErrorClass = require('./../server_mixin_error_class');
const HTTPServerProxyClass = require('./../proxies/http_server_proxy_class');

const ReqResUtilClass = require('./../utils/req_res_util_class');

class HTTPServerClass extends EventEmitter {
    #server = null;

    #request = null;
    #response = null;
    #router = null;

    #protocol = null;
    #port = null;

    #middlewares = [];

    #serverRootDir = process.cwd();
    #constantsOverrides = {};

    async #routeRequest() {
        if (this.request.urlPathParams.length === 0) {
            this.request.addURLPathParam('index.html');
        }

        const customRouteParamsObj = this.#router.findCustomRouteForCurrentRequest(this.#request);

        if (customRouteParamsObj) {
            await this.#response.serverDataByURLParams(new HTTPServerProxyClass(this), customRouteParamsObj);
        } else {
            throw new ServerMixinErrorClass(404, `Cannot find rout handler for: "${this.#request.urlPath}"`);
        }
    }

    async #onBeforeErrorSent(error) {
        await this.#executeMiddlewareMethod('onBeforeErrorSent', error);
    }

    async #onBeforeRouteRequest() {
        await this.#executeMiddlewareMethod('onBeforeRouteRequest');
    }

    async #onHandleRequestError(error) {
        await this.#onBeforeErrorSent(error);

        if (error instanceof ServerMixinErrorClass) {
            if (error.httpResponseCode >= 500) {
                // user should not see system error message so we replace it with generic one
                return this.#response?.serveErrorPage?.(error.httpResponseCode, ReqResUtilClass.findStatusCodeStringByStatusCode(error.httpResponseCode));
            } else {
                return this.#response?.serveErrorPage?.(error.httpResponseCode, error);
            }
        } else {
            // user should not see system error message so we replace it with generic one
            return this.#response?.serveErrorPage?.(500, 'Fatal server error');
        }
    }

    async #onHandleRequest(request, response) {
        this.#request = new ServerRequestClass(request, './');
        this.#response = new ServerResponseClass(response);

        try {
            await this.#request.prepare();
            await this.#onBeforeRouteRequest();
            await this.#routeRequest();
        } catch(error) {
            await this.#onHandleRequestError(error);
        } finally {
            await this.finalizeRequest();
        }
    }

    async #onHandleServerError(error) {
        this.emit(SERVER_ERROR_EVENT, error);
        await this.#onHandleRequestError(error);
    }

    async #executeMiddlewareMethod(methodName, ...params) {
        for (let middlewareIdx = 0; middlewareIdx < this.#middlewares.length; middlewareIdx++) {
            await this.#middlewares[middlewareIdx]?.[methodName]?.(this, ...params);
        }
    }

    #bindEvents() {
        this.#server.on('error', this.#onHandleServerError.bind(this));
    }

    async destroy() {
        await this.finalizeRequest();

        this.#server = null;
        this.#router = null;

        this.#protocol = null;
        this.#port = null;

        this.#middlewares = [];

        this.#serverRootDir = '';
        this.#constantsOverrides = {};
    }

    async finalizeRequest() {
        await this.#request.destroy();
        await this.#response.destroy();

        this.#request = null;
        this.#response = null;
    }

    use(nextMiddleware) {
        this.#middlewares.push(nextMiddleware);
    }

    updateOptions(options) {
        this.#protocol = options.protocol;
        this.#port = options.port;
    }

    startListening() {
        this.#server.listen(this.port);
    }

    get server() {
        return this.#server;
    }

    get protocol() {
        return this.#protocol;
    }

    get isHTTPS() {
        return false;
    }

    get port() {
        return this.#port;
    }
    
    get request() {
        return this.#request;
    }

    get response() {
        return this.#response;
    }

    get router() {
        return this.#router;
    }

    get serverRootDir() {
        return this.#serverRootDir;
    }

    get constantsOverrides() {
        return this.#constantsOverrides;
    }

    constructor(options = {}, routes = [], constantsOverrides) {
        super();

        this.#server = http.createServer(this.#onHandleRequest.bind(this));
        this.#router = new ServerRouterClass(routes);

        this.updateOptions(options);
        this.#constantsOverrides = constantsOverrides ? constantsOverrides : {};

        this.#bindEvents();
    }
}

module.exports = HTTPServerClass;
