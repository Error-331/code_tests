'use strict';

const ReqResUtilClass = require('./utils/req_res_util_class');
const { cloneDeep } = require('./../utils/object_utils');

class ServerRouterClass {
    #routes = [];

    #prepareRoutes() {
        this.#routes.map(route => {
            if (route.method === undefined || route.method === null) {
                route.method = 'get';
            } else {
                route.method = route.method.toLowerCase();
            }
        })
    }

    #prepareRoutesPaths() {
        const preparedRoutes = [];

        for(let routeCounter = 0; routeCounter < this.#routes.length; routeCounter++) {
            let currentRoute = Object.assign({}, this.#routes[routeCounter]);
            let currentPath = currentRoute.path;

            if (typeof currentPath === 'object' && (currentPath instanceof RegExp)) {
                preparedRoutes.push(currentRoute);
                continue;
            }

            currentPath = currentPath.trim();

            if (currentPath[0] !== '/') {
                currentPath = '/' + currentPath
            }

            if (currentPath === '/') {
                currentRoute.path = [currentPath];
                preparedRoutes.push(currentRoute);
            } else {
                const pathParts = currentPath.split('/');

                if (pathParts[0] === '') {
                    pathParts[0] = '/';
                }

                currentRoute.path = pathParts;
                preparedRoutes.push(currentRoute);
            }
        }

        return preparedRoutes;
    }

    #sortRoutesWithPreparedPaths() {
        return this.#prepareRoutesPaths()
            .slice()
            .sort(
                (firstRoute, secondRoute) => {
                    const firstPathParts = firstRoute.path;
                    const secondPathParts = secondRoute.path;

                    if (
                        firstPathParts instanceof RegExp &&
                        secondPathParts instanceof RegExp
                    ) {
                        return 0;
                    } else if (
                        firstPathParts instanceof RegExp &&
                        Array.isArray(secondPathParts)
                    ) {
                        if (
                            secondPathParts.length > 1 && (secondPathParts[1].includes('*') || secondPathParts[1].includes('?'))
                        ) {
                            return -1;
                        } else {
                            return 1;
                        }

                    } else if (
                        Array.isArray(firstPathParts) &&
                        secondPathParts instanceof RegExp
                    ) {
                        if (
                            firstPathParts.length > 1 && (firstPathParts[1].includes('*') || firstPathParts[1].includes('?'))
                        ) {
                            return 1;
                        } else {
                            return -1;
                        }
                    } else {
                        const firstPathPartsLength = firstPathParts.length;
                        const secondPathPartsLength = secondPathParts.length;


                        if (firstPathPartsLength > secondPathPartsLength) {
                            return -1;
                        } else if(firstPathPartsLength < secondPathPartsLength) {
                            return 1;
                        } else {
                            for (let firstPathPartsCnt = 0; firstPathPartsCnt < firstPathPartsLength; firstPathPartsCnt++) {
                                const firstPathPart = firstPathParts[firstPathPartsCnt];
                                const secondPathPart = secondPathParts[firstPathPartsCnt];

                                if (firstPathPart.localeCompare(secondPathPart) === 0) {
                                    continue;
                                } else {
                                    if (firstPathPart.includes('*')) {
                                        if (secondPathPart.includes('*')) {
                                            return 0;
                                        } else if(secondPathPart.includes('?')) {
                                            return -1;
                                        } else {
                                            return 1;
                                        }
                                    } else if (firstPathPart.includes('?')) {
                                        if (secondPathPart.includes('*')) {
                                            return 1;
                                        } else if(secondPathPart.includes('?')) {
                                            return 0;
                                        } else {
                                            return 1;
                                        }
                                    } else if (firstPathPart.includes('{')) {
                                        if (secondPathPart.includes('*')) {
                                            return -1;
                                        } else if(secondPathPart.includes('?')) {
                                            return -1;
                                        } else if (secondPathPart.includes('{')) {
                                            return 0;
                                        } else {
                                            return 1;
                                        }
                                    } else {
                                        if (secondPathPart.includes('*')) {
                                            return -1;
                                        } else if(secondPathPart.includes('?')) {
                                            return -1;
                                        } else if (secondPathPart.includes('{')) {
                                            return -1;
                                        } else {
                                            return firstPathPart.localeCompare(secondPathPart);
                                        }
                                    }

                                }
                            }
                        }
                    }

                    return 0;
        });
    }

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

    get routesWithPreparedPaths() {
        return this.#prepareRoutesPaths();
    }

    get sortedRoutesByPreparedPaths() {
        return this.#sortRoutesWithPreparedPaths();
    }

    constructor(routes) {
        this.#routes = cloneDeep(routes);
        this.#prepareRoutes();
    }
}

module.exports = ServerRouterClass;
