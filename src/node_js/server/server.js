'use strict';

const cluster = require('cluster');

const MetaMasterServerClass = require('./js/classes/meta/meta_master_server_class');
const MetaChildServerClass = require('./js/classes/meta/meta_child_server_class');

if (cluster.isMaster) {
    process.on('message', () => console.log('pih pih'));

   // process.stdin.on('data', c => console.log('ss', c));

    const metaMasterServer = new MetaMasterServerClass();
    metaMasterServer.startCluster();
} else {
    const metaChildServerClass = new MetaChildServerClass();
    metaChildServerClass.start();
}

// https://nodejs.org/dist/latest-v8.x/docs/api/net.html#net_server_listen
// https://tools.ietf.org/html/rfc6455
// https://gist.github.com/bradwright/1021082

/*const {readFileSync} = require('fs');



const BasicWebSocketServerClass = require('./js/classes/basic_web_socket_server_class');


const StaticServerMixin = require('./js/classes/facades/static_server_facade_class');
const WebSocketReverseProxyServerMixin = require('./js/classes/facades/web_socket_reverse_proxy_server_facade_class');



// classes definition starts here
class WebSocketReverseProxyClass extends LogServerMixin(WebSocketReverseProxyServerMixin(BasicServerClass)) {}

// sockets array definition starts here
const openSockets = [];





httpWebServer.on('upgrade', async (request, socket) => {
    const serverClassInstance = new WebSocketReverseProxyClass(request, socket, {}, routes, __dirname);
    await serverClassInstance.onHandleUpgradeRequest();

    const webSocketServerClassInstance = new BasicWebSocketServerClass(socket, {enableDebug: true});

    openSockets.push(webSocketServerClassInstance);

    webSocketServerClassInstance.on('data', (opcode, data) => {
       console.log(`WebSocket data received (code: ${opcode}): ${data}`);

       const dataObj = JSON.parse(data);

       if (dataObj.type === 'chat_message') {
           openSockets.forEach((webSocketInstance) => {
               if (webSocketInstance.isWebSocketConnected()) {
                   webSocketInstance.sendMessage(data);
               }
           });
       }
    });

    webSocketServerClassInstance.on('close', (closeCode, reson) => {
        console.log(`WebSocket closed (code: ${closeCode}): ${reson}`);
    });
});



const httpsWebServerRequestHandler = async (request, response) => {
    const serverClassInstance = new HttpServerClass(request, response, {isHTTPS: true}, routes, __dirname);
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
});*/
