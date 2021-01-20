'use strict';

const http = require('http');
const https = require('https');

const {
    HTTP_SERVER_PORT,
    HTTPS_SERVER_PORT
} = require ('./../../constants/general_server_constants');

const {
    HTTP_CHILD_SERVER_TYPE,
    HTTPS_CHILD_SERVER_TYPE,
    WEB_SOCKET_CHILD_SERVER_TYPE,
} = require('./../../constants/server_cluster_constants');

const routes = require('./../../routes');

const BasicServerClass = require('./../basic_server_class');
const LogServerMiddlewareClass = require('./../middlewares/log_server_middleware_class');

class MetaChildServerClass {
    #type = null;

    async #onHTTPServerRequest(request, response) {
        const serverClassInstance = new BasicServerClass(request, response, {}, routes, __dirname);
        serverClassInstance.use(new LogServerMiddlewareClass());

        await serverClassInstance.onHandleRequest();
    }

    #startHTTPServer() {
        console.log('CHILD: starting HTTP server')

        const httpWebServer = http.createServer(this.#onHTTPServerRequest);

        httpWebServer.listen(HTTP_SERVER_PORT, (error) => {
            if (error) {
                console.error('Error while starting server (http) -', error);
            } else {
                console.log(`Server (http) is listening on ${HTTP_SERVER_PORT}`);
            }
        });
    }

    start() {
        switch (this.#type) {
            case HTTP_CHILD_SERVER_TYPE:
                this.#startHTTPServer();
                break;
            default:
                break;
        }
    }

    constructor() {
        this.#type = process.argv[2].split('=')[1];
    }
}

module.exports = MetaChildServerClass;