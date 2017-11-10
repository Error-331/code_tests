'use strict';

const {parseHTTPRequest} = require('./../utils/server_request_utils');
const {generateSHA1, encodeStringToBase64} = require('./../utils/crypto_utils');

class BasicWebSocketServerClass {

    _onWebSocketConnect() {
        this._isDebugEnabled && console.log('WebSocket event: connect');
    }

    _onWebSocketClose() {
        this._isDebugEnabled && console.log('WebSocket event: close');
    }

    _onWebSocketData(data) {
        this._isDebugEnabled && console.log('WebSocket event: data, message: ', data.toString('utf8'));

        // binary = latin1
        const stringData = data.toString('binary');

        if (!this._isWebSocketConnected) {
            this._performHandshake(stringData);
        } else {

        }
    }

    _onWebSocketDrain() {
        this._isDebugEnabled && console.log('WebSocket event: drain');
    }

    _onWebSocketEnd() {
        this._isDebugEnabled && console.log('WebSocket event: end');

     //   const concatedData = concatBuffers(this._dataChunks);
     //   this._dataChunks = [];

     //   console.log(concatedData);
    }

    _onWebSocketLookup() {
        this._isDebugEnabled && console.log('WebSocket event: lookup');
    }

    _onWebSocketTimeout() {
        this._isDebugEnabled && console.log('WebSocket event: timeout');
    }

    _onWebSocketError(error) {
        console.error(error);
    }

    _bindEventHandlers() {
        this._socket.on('connect', this._onWebSocketConnect.bind(this));
        this._socket.on('close', this._onWebSocketClose.bind(this));
        this._socket.on('data', this._onWebSocketData.bind(this));
        this._socket.on('drain', this._onWebSocketDrain.bind(this));
        this._socket.on('end', this._onWebSocketEnd.bind(this));
        this._socket.on('lookup', this._onWebSocketLookup.bind(this));
        this._socket.on('timeout', this._onWebSocketTimeout.bind(this));
        this._socket.on('error', this._onWebSocketError.bind(this));
    }

    // TODO: Sec-WebSocket-Protocol
    _performHandshake(receivedData) {
        const httpRequestData = parseHTTPRequest(receivedData);

        // save necessary data sent from client during handshake
        this._secWebSocketKeyClient = httpRequestData.headers['sec-websocket-key'];
        this._secWebSocketVersion = parseInt(httpRequestData.headers['sec-websocket-version']);
        this._secWebSocketExtension = httpRequestData.headers['sec-websocket-extensions'];

        const guid = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
        const responseKey = `${this._secWebSocketKeyClient}${guid}`;

        const responseKeyBase64 = generateSHA1(responseKey, 'base64');

        this._socket.write('HTTP/1.1 101 Switching Protocols\r\n', 'binary');
        this._socket.write(`Sec-WebSocket-Accept:${responseKeyBase64}\r\n`, 'binary');
        this._socket.write('Upgrade:websocket\r\n', 'binary');
        this._socket.write('Connection:Upgrade\r\n', 'binary');
        this._socket.write('\r\n');

        // temporary
        this._isWebSocketConnected = true;
    }


    constructor(socket, options) {
        this._socket = socket;
        this._isWebSocketConnected = false;

        this._isDebugEnabled = !!options.enableDebug;

        this._secWebSocketKeyClient = null;
        this._secWebSocketVersion = null;
        this._secWebSocketExtension = null;

        this._bindEventHandlers();
    }
}

module.exports = BasicWebSocketServerClass;