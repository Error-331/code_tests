'use strict';

// external imports

// local imports
const {
    INSERT_NEW_MODULE_LOCATION_CHILD_PROCESS,
    SELECT_LOCATION_BY_PATH_CHILD_PROCESS,
    SELECT_LOCATION_BY_NAME_ID_AND_VERSION_CHILD_PROCESS,
    SELECT_INSERT_MODULE_LOCATION_CHILD_PROCESS,
} = require('./../../constants/child_process_db_constants');

// query wrappers implementation
const createModulesLocationsTable = (dbConnection) => Promise.resolve(dbConnection);
const dropModulesLocationsTable = (dbConnection) => Promise.resolve(dbConnection);

const insertNewModuleLocation = (dbConnection, moduleNameId, moduleVersionId, path) => {
    return dbConnection.delegateTaskToMaster(INSERT_NEW_MODULE_LOCATION_CHILD_PROCESS, {moduleNameId, moduleVersionId, path});
};

const selectLocationByPath = (dbConnection, usrPath) => {
    return dbConnection.delegateTaskToMaster(SELECT_LOCATION_BY_PATH_CHILD_PROCESS, {usrPath});
};

const selectLocationByNameIdAndVersion = (dbConnection, moduleNameId, moduleVersionId, usrPath) => {
    return dbConnection.delegateTaskToMaster(SELECT_LOCATION_BY_NAME_ID_AND_VERSION_CHILD_PROCESS, {moduleNameId, moduleVersionId, usrPath});
};

// returns id
const selectInsertModuleLocation = (dbConnection, moduleNameId, moduleVersionId, path) => {
    return dbConnection.delegateTaskToMaster(SELECT_INSERT_MODULE_LOCATION_CHILD_PROCESS, {moduleNameId, moduleVersionId, path});
};

const convertTableToJSON = () => Promise.resolve(null);

// export
exports.createModulesLocationsTable = createModulesLocationsTable;
exports.dropModulesLocationsTable = dropModulesLocationsTable;
exports.insertNewModuleLocation = insertNewModuleLocation;
exports.selectLocationByPath = selectLocationByPath;
exports.selectLocationByNameIdAndVersion = selectLocationByNameIdAndVersion;
exports.selectInsertModuleLocation = selectInsertModuleLocation;
exports.convertTableToJSON = convertTableToJSON;