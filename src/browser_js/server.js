'use strict';

const http = require('http');

const BasicServerClass = require('../node_js/server/js/classes/servers/http_server_class');
const CookiesServerMixin = require('../node_js/server/js/classes/facades/cookies_server_facade_class');
const StaticServerMixin = require('../node_js/server/js/classes/facades/static_server_facade_class');

const {HTTP_SERVER_PORT} = require ('./../node_js/server/js/constants/general_server_constants');
const routes = require('./routes');

const constantsOverrides = {
    'HTML_PAGES_DIRECTORY_PATH': '.',
    'RESOURCES_DIRECTORY_PATH': '.'
};

class MainServerClass extends CookiesServerMixin(StaticServerMixin(BasicServerClass)) {
}

const requestHandler = async (request, response) => {
    const serverClassInstance = new MainServerClass(request, response, {}, routes, __dirname,  constantsOverrides);
    await serverClassInstance.onHandleRequest();
};

const server = http.createServer(requestHandler);

server.listen(HTTP_SERVER_PORT, (error) => {
    if (error) {
        return console.error('Error while starting server -', error);
    } else {
        console.log(`Server is listening on ${HTTP_SERVER_PORT}`);
    }
});
