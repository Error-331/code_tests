'use strict';

const net = require('net');
const simple_tcp_server = net.createServer();

const PORT = 9000;
const HOST = 'localhost';

simple_tcp_server.on('connection', (socket) => {
    console.log(`New client connection is made, address: ${socket.remoteAddress}:${socket.remotePort}`);

    socket.setTimeout(10000);

    socket.on('connect', () => {
       console.log('Server socket connected');
    });

    socket.on('ready', () => {
        console.log('Server socket ready');
    });

    socket.on('timeout', () => {
        console.log('Server socket timeout');
    });

    socket.on('data', (data) => {
        console.log('Server socket data received');
        console.log(data);
        console.log(data.toString());
    });

    socket.on('end', (error) => {
        console.log('Server socket end')
    });

    socket.once('close', () => {
        console.log('Server socket closed');
    });

    socket.on('error', (error) => {
        console.log('Server socket error')
    });

    socket.write("SERVER: Hello! Connection successfully made.\n");
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

