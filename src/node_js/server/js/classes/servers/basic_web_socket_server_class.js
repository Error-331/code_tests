'use strict';

const { EventEmitter } = require('events');

const NAME_TO_CLOSE_CODE = require('./../../constants/websocket/web_socket_close_codes');

const BasicWebSocketReceiverStreamClass = require('./../streams/writable/basic_web_socket_receiver_stream_class');
const BasicWebSocketSenderStreamClass = require('./../streams/transform/basic_web_socket_sender_stream_class');

class BasicWebSocketServerClass extends EventEmitter {
    #socket = null;
    #isClosed = false;

    #isDebugEnabled = false;

    #receiverStream = null;
    #senderStream = null;

    #isClient = false;

    #closeSocket(code, reason = '') {
        let responseBuffer;

        if (code) {
            // 2 bytes of service data + unmasked data
            responseBuffer = Buffer.alloc(Buffer.byteLength(reason) + 2);

            // write service data
            responseBuffer.writeUInt16BE(code, 0);

            // write payload
            responseBuffer.write(reason, 2);
        } else {
            responseBuffer = Buffer.alloc(0);
        }

        //this.#writeToSocket(MESSAGE_TYPE_TO_OPCODE.CLOSE, responseBuffer);
       // this.#isClosed = true;
    }

    sendMessage(message) {
        this.#senderStream.write(message);
    }

    isWebSocketConnected() {
        return !this._isClosed;
    }

    #onWebSocketConnect() {
        this.#isDebugEnabled && console.log('WebSocket event: connect');
    }

    #onWebSocketClose(error) {
        this.#isDebugEnabled && console.log('WebSocket event: close');
        this.#isDebugEnabled && error && console.error('WebSocket close with error:', error);

        if (!this.#isClosed) {
            this.emit('close', NAME_TO_CLOSE_CODE);
            this.#isClosed = true;
        }
    }

    #onWebSocketLookup() {
        this.#isDebugEnabled && console.log('WebSocket event: lookup');
    }

    #onWebSocketTimeout() {
        this.#isDebugEnabled && console.log('WebSocket event: timeout');
    }

    #onWebSocketError(error) {
        console.error(error);
    }

    #bindSocketEventHandlers() {
        this.#socket.on('connect', this.#onWebSocketConnect.bind(this));
        this.#socket.on('close', this.#onWebSocketClose.bind(this));

        this.#socket.on('lookup', this.#onWebSocketLookup.bind(this));
        this.#socket.on('timeout', this.#onWebSocketTimeout.bind(this));
        this.#socket.on('error', this.#onWebSocketError.bind(this));
    }

    #bindReceiverStreamHandlers() {
        this.#receiverStream.on('message', (message, opcode) => {console.log('message', message, message.toString(), opcode)});
        this.#receiverStream.on('error', (error) => console.log('receiver error', error.message));
    }

    #bindSenderSteamHandlers() {
        this.#senderStream.on('error', (error) => console.log(error));
    }

    #bindEventHandlers() {
        this.#bindSocketEventHandlers();
        this.#bindReceiverStreamHandlers();
        this.#bindSenderSteamHandlers();
    }

    #pipeStreams() {
        this.#senderStream.pipe(this.#socket);
        this.#socket.pipe(this.#receiverStream);
    }

    constructor(socket, options) {
        super();

        this.#socket = socket;
        this.#isClosed = false;

        this.#isDebugEnabled = options?.enableDebug ?? false;
        this.#isClient = options?.isClient ?? false;

        this.#receiverStream = new BasicWebSocketReceiverStreamClass();
        this.#senderStream = new BasicWebSocketSenderStreamClass();

        this.#bindEventHandlers();
        this.#pipeStreams();
    }
}

module.exports = BasicWebSocketServerClass;