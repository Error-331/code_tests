'use strict';

const http = require('http');

const {SERVER_PORT} = require ('./../node_js/server/js/constants');
const routes = require('./routes');
const ServerClass = require('./../node_js/server/js/server_class');

const constantsOverrides = {
    'HTML_PAGES_DIRECTORY_PATH': '.',
    'RESOURCES_DIRECTORY_PATH': '.'
};

const requestHandler = async (request, response) => {
    const serverClassInstance = new ServerClass(request, response, routes, __dirname, constantsOverrides);
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