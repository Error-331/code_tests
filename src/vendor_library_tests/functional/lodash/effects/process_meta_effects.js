'use strict';

// external imports
const {equals} = require('lodash/fp');

// local imports
const {
    MASTER_PROCESS_META_TYPE,
    CHILD_PROCESS_META_TYPE,
} = require('./../constants/process_meta_constants');

// private variables declaration
let processType = null;
let processName = null;

// effects implementation
const setMasterProcessType = () => processType = MASTER_PROCESS_META_TYPE;
const setChildProcessType = () => processType = CHILD_PROCESS_META_TYPE;
const setProcessName = usrProcessName => processName = usrProcessName;

const getProcessName = () => processName;

const isMasterProcess = () => equals(MASTER_PROCESS_META_TYPE, processType);
const isChildProcess = () => equals(CHILD_PROCESS_META_TYPE, processType);

// export
exports.setMasterProcessType = setMasterProcessType;
exports.setChildProcessType = setChildProcessType;
exports.setProcessName = setProcessName;

exports.getProcessName = getProcessName;

exports.isMasterProcess = isMasterProcess;
exports.isChildProcess = isChildProcess;