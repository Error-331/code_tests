'use strict';

const { Writable } = require('stream');

const { NAME_TO_CLOSE_CODE } = require('./../../constants/web_socket_server_close_codes_constants');

const WebsocketServerErrorClass = require('./../../errors/websocket_server_error_class');

const WEBSOCKET_FRAME_PROCESSING_MODE_CONCAT = 'WEBSOCKET_FRAME_PROCESSING_MODE_CONCAT';
const WEBSOCKET_FRAME_PROCESSING_MODE_COPY = 'WEBSOCKET_FRAME_PROCESSING_MODE_COPY';

const WEBSOCKET_RECEIVER_FIRST_BYTE_PROCESSING_STATE = 'WEBSOCKET_RECEIVER_FIRST_BYTE_PROCESSING_STATE';
const WEBSOCKET_RECEIVER_MASK_AND_LENGTH_PROCESSING_STATE = 'WEBSOCKET_RECEIVER_MASK_AND_LENGTH_PROCESSING_STATE';
const WEBSOCKET_RECEIVER_EXTENDED_LENGTH_16_PROCESSING_STATE = 'WEBSOCKET_RECEIVER_EXTENDED_LENGTH_16_PROCESSING_STATE';
const WEBSOCKET_RECEIVER_EXTENDED_LENGTH_64_PROCESSING_STATE = 'WEBSOCKET_RECEIVER_EXTENDED_LENGTH_64_PROCESSING_STATE';
const WEBSOCKET_RECEIVER_MASK_PROCESSING_STATE = 'WEBSOCKET_RECEIVER_MASK_PROCESSING_STATE';
const WEBSOCKET_RECEIVER_PAYLOAD_PROCESSING_STATE = 'WEBSOCKET_RECEIVER_PAYLOAD_PROCESSING_STATE';

// 0-999 - general
// 1000-1999 - websocket

const SERVER_ERROR_CODE_WEBSOCKET_PAYLOAD_LENGTH_NOT_SET = 1000;
const SERVER_ERROR_CODE_WEBSOCKET_PAYLOAD_TOO_LARGE = 1001;
const SERVER_ERROR_CODE_WEBSOCKET_FRAME_PROCESSING_MODE_NOT_SET = 1002;

class BasicWebSocketReceiverStreamClass extends Writable {
    #incomingDataBuffer = null;

    #frameProcessingState = null;
    #frameProcessingStarted = false;
    #frameProcessingMode = WEBSOCKET_FRAME_PROCESSING_MODE_CONCAT;

    #readByteIndex = 0;

    #opCode = null;
    #finBit = null;
    #isMasked = null;
    #maskBits = null;
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
        const secondByte = this.#incomingDataBuffer.readUInt8(1);

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

        this.#incomingPayloadLength = this.#incomingDataBuffer.readUInt16BE(2);
        this.#readByteIndex += 2;

        this.#frameProcessingState = WEBSOCKET_RECEIVER_MASK_PROCESSING_STATE;
        this.#processIncomingData();
    }

    #processExtendedLength64() {
        if (this.#incomingDataBuffer.length < 10) {
            return;
        }

        // 8 byte extended payload length
        const firstFourBytes = this.#incomingDataBuffer.readUInt32BE(2);

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
            this.#maskBits = this.#incomingDataBuffer.slice(this.#readByteIndex, this.#readByteIndex + 4);
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
            console.log('payload ready');
        }

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

        this.#clearIncomingDataBuffer();
        this.#incomingDataBuffer = Buffer.alloc(this.#incomingPayloadLength);
    }

    #clearIncomingDataBuffer() {
        this.#incomingDataBuffer = Buffer.alloc(0);
        this.#readByteIndex = 0;
    }

    #resetFrameProcessing() {
        this.#frameProcessingStarted = false;
        this.#frameProcessingState = WEBSOCKET_RECEIVER_FIRST_BYTE_PROCESSING_STATE;
        this.#switchToConcatFrameProcessing();

        this.#opCode = null;
        this.#finBit = null;
        this.#isMasked = null;
        this.#maskBits = null;
        this.#incomingPayloadLength = null;
    }

    #resetSocketReceiver() {
        this.#clearIncomingDataBuffer();
        this.#resetFrameProcessing();
    }

    _write(chunk, encoding, callback) {
        if (this.#frameProcessingMode === WEBSOCKET_FRAME_PROCESSING_MODE_CONCAT) {
            this.#incomingDataBuffer = Buffer.concat([this.#incomingDataBuffer, chunk]);
            this.#processIncomingData();
        } else if(this.#frameProcessingMode === WEBSOCKET_FRAME_PROCESSING_MODE_COPY) {
            chunk.copy(this.#incomingDataBuffer, this.#readByteIndex, 0);
            this.#readByteIndex += chunk.length;
            this.#processIncomingData();
        } else {
            throw new WebsocketServerErrorClass(
                NAME_TO_CLOSE_CODE.INTERNAL_ERROR,
                SERVER_ERROR_CODE_WEBSOCKET_FRAME_PROCESSING_MODE_NOT_SET ,
                'Frame processing mode not set'
            );
        }
    }

    constructor(options) {
        super(options);

        this.#resetSocketReceiver();
    }
}

module.exports = BasicWebSocketReceiverStreamClass;