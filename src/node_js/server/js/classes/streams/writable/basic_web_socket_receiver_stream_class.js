'use strict';

const { Writable } = require('stream');

const NAME_TO_CLOSE_CODE = require('./../../../constants/websocket/web_socket_close_codes');
const { MESSAGE_TYPE_TO_OPCODE } = require('./../../../constants/websocket/web_socket_opcodes');

const {
    WEBSOCKET_FRAME_PROCESSING_MODE_CONCAT,
    WEBSOCKET_FRAME_PROCESSING_MODE_COPY,
} = require('./../../../constants/websocket/web_socket_receiver_frame_processing_modes');

const {
    WEBSOCKET_RECEIVER_FIRST_BYTE_PROCESSING_STATE,
    WEBSOCKET_RECEIVER_MASK_AND_LENGTH_PROCESSING_STATE,
    WEBSOCKET_RECEIVER_EXTENDED_LENGTH_16_PROCESSING_STATE,
    WEBSOCKET_RECEIVER_EXTENDED_LENGTH_64_PROCESSING_STATE,
    WEBSOCKET_RECEIVER_MASK_PROCESSING_STATE,
    WEBSOCKET_RECEIVER_PAYLOAD_PROCESSING_STATE,
    WEBSOCKET_RECEIVER_PAYLOAD_UNMASKING_PROCESSING_STATE,
    WEBSOCKET_RECEIVER_FINALIZE_PROCESSING_STATE,
} = require('./../../../constants/websocket/web_socket_receiver_processing_states');

const WebsocketServerErrorClass = require('./../../errors/websocket_server_error_class');

// 0-999 - general
// 1000-1999 - websocket

const SERVER_ERROR_CODE_WEBSOCKET_PAYLOAD_LENGTH_NOT_SET = 1000;
const SERVER_ERROR_CODE_WEBSOCKET_PAYLOAD_TOO_LARGE = 1001;
const SERVER_ERROR_CODE_WEBSOCKET_FRAME_PROCESSING_MODE_NOT_SET = 1002;
const SERVER_ERROR_CODE_WEBSOCKET_UNDEFINED_OPCODE = 1003;
const SERVER_ERROR_CODE_WEBSOCKET_UNDEFINED_PROCESSING_STATE = 1004;

class BasicWebSocketReceiverStreamClass extends Writable {
    #incomingDataBuffer = null;
    #readByteIndex = 0;

    #frameProcessingState = null;
    #frameProcessingStarted = false;
    #frameProcessingMode = WEBSOCKET_FRAME_PROCESSING_MODE_CONCAT;

    #opCode = null;
    #finBit = null;
    #isMasked = false;
    #maskBytes = null;
    #incomingPayloadLength = null;

    #processFirstByte() {
        // insufficient data read
        // first byte: fin, opcode
        if (this.#incomingDataBuffer.length < 1) {
            return;
        }

        // read first byte of incoming message
        const firstByte = this.#incomingDataBuffer.readUInt8(0);

        // read opcode
        // opcode consists of the last four bits in the first byte of the frame header
        this.#opCode = firstByte & 0x0f; // 0x0f - 0000 1111

        // read 'fin' bit
        this.#finBit = firstByte & 0x80; // 0x80 - 1000 0000

        this.#readByteIndex = 1;
        this.#frameProcessingState = WEBSOCKET_RECEIVER_MASK_AND_LENGTH_PROCESSING_STATE;

