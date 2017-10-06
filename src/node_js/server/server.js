'use strict';

const http = require('http');

const BasicServerClass = require('./js/classes/basic_server_class');
const CookiesServerMixin = require('./js/mixins/cookies_server_mixin');
const StaticServerMixin = require('./js/mixins/static_server_mixin');

const {SERVER_PORT} = require ('./js/constants/general_server_constants');
const routes = require('./js/routes');

class MainServerClass extends CookiesServerMixin(StaticServerMixin(BasicServerClass)) {
}

const requestHandler = async (request, response) => {
    const serverClassInstance = new MainServerClass(request, response, routes, __dirname);
    await serverClassInstance.onHandleRequest();
};

const server = http.createServer(requestHandler);

server.listen(SERVER_PORT, (error) => {
    if (error) {
        return console.error('Error while starting server -', error);
    } else {
        console.log(`Server is listening on ${SERVER_PORT}`);
    }
});