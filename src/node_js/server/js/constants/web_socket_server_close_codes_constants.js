'use strict';

const NAME_TO_CLOSE_CODE = Object.freeze({
    'CLOSE_NORMAL': 1000,         // Successful operation, regular socket shutdown
    'CLOSE_GOING_AWAY': 1001,     // One of the socket endpoints is exiting
    'CLOSE_PROTOCOL_ERROR': 1002, // Error in one of the endpoints while processing a known message type
    'CLOSE_UNSUPPORTED': 1003,    // Endpoint received unsupported data type (text/binary)
    'CLOSE_ABNORMAL': 1006,       // No close code frame has been received
    'INVALID_DATA': 1007,         // Endpoint received inconsistent message (e.g. non-UTF8 data within a string)
    'POLICY_VIOLATION': 1008,     // Endpoint policy was violated, is a generic code used when codes 1003 and 1009 aren't suitable
    'MESSAGE_TOO_LARGE': 1009,    // Data frame size is too large
    'EXTENSION_REQUIRED': 1010,   // Client asked for extension that server didn't reply with
    'INTERNAL_ERROR': 1011,       // Internal server error while operating
    'SERVICE_RESTART': 1012,      // Server / service is restarting
    'TRY_AGAIN_LATER': 1013,      // Try Again Later code; temporary server condition forced to block client's request
});

module.exports.CLOSE_CODE = NAME_TO_CLOSE_CODE;