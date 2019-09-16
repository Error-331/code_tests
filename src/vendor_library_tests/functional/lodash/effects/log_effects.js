'use strict';

// external imports
const chalk = require('chalk');
const {stubTrue, constant, isEmpty, equals, cond, curry} = require('lodash/fp');

// local imports
const {
    LOG_UTILITY_MESSAGE_TYPE,
    LOG_ERROR_MESSAGE_TYPE,
    LOG_DB_MESSAGE_TYPE,
    LOG_FS_MESSAGE_TYPE,
    LOG_TASK_MESSAGE_TYPE,

    MASTER_PROCESS_LOG_LABEL,
    CHILD_PROCESS_LOG_LABEL,
} = require('./../constants/log_constants');

const {textGrayOnWhite} = require('./../helpers/log_helpers');
const {getProcessName, isMasterProcess, isChildProcess} = require('./process_meta_effects');

// effects implementation
const logConsoleMessage = curry((type, message) => {
    const preparedHeader = cond([
        [() => equals(true, isMasterProcess()), constant(textGrayOnWhite(MASTER_PROCESS_LOG_LABEL))],
        [() => equals(true, isChildProcess()), constant(textGrayOnWhite(CHILD_PROCESS_LOG_LABEL))],
        [stubTrue, constant('')]
    ])();

    const preparedMessage = cond([
        [equals(LOG_UTILITY_MESSAGE_TYPE), constant(chalk.white(message))],
        [equals(LOG_ERROR_MESSAGE_TYPE), constant(chalk.red(message))],
        [equals(LOG_DB_MESSAGE_TYPE), constant(chalk.blue(message))],
        [equals(LOG_FS_MESSAGE_TYPE), constant(chalk.magenta(message))],
        [equals(LOG_TASK_MESSAGE_TYPE), constant(chalk.yellow(message))],
        [stubTrue, constant('')]
    ])(type);

    const processName = getProcessName();
    const preparedProcessNAme = isEmpty(processName) ? '' : textGrayOnWhite(` ${processName} `) + ' ';

    console.log(`${preparedHeader} ${preparedProcessNAme}${preparedMessage}`);
});

const logMessage = curry((type, message) => {
    logConsoleMessage(type, message);
});

// export
exports.logMesssage = logMessage;
exports.logUtilityMessage = logMessage(LOG_UTILITY_MESSAGE_TYPE);
exports.logErrorMessage = logMessage(LOG_ERROR_MESSAGE_TYPE);
exports.logDBMessage = logMessage(LOG_DB_MESSAGE_TYPE);
exports.logFSMessage = logMessage(LOG_FS_MESSAGE_TYPE);
exports.logTaskMessage = logMessage(LOG_TASK_MESSAGE_TYPE);
