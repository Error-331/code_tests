'use strict';

const MESSAGE_TYPE_TO_OPCODE = Object.freeze({
    'TEXT':   1, // 0001
    'BINARY': 2, // 0010
    'CLOSE':  8, // 1000
    'PING':   9, // 1001
    'PONG':   10 // 1010
});

module.exports.MESSAGE_TYPE_TO_OPCODE = MESSAGE_TYPE_TO_OPCODE;