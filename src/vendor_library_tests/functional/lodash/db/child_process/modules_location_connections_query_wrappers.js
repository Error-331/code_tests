'use strict';

// external imports

// local imports
const {
    INSERT_NEW_MODULE_LOCATION_CONNECTION_CHILD_PROCESS,
    SELECT_MODULE_LOCATION_CONNECTION_BY_PARENT_LOCATION_ID,
    SELECT_MODULE_LOCATION_CONNECTION,
    SELECT_INSERT_MODULE_LOCATION_CONNECTION_CHILD_PROCESS,
} = require('./../../constants/child_process_db_constants');

// query wrappers implementation

// type - dev, peer, regular
const createModulesLocationConnectionsTable = (dbConnection) => Promise.resolve(dbConnection);
const dropModulesLocationConnectionsTable  = (dbConnection) => Promise.resolve(dbConnection);

const insertNewModuleLocationConnection = (dbConnection, moduleLocationId, moduleParentLocationId, usrType) => {
    return dbConnection.delegateTaskToMaster(INSERT_NEW_MODULE_LOCATION_CONNECTION_CHILD_PROCESS, {moduleLocationId, moduleParentLocationId, usrType});
};

const selectModuleLocationConnectionByParentLocationId = (dbConnection, moduleParentLocationId) => {
    return dbConnection.delegateTaskToMaster(SELECT_MODULE_LOCATION_CONNECTION_BY_PARENT_LOCATION_ID, {moduleParentLocationId});
};

const selectModuleLocationConnection = (dbConnection, moduleLocationId, moduleParentLocationId, usrType) => {
    return dbConnection.delegateTaskToMaster(SELECT_MODULE_LOCATION_CONNECTION, {moduleLocationId, moduleParentLocationId, usrType});
};

const selectInsertModuleLocationConnection = (dbConnection, moduleLocationId, moduleParentLocationId, usrType) => {
    return dbConnection.delegateTaskToMaster(SELECT_INSERT_MODULE_LOCATION_CONNECTION_CHILD_PROCESS, {moduleLocationId, moduleParentLocationId, usrType});
};

const convertTableToJSON = () => Promise.resolve(null);

// export
exports.createModulesLocationConnectionsTable = createModulesLocationConnectionsTable;
exports.dropModulesLocationConnectionsTable = dropModulesLocationConnectionsTable;
exports.insertNewModuleLocationConnection = insertNewModuleLocationConnection;
exports.selectModuleLocationConnectionByParentLocationId = selectModuleLocationConnectionByParentLocationId;
exports.selectModuleLocationConnection = selectModuleLocationConnection;
exports.selectInsertModuleLocationConnection = selectInsertModuleLocationConnection;
exports.convertTableToJSON = convertTableToJSON;