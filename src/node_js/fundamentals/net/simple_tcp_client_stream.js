'use strict';

const net = require('net');
const readline = require('readline');
const { Transform, Writable } = require('stream');

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class SocketReceiverTransformStream extends Transform {
    _transform(chunk, encoding, callback) {
        console.log('Client socket data received (transform stream)');
        console.log(chunk);
        console.log(chunk.toString());

        const payload = `*SERVER_MESSAGE*${chunk.toString()}*SERVER_MESSAGE*`;

        callback(null, payload);
    }

    constructor(options) {
        super(options);
    }
}

class SocketSenderTransformStream extends Transform {
    _transform(chunk, encoding, callback) {
        const payload = `*CLIENT_MESSAGE*${chunk.toString()}*CLIENT_MESSAGE*`;

        callback(null, payload);
    }

    constructor(options) {
        super(options);
    }
}

class SocketReceiverWriterStream extends Writable {
     _write(chunk, encoding, callback) {
         this.emit('data', chunk)
     }
}

const clientSocket = net.createConnection({ port: 9000 }, () => {
    console.log('Client socket connected');
});

const senderTransformStream = new SocketSenderTransformStream();
const receiverTransformStream = new SocketReceiverTransformStream();
const receiverWriterStream = new SocketReceiverWriterStream();

receiverTransformStream.pipe(receiverWriterStream);
senderTransformStream.pipe(clientSocket);
clientSocket.pipe(receiverTransformStream)

receiverWriterStream.on('data', (chunk) => {
    console.log('Client socket data received (writer stream)');
    console.log('data:', chunk);
    console.log(chunk.toString());
});

readlineInterface.on('line', (input) => {
    senderTransformStream.write(`Client socket message: ${input}`)
});