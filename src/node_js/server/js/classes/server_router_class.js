'use strict';

const ReqResUtilClass = require('./utils/req_res_util_class');
const { cloneDeep } = require('./../utils/object_utils');

class ServerRouterClass {
    #routes = [];

    addCustomRoute(customRoute) {
        this.#routes.push(customRoute);
    }

    findCustomRouteForCurrentRequest(request) {
        return this.#routes.find(route => {
            if (route.method && route.method.toLocaleLowerCase() !== request.method) {
                return false;
            }

            if (route.hostname && route.hostname !== request.hostname) {
                return false;
            }

            if (typeof route.path === 'string') {
                const normalizedURLPath = ReqResUtilClass.normalizeURLPath(route.path);
                return normalizedURLPath === '' ? false : normalizedURLPath === request.normalizedURLPath;
            } else {
                return route.path.test(request.normalizedURLPath);
            }
        });
    }

    constructor(routes) {
        this.#routes = cloneDeep(routes);
    }
}

module.exports = ServerRouterClass;
