'use strict';

const { Transform } = require('stream');

const { MESSAGE_TYPE_TO_OPCODE } = require('./../../../constants/websocket/web_socket_opcodes');
const { SERVER_ERROR_CODE_WEBSOCKET_INVALID_PAYLOAD_TYPE } = require('./../../../constants/server/server_error_codes');

const WebsocketServerErrorClass = require('./../../errors/websocket_server_error_class');

class BasicWebSocketSenderStreamClass extends Transform {
    #writeFirstTwoBytesToBuffer(firstByte, secondByte, outboundBuffer) {
        // write first byte to outbound buffer
        outboundBuffer.writeUInt8(firstByte, 0);

        // write second byte to outbound buffer
        outboundBuffer.writeUInt8(secondByte, 1);

        // return buffer with first two bytes written
        return outboundBuffer;
    }

    #encodeStandardSizeMessage(firstByte, secondByte, payload) {
        // prepare payload length
        const payloadLength = payload.length;

        // 2 bytes of service data + unmasked data
        let outboundBuffer = Buffer.alloc(payloadLength + 2);

        // add payload length to second byte (no masking)
        secondByte |= payloadLength;

        // write first two bytes to outbound buffer
        outboundBuffer = this.#writeFirstTwoBytesToBuffer(firstByte, secondByte, outboundBuffer);

        // write first byte to outbound buffer
        outboundBuffer.writeUInt8(firstByte, 0);

        // write second byte to outbound buffer
        outboundBuffer.writeUInt8(secondByte, 1);

        // copy payload to outbound buffer
        payload.copy(outboundBuffer, 2, 0);

        // return outbound buffer
        return outboundBuffer;
    }

    #encodeDoubleSizeMessage(firstByte, secondByte, payload) {
        // prepare payload length
        const payloadLength = payload.length;

        // 2 bytes of service data + 2 bytes of extra length + unmasked data
        let outboundBuffer = Buffer.alloc(payloadLength + 4);

        // add payload length to second byte (no masking)
        // 126 - extra two bytes of length will be used
        secondByte |= 126;

        // write first two bytes to outbound buffer
        outboundBuffer = this.#writeFirstTwoBytesToBuffer(firstByte, secondByte, outboundBuffer);

        // add two additional bytes of 'length'
        outboundBuffer.writeUInt16BE(payloadLength, 2);

        // copy payload to outbound buffer
        payload.copy(outboundBuffer, 4, 0);

        // return outbound buffer
        return outboundBuffer;
    }

    #encodeExtraSizeMessage(firstByte, secondByte, payload) {
        // prepare payload length
        const payloadLength = payload.length;

        // 2 bytes of service data + 8 bytes of extra length + unmasked data
        let outboundBuffer = Buffer.alloc(payloadLength + 10);

        // add payload length to second byte (no masking)
        // 127 - extra 8 bytes of length will be used
        secondByte |= 127;

        // write first two bytes to outbound buffer
        outboundBuffer = this.#writeFirstTwoBytesToBuffer(firstByte, secondByte, outboundBuffer);

        // write first two bytes of `length` data filled with zeros
        // current implementation cannot handle such amounts of data
        outboundBuffer.writeUInt32BE(0, 2);

        // write actual length of the payload to last four bytes
        outboundBuffer.writeUInt32BE(payloadLength, 6);

        // copy payload to outbound buffer
        payload.copy(outboundBuffer, 8, 0);

        // return outbound buffer
        return outboundBuffer;
    }

    #encodedChunk(opcode, payload) {
        // first byte: fin and opcode (0x80 - 1000 0000)
        const firstByte = 0x80 | opcode;

        // none masked, one frame only
        let secondByte = 0; // server does not mask frames

        // prepare payload length
        const payloadLength = payload.length;

        if (payloadLength < 126) {
            // if length of the payload can be represented by one byte
            return this.#encodeStandardSizeMessage(firstByte, secondByte, payload);
        } else if (payloadLength < (1 << 16)) {
            // length < 1 0000 0000 0000 0000 (length that can feet in two extra bytes)
            return this.#encodeDoubleSizeMessage(firstByte, secondByte, payload);
        } else {
            // length data of the payload requires 8 bytes of data to fit in
            return this.#encodeExtraSizeMessage(firstByte, secondByte, payload)
        }
    }

    _transform(chunk, encoding, callback) {
        let opcode;
        let payload;
        let encodedChunk;

        if (Buffer.isBuffer(chunk)) {
            opcode = MESSAGE_TYPE_TO_OPCODE.BINARY;
            payload = chunk;

            try {
                encodedChunk = this.#encodedChunk(opcode, payload);
                callback(null, encodedChunk);
            } catch (error) {
                callback(error);
            }
        } else if (typeof chunk === 'string') {
            opcode = MESSAGE_TYPE_TO_OPCODE.TEXT;
            payload = Buffer.alloc(Buffer.byteLength(chunk), chunk, 'utf8');

            try {
                encodedChunk = this.#encodedChunk(opcode, payload);
                callback(null, encodedChunk);
            } catch (error) {
                callback(error);
            }
        } else {
            throw new WebsocketServerErrorClass(
                null,
                SERVER_ERROR_CODE_WEBSOCKET_INVALID_PAYLOAD_TYPE,
                `Invalid payload type ${typeof chunk}`
            );
        }
    }
}

module.exports = BasicWebSocketSenderStreamClass;