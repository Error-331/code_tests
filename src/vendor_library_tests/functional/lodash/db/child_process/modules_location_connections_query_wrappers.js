'use strict';

// external imports

// local imports
const {
    INSERT_NEW_MODULE_LOCATION_CONNECTION_CHILD_PROCESS,
} = require('./../../constants/child_process_db_constants');

// query wrappers implementation

// type - dev, peer, regular
const createModulesLocationConnectionsTable = (dbConnection) => Promise.resolve(dbConnection);
const dropModulesLocationConnectionsTable  = (dbConnection) => Promise.resolve(dbConnection);

const insertNewModuleLocationConnection = (dbConnection, moduleLocationId, moduleParentLocationId, usrType) => {
    return dbConnection.delegateTaskToMaster(INSERT_NEW_MODULE_LOCATION_CONNECTION_CHILD_PROCESS, {moduleLocationId, moduleParentLocationId, usrType});
};

const convertTableToJSON = () => Promise.resolve(null);

// export
exports.createModulesLocationConnectionsTable = createModulesLocationConnectionsTable;
exports.dropModulesLocationConnectionsTable = dropModulesLocationConnectionsTable;
exports.insertNewModuleLocationConnection = insertNewModuleLocationConnection;
exports.convertTableToJSON = convertTableToJSON;