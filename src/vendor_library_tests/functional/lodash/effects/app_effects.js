'use strict';

// external imports

// local imports
const {
    JS_MEMORY_DB_TYPE,
    SQLITE_DB_TYPE,
    CHILD_PROCESS_DB_TYPE,
} = require('./../constants/app_constants');

// effects implementation

let dbType = null;

// exports
const getDBType = () => dbType;

const setDBType = (type) => {
    dbType = type;
    return true;
};

const setJSMemoryDBType = () => setDBType(JS_MEMORY_DB_TYPE);
const setSQLiteDBType = () => setDBType(SQLITE_DB_TYPE);
const setChildProcessDBType = () => setDBType(CHILD_PROCESS_DB_TYPE);

// export
exports.getDBType = getDBType;

exports.setSQLiteDBType = setSQLiteDBType;
exports.setJSMemoryDBType = setJSMemoryDBType;
exports.setChildProcessDBType = setChildProcessDBType;