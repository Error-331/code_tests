'use strict';

const net = require('net');
const simple_tcp_server = net.createServer();

const BasicWebSocketServerClass = require('./../../server/js/classes/basic_web_socket_server_class');

const PORT = 9000;
const HOST = 'localhost';

simple_tcp_server.on('connection', (socket) => {
    console.log(`New client connection is made, address: ${socket.remoteAddress}:${socket.remotePort}`);
    socket.setTimeout(10000);

    const websocketServerInstance = new BasicWebSocketServerClass(socket, { enableDebug: true })
    websocketServerInstance.sendMessage("SERVER: Hello! Connection successfully made.\n");

    websocketServerInstance.on('data', (opcode, data) => {
        console.log(`Server WebSocket data received (opcode: ${opcode})`);
        console.log(data);
    });
});

simple_tcp_server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.log('Address in use, retrying...');

        setTimeout(() => {
            simple_tcp_server.close();
            simple_tcp_server.listen(PORT, HOST);
        }, 1000);
    }
    else {
        console.log("Server failed.")
    }
});

simple_tcp_server.listen(PORT, HOST,  () => {
    console.log(`TCP server opened on port: ${simple_tcp_server.address().port}`);
});

