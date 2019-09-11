'use strict';

// external imports

// local imports
const {convertMapToJSON} = require('./../../helpers/map_helpers');

// query wrappers implementation

// type - dev, peer, regular
const createModulesLocationConnectionsTable  = (dbConnection) => {
    dbConnection.modulesLocationConnectionsMapLastId = -1;

    dbConnection.modulesLocationConnectionsMap = new Map();
    dbConnection.modulesLocationConnectionsIndexMap = new Map();

    return Promise.resolve(dbConnection);
};

const dropModulesLocationConnectionsTable  = (dbConnection) => {
    dbConnection.modulesLocationConnectionsMapLastId = null;

    dbConnection.modulesLocationConnectionsMap = null;
    dbConnection.modulesLocationConnectionsIndexMap = null;

    return Promise.resolve(dbConnection);
};

const insertNewModuleLocationConnection = (dbConnection, moduleLocationId, moduleParentLocationId, usrType) => {
    const composedKey = `${moduleLocationId}_${moduleParentLocationId}_${usrType}`; // UNIQUE(module_location_id, module_parent_location_id, type)

    if (dbConnection.modulesLocationConnectionsMap.has(composedKey)) {
        return Promise.resolve({
            lastID: dbConnection.modulesLocationConnectionsMapLastId
        });
    } else {
        dbConnection.modulesLocationConnectionsMapLastId += 1;
        dbConnection.modulesLocationConnectionsMap.set(dbConnection.modulesLocationConnectionsMapLastId, {
            id: dbConnection.modulesNamesMapLastId,
            module_location_id: moduleLocationId,
            module_parent_location_id: moduleParentLocationId,
            type: usrType,
        });

        dbConnection.modulesLocationConnectionsIndexMap.set(composedKey, dbConnection.modulesLocationConnectionsMapLastId);

        return Promise.resolve({
            lastID: dbConnection.modulesLocationConnectionsMapLastId
        });
    }
};

const convertTableToJSON = (dbConnection) => {
    const modulesLocationConnections = convertMapToJSON(dbConnection.modulesLocationConnectionsMap);
    const modulesLocationConnectionsIndexM = convertMapToJSON(dbConnection.modulesLocationConnectionsIndexMap);

    const combinedObject = {
        modulesLocationConnections,
        modulesLocationConnectionsIndexM,
    };

    return Promise.resolve(combinedObject);
};

// export
exports.createModulesLocationConnectionsTable = createModulesLocationConnectionsTable;
exports.dropModulesLocationConnectionsTable = dropModulesLocationConnectionsTable;
exports.insertNewModuleLocationConnection = insertNewModuleLocationConnection;
exports.convertTableToJSON = convertTableToJSON;