        this.#processIncomingData();
    }

    #processMaskAndLength() {
        // insufficient data read
        // first byte: mask, payload length
        if (this.#incomingDataBuffer.length < 2) {
            return;
        }

        // read second byte of incoming message
        const secondByte = this.#incomingDataBuffer.readUInt8(this.#readByteIndex);

        // find out whether incoming message is masked or not
        // first bit of the second byte indicates whether message is masked or not (128)
        this.#isMasked = secondByte & 0x80; // 0x80 - 1000 0000

        // find out length of the payload
        this.#incomingPayloadLength = secondByte & 0x7f; // 0x7f - 0111 1111

        // bytes which were already been read (opcode + length)
        this.#readByteIndex = 2;

        // payload is larger the standard size (additional 'length' bytes are used)
        if (this.#incomingPayloadLength === 126) {
            this.#frameProcessingState = WEBSOCKET_RECEIVER_EXTENDED_LENGTH_16_PROCESSING_STATE;
        } else if (this.#incomingPayloadLength === 127) {
            this.#frameProcessingState = WEBSOCKET_RECEIVER_EXTENDED_LENGTH_64_PROCESSING_STATE;
        } else {
            this.#frameProcessingState = WEBSOCKET_RECEIVER_MASK_PROCESSING_STATE;
        }

        this.#processIncomingData();
    }

    #processExtendedLength16() {
        if (this.#incomingDataBuffer.length < 4) {
            return;
        }

        this.#incomingPayloadLength = this.#incomingDataBuffer.readUInt16BE(this.#readByteIndex);
        this.#readByteIndex += 2;

        this.#frameProcessingState = WEBSOCKET_RECEIVER_MASK_PROCESSING_STATE;
        this.#processIncomingData();
    }

    #processExtendedLength64() {
        if (this.#incomingDataBuffer.length < 10) {
            return;
        }

        // 8 byte extended payload length
        const firstFourBytes = this.#incomingDataBuffer.readUInt32BE(this.#readByteIndex);

        // discard high 4 bytes because this server cannot handle huge lengths
        if (firstFourBytes !== 0) {
            throw new WebsocketServerErrorClass(
                NAME_TO_CLOSE_CODE.MESSAGE_TOO_LARGE,
                SERVER_ERROR_CODE_WEBSOCKET_PAYLOAD_TOO_LARGE,
                'Payload too large'
            );
        }

        // read last 4 bytes of extended length payload
        this.#incomingPayloadLength = this.#incomingDataBuffer.readUInt32BE(6);
        this.#readByteIndex += 8;

        this.#frameProcessingState = WEBSOCKET_RECEIVER_MASK_PROCESSING_STATE;
        this.#processIncomingData();
    }

    #processMask() {
        if (this.#isMasked) {
            if (this.#incomingDataBuffer.length < 14) {
                return;
            }

            // read mask bytes
            this.#maskBytes = this.#incomingDataBuffer.slice(this.#readByteIndex, this.#readByteIndex + 4);
            this.#readByteIndex += 4;

            this.#frameProcessingState = WEBSOCKET_RECEIVER_PAYLOAD_PROCESSING_STATE;

            this.#prepareIncomingDataBufferForPayload();
            this.#switchToCopyFrameProcessing();
            this.#processIncomingData();
        } else {
            this.#frameProcessingState = WEBSOCKET_RECEIVER_PAYLOAD_PROCESSING_STATE;

            this.#prepareIncomingDataBufferForPayload();
            this.#switchToCopyFrameProcessing();
            this.#processIncomingData();
        }
    }

    #processPayload() {
        if (this.#incomingDataBuffer.length === this.#incomingPayloadLength) {
            this.#frameProcessingState = WEBSOCKET_RECEIVER_PAYLOAD_UNMASKING_PROCESSING_STATE;
            this.#processIncomingData();
        }
    }

    #unmaskPayload() {
        if (this.#isMasked) {
            for (let byteIdx = 0; byteIdx < this.#incomingDataBuffer.length; byteIdx++) {
                this.#incomingDataBuffer[byteIdx] = this.#maskBytes[byteIdx % 4] ^ this.#incomingDataBuffer[byteIdx];
            }
        }

        this.#frameProcessingState = WEBSOCKET_RECEIVER_FINALIZE_PROCESSING_STATE;
        this.#processIncomingData();
    }

    #finalizeFrameProcessing() {
        switch (this.#opCode) {
            case MESSAGE_TYPE_TO_OPCODE.TEXT:
                this.emit('message', this.#incomingDataBuffer.toString('utf8'), this.#opCode);
                break;

            case MESSAGE_TYPE_TO_OPCODE.BINARY:
                this.emit('message', this.#incomingDataBuffer, this.#opCode);
                break;

            case MESSAGE_TYPE_TO_OPCODE.PING:
                this.emit('ping', this.#incomingDataBuffer, this.#opCode);
                break;

            case MESSAGE_TYPE_TO_OPCODE.PONG:
                this.emit('pong', this.#incomingDataBuffer, this.#opCode);
                break;

            case MESSAGE_TYPE_TO_OPCODE.CLOSE:
                this.emit('close_request', this.#incomingDataBuffer, this.#opCode);
                break;

            default:
                throw new WebsocketServerErrorClass(
                    NAME_TO_CLOSE_CODE.INTERNAL_ERROR,
                    SERVER_ERROR_CODE_WEBSOCKET_UNDEFINED_OPCODE,
                    `Undefined opcode received ${this.#opCode}`
                );
        }

        this.#resetSocketReceiver();
    }

    #processIncomingData() {
        this.#frameProcessingStarted = true;

        switch(this.#frameProcessingState) {
            case WEBSOCKET_RECEIVER_FIRST_BYTE_PROCESSING_STATE:
                this.#processFirstByte();
                break;

            case WEBSOCKET_RECEIVER_MASK_AND_LENGTH_PROCESSING_STATE:
                this.#processMaskAndLength();
                break;

            case WEBSOCKET_RECEIVER_EXTENDED_LENGTH_16_PROCESSING_STATE:
                this.#processExtendedLength16();
                break;

            case WEBSOCKET_RECEIVER_EXTENDED_LENGTH_64_PROCESSING_STATE:
                this.#processExtendedLength64();
                break;

            case WEBSOCKET_RECEIVER_MASK_PROCESSING_STATE:
                this.#processMask();
                break;

            case WEBSOCKET_RECEIVER_PAYLOAD_PROCESSING_STATE:
                this.#processPayload();
                break;

            case WEBSOCKET_RECEIVER_PAYLOAD_UNMASKING_PROCESSING_STATE:
                this.#unmaskPayload();
                break;

            case WEBSOCKET_RECEIVER_FINALIZE_PROCESSING_STATE:
                this.#finalizeFrameProcessing();
                break;

            default:
                throw new WebsocketServerErrorClass(
                    NAME_TO_CLOSE_CODE.INTERNAL_ERROR,
                    SERVER_ERROR_CODE_WEBSOCKET_UNDEFINED_PROCESSING_STATE,
                    `Undefined processing state ${this.#frameProcessingState}`
                );
        }
    }

    #switchToConcatFrameProcessing() {
        this.#frameProcessingMode = WEBSOCKET_FRAME_PROCESSING_MODE_CONCAT;
    }

    #switchToCopyFrameProcessing() {
        this.#frameProcessingMode = WEBSOCKET_FRAME_PROCESSING_MODE_COPY;
    }

    #prepareIncomingDataBufferForPayload() {
        if (this.#incomingPayloadLength === null) {
            throw new WebsocketServerErrorClass(
                NAME_TO_CLOSE_CODE.INTERNAL_ERROR,
                SERVER_ERROR_CODE_WEBSOCKET_PAYLOAD_LENGTH_NOT_SET,
                'Payload length is not defined, cannot allocate memory for incoming data buffer'
            );
        }

        const tempBuffer = Buffer.allocUnsafe(this.#incomingPayloadLength);
        this.#incomingDataBuffer.copy(tempBuffer, 0, this.#readByteIndex);

        this.#incomingDataBuffer = tempBuffer;
        this.#readByteIndex = this.#incomingPayloadLength;
    }

    #clearIncomingDataBuffer() {
        this.#incomingDataBuffer = Buffer.alloc(0);
        this.#readByteIndex = 0;
    }

    #resetFrameProcessing() {
        this.#frameProcessingState = WEBSOCKET_RECEIVER_FIRST_BYTE_PROCESSING_STATE;
        this.#frameProcessingStarted = false;
        this.#switchToConcatFrameProcessing();

        this.#opCode = null;
        this.#finBit = null;
        this.#isMasked = false;
        this.#maskBytes = null;
        this.#incomingPayloadLength = null;
    }

    #resetSocketReceiver() {
        this.#clearIncomingDataBuffer();
        this.#resetFrameProcessing();
    }

    _write(chunk, encoding, callback) {
        if (this.#frameProcessingMode === WEBSOCKET_FRAME_PROCESSING_MODE_CONCAT) {
            this.#incomingDataBuffer = Buffer.concat([this.#incomingDataBuffer, chunk]);

            try {
                this.#processIncomingData();
                callback();
            } catch (error) {
                callback(error);
            }
        } else if(this.#frameProcessingMode === WEBSOCKET_FRAME_PROCESSING_MODE_COPY) {
            chunk.copy(this.#incomingDataBuffer, this.#readByteIndex, 0);
            this.#readByteIndex += chunk.length;

            try {
                this.#processIncomingData();
                callback();
            } catch(error) {
                callback(error);
            }
        } else {
            callback(new WebsocketServerErrorClass(
                NAME_TO_CLOSE_CODE.INTERNAL_ERROR,
                SERVER_ERROR_CODE_WEBSOCKET_FRAME_PROCESSING_MODE_NOT_SET ,
                'Frame processing mode not set'
            ));
        }
    }

    constructor(options) {
        super(options);

        this.#resetSocketReceiver();
    }
}

module.exports = BasicWebSocketReceiverStreamClass;