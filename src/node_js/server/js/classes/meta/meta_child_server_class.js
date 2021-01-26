'use strict';

const {
    HTTP_SERVER_PORT,
    HTTPS_SERVER_PORT,

    HTTP_SERVER_PROTOCOL,
    HTTPS_SERVER_PROTOCOL,
    WEB_SOCKET_SERVER_PROTOCOL,
} = require ('./../../constants/general_server_constants');

const {
    HTTP_CHILD_SERVER_TYPE,
    HTTPS_CHILD_SERVER_TYPE,
    WEB_SOCKET_CHILD_SERVER_TYPE,
} = require('./../../constants/server_cluster_constants');

const { SERVER_LISTEN_ERROR_EVENT } = require('./../../constants/server/server_events_constants');

const routes = require('./../../routes');

const HTTPServerClass = require('./../servers/http_server_class');

const LogServerMiddlewareClass = require('./../middlewares/log_server_middleware_class');
const StaticServerMiddlewareClass = require('./../middlewares/static_server_middleware_class');

class MetaChildServerClass {
    #type = null;

    #createHTTPServer() {
        const serverClassInstance = new HTTPServerClass({
            protocol: HTTP_SERVER_PROTOCOL,
            port: HTTP_SERVER_PORT,
        }, routes);

        serverClassInstance.use(new StaticServerMiddlewareClass());
        serverClassInstance.use(new LogServerMiddlewareClass());

        return serverClassInstance;
    }

    #createServer(type) {
        switch (type) {
            case HTTP_CHILD_SERVER_TYPE:
                return this.#createHTTPServer();
                break;
            default:
                return null;
                break;
        }
    }

    start() {
        let server = this.#createServer(this.#type);




        if (server !== null) {
            /*server.on(SERVER_LISTEN_ERROR_EVENT, (er) => {
                console.log('bbbbb', er);
            });*/

            try {
                server.startListening();
            } catch(error) {
                console.log('ggggg', error);
            }


        }
    }

    constructor() {
        this.#type = process.argv[2].split('=')[1];
    }
}

module.exports = MetaChildServerClass;
