'use strict';

// external imports

// local imports
const {
    INSERT_NEW_MODULE_VERSION_CHILD_PROCESS,
    SELECT_MODULE_BY_NAME_ID_AND_VERSION_CHILD_PROCESS,
    SELECT_INSERT_MODULE_VERSION_CHILD_PROCESS,
} = require('./../../constants/child_process_db_constants');

// query wrappers implementation
const createModulesVersionsTable = (dbConnection) => Promise.resolve(dbConnection);
const dropModulesVersionsTable = (dbConnection) => Promise.resolve(dbConnection);

const insertNewModuleVersion = (dbConnection, moduleNameId, version) => {
    return dbConnection.delegateTaskToMaster(INSERT_NEW_MODULE_VERSION_CHILD_PROCESS, {moduleNameId, version});
};

const selectModuleByNameIdAndVersion = (dbConnection, moduleNameId, usrVersion) => {
    return dbConnection.delegateTaskToMaster(SELECT_MODULE_BY_NAME_ID_AND_VERSION_CHILD_PROCESS, {moduleNameId, usrVersion});
};

// returns id
const selectInsertModuleVersion = (dbConnection, moduleNameId, version) => {
    return dbConnection.delegateTaskToMaster(SELECT_INSERT_MODULE_VERSION_CHILD_PROCESS, {moduleNameId, version});
};

const convertTableToJSON = () => Promise.resolve(null);

// export
exports.createModulesVersionsTable = createModulesVersionsTable;
exports.dropModulesVersionsTable = dropModulesVersionsTable;
exports.insertNewModuleVersion = insertNewModuleVersion;
exports.selectModuleByNameIdAndVersion = selectModuleByNameIdAndVersion;
exports.selectInsertModuleVersion = selectInsertModuleVersion;
exports.convertTableToJSON = convertTableToJSON;