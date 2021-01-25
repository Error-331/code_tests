'use strict';

const StaticServerFacadeClass = require('./../facades/static_server_facade_class');

class StaticServerMiddlewareClass {
    async onBeforeRouteRequest(server) {
        server.router.addCustomRoute({
            path: /\.[^.\\/:*?"<>|\r\n]+$/,
            handler: async (serverProxy) => {
                const staticServerFacade = new StaticServerFacadeClass();

                staticServerFacade.server = serverProxy;
                await staticServerFacade.serveStaticFileByURLParams()
            }
        });
    }
}

module.exports = StaticServerMiddlewareClass;
