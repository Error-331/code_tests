'use strict';

const net = require('net');
const readline = require('readline');

const BasicWebSocketServerClass = require('./../../server/js/classes/basic_web_socket_server_class');

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const clientSocket = net.createConnection({ port: 9000 });
const websocketServerInstance = new BasicWebSocketServerClass(clientSocket, { enableDebug: true });

websocketServerInstance.on('data', (opcode, data) => {
    console.log(`Client WebSocket data received (opcode: ${opcode})`);
    console.log(data);
});

readlineInterface.on('line', (input) => {
    websocketServerInstance.sendMessage(`${input}`);
});