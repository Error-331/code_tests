'use strict';

// external imports
const chalk = require('chalk');
const {stubTrue, constant, defaultTo, equals, cond} = require('lodash/fp');

// local imports

const {
    LOG_MASTER_PROCESS_TYPE,
    LOG_CHILD_PROCESS_TYPE,

    LOG_UTILITY_MESSAGE_TYPE,
} = require('./../constants/log_constants');

// effects implementation
const logConsoleMessage = (type, process, processName, message) => {
    const preparedHeader = cond([
        [equals(type, LOG_MASTER_PROCESS_TYPE), chalk.bgWhite(' MASTER ')],
        [equals(type, LOG_CHILD_PROCESS_TYPE), chalk.bgWhite(' CHILD ')],
        [stubTrue, constant('')]
    ])();

    const preparedMessage = cond([
        [equals(type, LOG_UTILITY_MESSAGE_TYPE), chalk.white(message)],
        [stubTrue, constant('')]
    ])();

    console.log(`${preparedHeader} ${defaultTo(processName, '') ${preparedMessage}}`);
};

const logMessage = (type, process, processName, message) => {
    logConsoleMessage(type, process, processName, message);
};

// export
exports.logMesssage = logMessage;
