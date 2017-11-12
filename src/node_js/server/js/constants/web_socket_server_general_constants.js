'use strict';

const MESSAGE_TYPE_TO_OPCODE = Object.freeze({
    'TEXT':   1,
    'BINARY': 2,
    'CLOSE':  8,
    'PING':   9,
    'PONG':   10
});

module.exports.MESSAGE_TYPE_TO_OPCODE = MESSAGE_TYPE_TO_OPCODE;