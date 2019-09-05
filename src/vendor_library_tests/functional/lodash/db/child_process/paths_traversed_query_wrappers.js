'use strict';

// external imports

// local imports
const {
    INSERT_NEW_PATH_CHILD_PROCESS,
    SELECT_TRAVERSED_PATH_BY_PATH_CHILD_PROCESS,
} = require('./../../constants/child_process_db_constants');

// query wrappers implementation
const createPathsTraversedTable = (dbConnection) => Promise.resolve(dbConnection);
const dropPathsTraversedTable = (dbConnection) => Promise.resolve(dbConnection);

const insertNewPath = (dbConnection, path) => {
    return dbConnection.delegateTaskToMaster(INSERT_NEW_PATH_CHILD_PROCESS, {path});
};

const selectTraversedPathByPath = (dbConnection, usrPath) => {
    return dbConnection.delegateTaskToMaster(SELECT_TRAVERSED_PATH_BY_PATH_CHILD_PROCESS, {usrPath});
};

const convertTableToJSON = () => Promise.resolve(null);

// export
exports.createPathsTraversedTable = createPathsTraversedTable;
exports.dropPathsTraversedTable = dropPathsTraversedTable;
exports.insertNewPath = insertNewPath ;
exports.selectTraversedPathByPath = selectTraversedPathByPath;
exports.convertTableToJSON = convertTableToJSON;