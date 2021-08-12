'use strict';

/*const cluster = require('cluster');

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
}*/




/*


path: '/',
path: '/hello/{user}',
path: '/hello/{user?}',
/{any*}
/{files*2}
/{files*}


/route1/sub1/sub2
/route2/sub1/sub2
/sub1/sub2/route1

/{any*}


{user} > {user?}
{files*} > {user?}

 */

const ServerRouterClass = require('./js/classes/server_router_class');

const routes = [
    { path: 'route3/{files*}', handler: () => {} },
    { path: '/', handler: () => {} },
    { path: '/hello/{user}', handler: () => {} },
    { path: '/hello/{user?}   ', handler: () => {} },
    { path: ' /{any*}   ', handler: () => {} },
    { path: '/{files*2}', handler: () => {} },
    { path: '   /{files*}', handler: () => {} },

    { path: /\.[^.\\/:*?"<>|\r\n]+$/, handler: () => {} },

    { path: 'route3/sub1/sub2/sub3/{files*}', handler: () => {} },
    { path: 'route3/sub1/sub2/sub3', handler: () => {} },
    { path: 'route3/sub1/sub2/sub3/sub4', handler: () => {} },
    { path: 'route3/sub1/red5/sub3/sub4', handler: () => {} },
    { path: 'route3/sub3/sub2/sub3/sub4', handler: () => {} },
    { path: 'route3/sub1/sub2/sub3/{file}', handler: () => {} },
    { path: 'route3/sub1/{file}/sub3/sub4', handler: () => {} },
    { path: 'route3/sub1/sub2/sub3/{file?}', handler: () => {} },

    { path: 'route3/sub1/{files*}', handler: () => {} },
    { path: '/route1/sub1/sub2', handler: () => {} },

    { path: /aa(b-c).*$/, handler: () => {} },
    { path: 'route3/sub1/{file}/sub3/sub4', handler: () => {} },
    { path: 'route3/sub1/{file}/{red}/sub4', handler: () => {} },
    { path: 'route3/sub3/{file}/{red}/sub4', handler: () => {} },

    { path: 'route4/{file}/{name*}', handler: () => {} },
    { path: 'route4/{file}/sub2', handler: () => {} },
    { path: 'route4/{file}/{name?}', handler: () => {} },
    { path: 'route4/sub1/sub2', handler: () => {} },

    { path: '/route2/sub1/sub2', handler: () => {} },
    { path: '/sub1/sub2/route1', handler: () => {} },

    { path: 'route3/{files?}', handler: () => {} },

    { path: 'route3/sub1/sub2', handler: () => {} },

];


const router = new ServerRouterClass(routes);







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
