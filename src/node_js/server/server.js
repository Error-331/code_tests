'use strict';

// https://nodejs.org/dist/latest-v8.x/docs/api/net.html#net_server_listen
// https://tools.ietf.org/html/rfc6455
// https://gist.github.com/bradwright/1021082

const http = require('http');
const net = require('net');

const BasicServerClass = require('./js/classes/basic_server_class');
const CookiesServerMixin = require('./js/mixins/cookies_server_mixin');
const StaticServerMixin = require('./js/mixins/static_server_mixin');
const JSONServerMixin = require('./js/mixins/json_server_mixin');
const ETagTrackingServerMixin = require('./js/mixins/etag_tracking_server_mixin');
const OpenProxyServerMixin = require('./js/mixins/open_proxy_server_mixin');

const {SERVER_PORT} = require ('./js/constants/general_server_constants');
const routes = require('./js/routes');

class MainServerClass extends OpenProxyServerMixin(ETagTrackingServerMixin(JSONServerMixin((CookiesServerMixin(StaticServerMixin(BasicServerClass)))))) {
}

const webServerRequestHandler = async (request, response) => {
    const serverClassInstance = new MainServerClass(request, response, routes, __dirname);
    await serverClassInstance.onHandleRequest();
};

const socketServerRequestHandler = (socket) => {

    const isWebSocketConnected = false;

    socket.addListener('connect', () => {
        console.log('Web socket - connect');
    });

    socket.addListener('close', () => {
        console.log('Web socket - close');
    });

    socket.addListener('data', (data) => {
        console.log('Web socket - data');
    });

    socket.addListener('drain', () => {
        console.log('Web socket - drain');
    });

    socket.addListener('end', () => {
        console.log('Web socket - end');
    });

    socket.addListener('lookup', () => {
        console.log('Web socket - lookup');
    });

    socket.addListener('timeout', () => {
        console.log('Web socket - timeout');
    });

    socket.addListener('error', (error) => {
        console.error('Web socket - error:', error);
    });
};

const webServer = http.createServer(webServerRequestHandler);

webServer.listen(SERVER_PORT, (error) => {
    if (error) {
        return console.error('Error while starting server -', error);
    } else {
        console.log(`Server is listening on ${SERVER_PORT}`);
    }
});

const webSocketServer = net.createServer(socketServerRequestHandler);

webSocketServer.listen({port: 8080, host: 'localhost'} , () => console.log('Web socket server is bound'));