'use strict';

const ServerRequestClass = require('./request/server_request_class');
const { cloneDeep } = require('./../utils/object_utils');

class ServerRouterClass {
    #routes = [];

    addCustomRoute(customRoute) {
        this.#routes.push(customRoute);
    }

    findCustomRouteForCurrentRequest(server) {
        const preparedURLPath = server.request.normalizeURLPath;
        const requestMethod = server.request.method;
        const requestHostname = server.hostname;

        return this.#routes.find(route => {
            if (route.method && route.method.toLocaleLowerCase() !== requestMethod) {
                return false;
            }

            if (route.hostname && route.hostname !== requestHostname) {
                return false;
            }

            if (typeof route.path === 'string') {
                const normalizedURLPath = ServerRequestClass.normalizeURLPath(route.path);
                return normalizedURLPath === '' ? false : normalizedURLPath === preparedURLPath;
            } else {
                return route.path.test(preparedURLPath);
            }
        });
    }

    constructor(routes) {
        this.#routes = cloneDeep(routes);
    }
}

module.exports = ServerRouterClass;
