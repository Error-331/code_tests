'use strict';

const {EventEmitter} = require('events');

const {MESSAGE_TYPE_TO_OPCODE} = require('./../constants/web_socket_server_general_constants');
const {NAME_TO_CLOSE_CODE} = require('./../constants/web_socket_server_close_codes_constants');

class BasicWebSocketServerClass extends EventEmitter {

    _onWebSocketConnect() {
        this._isDebugEnabled && console.log('WebSocket event: connect');
    }

    _onWebSocketClose(error) {
        this._isDebugEnabled && console.log('WebSocket event: close');
        this._isDebugEnabled && error && console.error('WebSocket close with error:', error);

        if (!this._isClosed) {
            this.emit('close', NAME_TO_CLOSE_CODE);
            this._isClosed = true;
        }
    }

    _onWebSocketData(incomingDataBuffer) {
        this._isDebugEnabled && console.log('WebSocket event: data, message: ', incomingDataBuffer.toString('utf8'));

        this._incomingDataBuffer = Buffer.concat([this._incomingDataBuffer, incomingDataBuffer]);
        while (this._processBuffer()) {

        }
    }

    _onWebSocketDrain() {
        this._isDebugEnabled && console.log('WebSocket event: drain');
    }

    _onWebSocketEnd() {
        this._isDebugEnabled && console.log('WebSocket event: end');
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

    // TODO: handle case when data is two large
    _encodeSocketMessage(opcode, payload) {
        let outboundBuffer;

        // first byte: fin and opcode (0x80 - 1000 0000)
        const firstByte = 0x80 | opcode;

        // none masked, one frame only
        let secondByte = 0; // server does not mask frames

        // prepare payload length
        const payloadLength = payload.length;

        if (payloadLength < 126) {
            // if length of the payload can be represented by one byte

            // 2 bytes of service data + unmasked data
            outboundBuffer = Buffer.alloc(payloadLength + 2);

            // add payload length to second byte (no masking)
            secondByte |= payloadLength;

            // write first byte to outbound buffer
            outboundBuffer.writeUInt8(firstByte, 0);

            // write second byte to outbound buffer
            outboundBuffer.writeUInt8(secondByte, 1);

            // copy payload to outbound buffer
            payload.copy(outboundBuffer, 2);
        } else if (payloadLength < (1 << 16)) {
            // length < 1 0000 0000 0000 0000 (length that can feet in two extra bytes)

            // 2 bytes of service data + 2 bytes of extra length + unmasked data
            outboundBuffer = new Buffer(payload.length + 4);

            // add payload length to second byte (no masking)
            // 126 - extra two bytes of length will be used
            secondByte |= 126;

            // write first byte to outbound buffer
            outboundBuffer.writeUInt8(firstByte, 0);

            // write second byte to outbound buffer
            outboundBuffer.writeUInt8(secondByte, 1);

            // add two additional bytes of 'length'
            outboundBuffer.writeUInt16BE(length, 2);

            // copy payload to outbound buffer
            payload.copy(outboundBuffer, 4);
        } else {
            // length data of the payload requires 8 bytes of data to fit in

            // 2 bytes of service data + 8 bytes of extra length + unmasked data
            outboundBuffer = new Buffer(payloadLength + 10);

            // add payload length to second byte (no masking)
            // 127 - extra 8 bytes of length will be used
            secondByte |= 127;

            // write first byte to outbound buffer
            outboundBuffer.writeUInt8(firstByte, 0);

            // write second byte to outbound buffer
            outboundBuffer.writeUInt8(secondByte, 1);

            // write first two bytes of `length` data filled with zeros
            // current implementation cannot handle such amounts of data
            buf.writeUInt32BE(0, 2);


            // write actual length of the payload to last four bytes
            buf.writeUInt32BE(length, 6);

            // copy payload to outbound buffer
            payload.copy(outboundBuffer, 10);
        }

        return outboundBuffer;
    }

    _writeToSocket(opcode, payload) {
        this._socket.write(this._encodeSocketMessage(opcode, payload));
    }

    _closeSocket(code, reason = '') {
        let responseBuffer;

        if (code) {
            // 2 bytes of service data + unmasked data
            responseBuffer = new Buffer(Buffer.byteLength(reason) + 2);

            // write service data
            responseBuffer.writeUInt16BE(code, 0);

            // write payload
            responseBuffer.write(reason, 2);
        } else {
            responseBuffer = new Buffer(0);
        }

        this._writeToSocket(MESSAGE_TYPE_TO_OPCODE.CLOSE, responseBuffer);
        this._isClosed = true;
    }

    _unmask(maskBytes, data) {
        let payload = new Buffer(data.length);

        for (let i=0; i < data.length; i++) {
            payload[i] = maskBytes[i%4] ^ data[i];
        }

        return payload;
    }

    _processFrame(opcode, buffer) {
        let payload;

        switch (opcode) {
            case MESSAGE_TYPE_TO_OPCODE.TEXT:
                payload = buffer.toString('utf8');

                this.emit('data', opcode, payload);
                break;
            case MESSAGE_TYPE_TO_OPCODE.BINARY:
                payload = buffer;

                this.emit('data', opcode, payload);
                break;
            case MESSAGE_TYPE_TO_OPCODE.PING:
                this._writeToSocket(opcodes.PONG, buffer);
                break;
            case MESSAGE_TYPE_TO_OPCODE.PONG:
                break;
            case MESSAGE_TYPE_TO_OPCODE.CLOSE:
                // Parse close and reason
                // TODO: maybe close signal can be larger and extended length will also present?
                let code;
                let reason;

                if (buffer.length >= 2) {
                    code = buffer.readUInt16BE(0);
                    reason = buffer.toString('utf8', 2);
                }

                this._closeSocket(code, reason);
                this.emit('close', code, reason);

                break;
            default:
                this._closeSocket(NAME_TO_CLOSE_CODE.CLOSE_PROTOCOL_ERROR, 'unknown opcode');
        }
    }

    _processBuffer() {
        // insufficient data read
        // first byte: fin, opcode
        // second byte: mask indicator, length
        if (this._incomingDataBuffer.length < 2) {
            return false;
        }

        // read first byte of incoming message
        const firstByte = this._incomingDataBuffer.readUInt8(0);

        // read opcode
        // opcode consists of the last four bits in the first byte of the frame header
        const opcode = firstByte & 0x0f; // 0x0f - 0000 1111

        // read 'fin' bit
        const finBit = firstByte & 0x80; // 0x80 - 1000 0000

        // if finBit === 0 - message is incomplete
        if (finBit === 0) {
            return false;
        }

        // read second byte of incoming message
        const secondByte = this._incomingDataBuffer.readUInt8(1);

        // find out whether incoming message is masked of not
        // first bit of the second byte indicates whether message is masked or not (128)
        const isMasked = secondByte & 0x80; // 0x80 - 1000 0000

        // find out length of the message
        let incomingMessageLength = secondByte & 0x7f; // 0x7f - 0111 1111

        // bytes which were already been read (opcode + length)
        let readByteIndex = 2;

        // message is larger the standard size (additional 'length' bytes are used)
        if (incomingMessageLength > 125) {
            if (this._incomingDataBuffer.length < 4) {
                return false;
            }

            // 2 bytes extended payload length
            if (incomingMessageLength === 126) {
                incomingMessageLength = this._incomingDataBuffer.readUInt16BE(2);
                readByteIndex += 2;
            } else if (incomingMessageLength === 127) {
                // 8 byte extended payload length
                const firstFourBytes = this._incomingDataBuffer.readUInt32BE(2);

                // discard high 4 bytes because this server cannot handle huge lengths
                if (firstFourBytes !== 0) {
                    this._closeSocket(NAME_TO_CLOSE_CODE.MESSAGE_TOO_LARGE, '');
                }

                // read last 4 bytes of extended length payload
                incomingMessageLength = this._incomingDataBuffer.readUInt32BE(6);
                readByteIndex += 8;
            }
        }

        // opcode byte + length byte + extended length byte + mask info bytes + message bytes
        const expectedMessageLength = readByteIndex + (isMasked ? 4 : 0) + incomingMessageLength;

        // insufficient data read
        if (this._incomingDataBuffer.length < expectedMessageLength) {
            return false;
        }

        // read mask bytes
        const maskBytes = this._incomingDataBuffer.slice(readByteIndex, readByteIndex + 4);
        readByteIndex += 4;

        // extract payload
        let payload = this._incomingDataBuffer.slice(readByteIndex, readByteIndex + incomingMessageLength);

        // unmask payload if needed
        payload = isMasked ? this._unmask(maskBytes, payload) : payload;

        this._processFrame(opcode, payload);
        this._incomingDataBuffer = this._incomingDataBuffer.slice(readByteIndex + incomingMessageLength);

        return true;
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

    sendMessage(message) {
        let opcode;
        let payload;

        if (Buffer.isBuffer(message)) {
            opcode = MESSAGE_TYPE_TO_OPCODE.BINARY;
            payload = message;
        } else if (typeof message === 'string') {
            opcode = MESSAGE_TYPE_TO_OPCODE.TEXT;

            payload = new Buffer(message, 'utf8');
        } else {
            throw new Error('Cannot send object. Must be string or Buffer');
        }

        this._writeToSocket(opcode, payload);

    }

    constructor(socket, options) {
        super();

        this._socket = socket;
        this._incomingDataBuffer = Buffer.alloc(0);
        this._isClosed = false;

        this._isDebugEnabled = !!options.enableDebug;

      //  this._secWebSocketKeyClient = null;
      //  this._secWebSocketVersion = null;
      //  this._secWebSocketExtension = null;


        this._bindEventHandlers();
    }
}

module.exports = BasicWebSocketServerClass;