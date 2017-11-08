'use strict';

// https://nodejs.org/dist/latest-v8.x/docs/api/net.html#net_server_listen
// https://tools.ietf.org/html/rfc6455
// https://gist.github.com/bradwright/1021082

const {readFileSync} = require('fs');
const http = require('http');
const https = require('https');
const net = require('net');

const BasicServerClass = require('./js/classes/basic_server_class');
const BasicWebSocketServerClass = require('./js/classes/basic_web_socket_server_class');

const CookiesServerMixin = require('./js/mixins/cookies_server_mixin');
const StaticServerMixin = require('./js/mixins/static_server_mixin');
const JSONServerMixin = require('./js/mixins/json_server_mixin');
const ETagTrackingServerMixin = require('./js/mixins/etag_tracking_server_mixin');
const OpenProxyServerMixin = require('./js/mixins/open_proxy_server_mixin');

const {HTTP_SERVER_PORT, HTTPS_SERVER_PORT, WEB_SOCKET_SERVER_POST, WEB_SOCKET_HOST} = require ('./js/constants/general_server_constants');
const routes = require('./js/routes');

class MainServerClass extends OpenProxyServerMixin(ETagTrackingServerMixin(JSONServerMixin((CookiesServerMixin(StaticServerMixin(BasicServerClass)))))) {
}

const httpWebServerRequestHandler = async (request, response) => {
    const serverClassInstance = new MainServerClass(request, response, {}, routes, __dirname);
    await serverClassInstance.onHandleRequest();
};

const httpWebServer = http.createServer(httpWebServerRequestHandler);

httpWebServer.listen(HTTP_SERVER_PORT, (error) => {
    if (error) {
        console.error('Error while starting server (http) -', error);
    } else {
        console.log(`Server (http) is listening on ${HTTP_SERVER_PORT}`);
    }
});

const httpsWebServerRequestHandler = async (request, response) => {
    const serverClassInstance = new MainServerClass(request, response, {isHTTPS: true}, routes, __dirname);
    await serverClassInstance.onHandleRequest();
};

const httpsWebServer = https.createServer({
    key: readFileSync('./ssl/server.key', 'utf8'),
    cert: readFileSync('./ssl/server.crt', 'utf8'),
    ca: readFileSync('./ssl/ca.crt', 'utf8')
}, httpsWebServerRequestHandler);

httpsWebServer.listen(HTTPS_SERVER_PORT, (error) => {
    if (error) {
        console.error('Error while starting server (https) -', error);
    } else {
        console.log(`Server (https) is listening on ${HTTPS_SERVER_PORT}`);
    }
});

const socketServerRequestHandler = (socket) => {
    console.log('Socket handler...');
    const webSocketServerClassInstance = new BasicWebSocketServerClass(socket, {enableDebug: true});
};

const webSocketServer = net.createServer(socketServerRequestHandler);

webSocketServer.listen({port:  WEB_SOCKET_SERVER_POST, host: WEB_SOCKET_HOST} , () => {
    console.log(`Server (web-socket) is listening on ${WEB_SOCKET_SERVER_POST} at ${WEB_SOCKET_HOST}`);
});