'use strict';

const ListOfChildrenGeneralTreeClass = require('./../../../../vanilla_js/data_structures/general_tree/list_of_children_general_tree/code/list_of_children_general_tree_class');

const RegularGeneralTreeClass = require('./../../../../vanilla_js/data_structures/general_tree/regular/code/regular_general_tree_class');

const ReqResUtilClass = require('./utils/req_res_util_class');
const { cloneDeep } = require('./../utils/object_utils');

class ServerRouterClass {
    #routes = [];
    #routesTrees = new Map();

    #pathPartTreeComparator(pathNode, method, path) {
        if (pathNode.data.path instanceof RegExp) {
            return false;
        }

        return pathNode.data.method === method && pathNode.data.path === path;
    }

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

    #buildRouteTreeForMethod(method, routes) {
        const treeObj = new RegularGeneralTreeClass();
        let currentNode = treeObj.createNewRoot(([method, pathPart], childNode) => this.#pathPartTreeComparator(childNode, method, pathPart), { method, path: '/', handler: null });

        routes.forEach(route => {
            if (typeof route.path === 'object' && route.path instanceof RegExp) {
                currentNode.addChild({ method, path: route.path, handler: route.handler });
                return;
            }

            const routePathParts = route.path.slice();

            // if handler for root path is found (e.q. '/') we need to add this handler to it since we have already added data for root path without handler function
            if (routePathParts.length === 1) {
                treeObj.root.data = Object.assign(treeObj.root.data,{ handler: route.handler });
                return;
            }

            // remove root path ('/')
            routePathParts.shift();

            routePathParts.forEach(pathPart => {
                let searchNode = currentNode.findChild([ method, pathPart ]);

                if (!searchNode) {
                    searchNode = currentNode.addChild({ method, path: pathPart, handler: null });
                }

                currentNode = searchNode;
            });

            currentNode.data = { method, path: routePathParts[routePathParts.length - 1], handler: route.handler };
            currentNode = treeObj.root;
        });

        this.#routesTrees.set(method, treeObj);
    }

    #rebuildRouteTree() {
        this.#routesTrees = new Map();
        const sortedRoutesWithPreparedPathsByMethod = this.sortedRoutesWithPreparedPathsByMethod;

        for (const [method, routes] of sortedRoutesWithPreparedPathsByMethod) {
            this.#buildRouteTreeForMethod(method, routes);
        }
    }

    #initRoutes() {
        this.#prepareRoutes();
        this.#rebuildRouteTree();
    }

    addCustomRoute(customRoute) {
        this.#routes.push(customRoute);
        this.#initRoutes();
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

    get sortedRoutesWithPreparedPathsByMethod() {
        const sortedRoutesWithPreparedPathsByMethod = new Map();

        this.sortedRoutesByPreparedPaths.forEach(route => {
            const routeMethod = route.method.toLowerCase();

            if (!sortedRoutesWithPreparedPathsByMethod.has(routeMethod)) {
                sortedRoutesWithPreparedPathsByMethod.set(routeMethod, [route])
            } else {
                const routesByMethod = sortedRoutesWithPreparedPathsByMethod.get(routeMethod);
                routesByMethod.push(route);
            }
        });

        return sortedRoutesWithPreparedPathsByMethod;
    }

    get routesTrees() {
        return this.#routesTrees;
    }

    constructor(routes) {
        this.#routes = cloneDeep(routes);
        this.#initRoutes();
    }
}

module.exports = ServerRouterClass;
