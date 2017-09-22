'use strict';

const http = require('http');

const {SERVER_PORT} = require ('./js/constants');
const routes = require('./js/routes');
const ServerClass = require('./js/server_class');

const requestHandler = async (request, response) => {
    const serverClassInstance = new ServerClass(request, response, routes, __dirname);
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