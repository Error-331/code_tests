'use strict';

const net = require('net');
const readline = require('readline');

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const clientSocket = net.createConnection({ port: 9000 }, () => {
    console.log('Client socket connected');
});

clientSocket.on('end', () => {
    console.log('Client socket end');
})

clientSocket.on('data', (data) => {
    console.log('Client socket data received');
    console.log(data);
    console.log(data.toString());

    clientSocket.write('Test message from client');
});

readlineInterface.on('line', (input) => {
    clientSocket.write(`Client socket message: ${input}`);
});