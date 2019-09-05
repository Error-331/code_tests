'use strict';

// external imports

// local imports
const {
    INSERT_NEW_MODULE_NAME_CHILD_PROCESS,
    SELECT_MODULE_CHILD_PROCESS_CHILD_PROCESS,
    SELECT_INSERT_MODULE_NAME_CHILD_PROCESS,
} = require('./../../constants/child_process_db_constants');

// query wrappers implementation
const createModulesNamesTable = (dbConnection) => Promise.resolve(dbConnection);
const dropModulesNamesTable = (dbConnection) => Promise.resolve(dbConnection);

const insertNewModuleName = (dbConnection, name, belongsToOrganization) => {
    return dbConnection.delegateTaskToMaster(INSERT_NEW_MODULE_NAME_CHILD_PROCESS, {name, belongsToOrganization});
};

const selectModule = (dbConnection, usrName, belongsToOrganization) => {
    return dbConnection.delegateTaskToMaster(SELECT_MODULE_CHILD_PROCESS_CHILD_PROCESS, {usrName, belongsToOrganization});
};

// returns id
const selectInsertModuleName = (dbConnection, name, belongsToOrganization) => {
    return dbConnection.delegateTaskToMaster(SELECT_INSERT_MODULE_NAME_CHILD_PROCESS, {name, belongsToOrganization});
};

const convertTableToJSON = () => Promise.resolve(null);

// export
exports.createModulesNamesTable = createModulesNamesTable;
exports.dropModulesNamesTable = dropModulesNamesTable;
exports.insertNewModuleName = insertNewModuleName;
exports.selectModule = selectModule;
exports.selectInsertModuleName = selectInsertModuleName;
exports.convertTableToJSON = convertTableToJSON;