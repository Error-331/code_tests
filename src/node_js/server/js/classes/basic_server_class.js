'use strict';

const url = require('url');

const {
    SERVER_DOMAIN,
    HTML_PAGES_DIRECTORY_PATH,
    RESOURCES_DIRECTORY_PATH,
} = require ('./../constants/general_server_constants');

const HTTP_STATUS_CODES = require('./../constants/http_status_codes');

const ServerRequestClass = require('./request/server_request_class');
const ServerResponseClass = require('./server_response_class');

const ServerRouterClass = require('./server_router_class');

class BasicServerClass {
    #request = null;
    #response = null;
    #router = null;

    #middlewares = [];

    #isHTTPS = false;
    #protocolVersion = '1.1';

    #serverRootDir = __dirname;
    #constantsOverrides = {};

    async #onBeforeRouteRequest() {
        this.#middlewares.each(async (middleware) => await middleware.onBeforeRouteRequest(this));
    }

    getStatusCodeString(statusCode) {
        return HTTP_STATUS_CODES[statusCode.toString()];
    }

    get serverDomain() {
        return this.#constantsOverrides.SERVER_DOMAIN ? this.#constantsOverrides.SERVER_DOMAIN : SERVER_DOMAIN;
    }

    get htmlPagesDirectoryPath() {
        return this.#constantsOverrides.HTML_PAGES_DIRECTORY_PATH ? this.#constantsOverrides.HTML_PAGES_DIRECTORY_PATH : HTML_PAGES_DIRECTORY_PATH;
    }

    get resourcesDirectoryPath() {
        return this.#constantsOverrides.RESOURCES_DIRECTORY_PATH ? this.#constantsOverrides.RESOURCES_DIRECTORY_PATH : RESOURCES_DIRECTORY_PATH;
    }

    get isHTTPSUsed() {
        return this.#isHTTPS;
    }

    get protocolVersion() {
        return this.#protocolVersion;
    }

    get protocol() {
        return this.isHTTPSUsed ? 'https' : 'http';
    }

    get domain() {
        return this.#constantsOverrides.SERVER_DOMAIN ? this.#constantsOverrides.SERVER_DOMAIN : SERVER_DOMAIN;
    }
    
    get request() {
        return this.#request;
    }

    get response() {
        return this.#response;
    }

    get hostname() {
        const hostHeader = this.#request.getHeader('host');
        const protocol = this.protocol();

        if (hostHeader) {
            return url.parse(`${protocol}://${hostHeader}`).hostname;
        } else {
            return null;
        }
    }

    get port() {
        const hostHeader = this.#request.getHeader('host');
        const protocol = this.protocol();

        if (hostHeader) {
            return url.parse(`${protocol}://${hostHeader}`).port;
        } else {
            return null;
        }
    }

    get constantsOverrides() {
        return this.#constantsOverrides;
    }

    use(nextMiddleware) {
        this.#middlewares.push(nextMiddleware);
    }

    async routeRequest() {
        if (this.request.urlPathParams.length === 0) {
            this.request.addURLPathParam('index.html');
        }

        const customRouteParamsObj = this.#router.findCustomRouteForCurrentRequest(this);

        try {
            if (customRouteParamsObj) {
                await this.#response.serverDataByURLParams(customRouteParamsObj);
            } else {
                const error = new Error(`Cannot find rout handler for: "${this.#request.requestURLPath}"`);
                this.#response.serveErrorPage(404, error);
            }
        } catch(error) {
            this.#response.serveErrorPage(500, error);
        }
    }

    async onHandleRequest() {
        try {
            await this.#request.prepare();
            await this.#onBeforeRouteRequest();
            await this.routeRequest();
        } catch(error) {
            this.#response.serveErrorPage(500, error);
            return this.#request.rawRequest.connection.destroy();
        }
    }

    constructor(request, response, options = {}, routes = [], serverRootDir, constantsOverrides) {
        this.#request = new ServerRequestClass(request, './');
        this.#response = new ServerResponseClass(response);

        this.#router = new ServerRouterClass(routes);

        this.#isHTTPS = options.isHTTPS !== undefined ? options.isHTTPS : false;
        this.#serverRootDir = serverRootDir;
        this.#constantsOverrides = constantsOverrides ? constantsOverrides : {};
    }
}

module.exports = BasicServerClass;
