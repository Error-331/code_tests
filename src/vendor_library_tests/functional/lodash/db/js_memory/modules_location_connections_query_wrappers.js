'use strict';

// external imports
const {isNil} = require('lodash/fp');

// local imports
const {findLastRowIndexInJSON, convertMapToJSON, convertJSONToMap} = require('./../../helpers/json_helpers');

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

const insertNewModuleLocationConnection = (dbConnection, moduleLocationId, moduleParentLocationId, usrType, usrDepth) => {
    const composedKey = `${moduleLocationId}_${moduleParentLocationId}_${usrType}`; // UNIQUE(module_location_id, module_parent_location_id, type, depth)
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
            depth: usrDepth,
        });

        dbConnection.modulesLocationConnectionsIndexMap.set(composedKey, dbConnection.modulesLocationConnectionsMapLastId);

        return Promise.resolve({
            lastID: dbConnection.modulesLocationConnectionsMapLastId
        });
    }
};

const selectModuleLocationConnectionByParentLocationId = (dbConnection, moduleParentLocationId) => {
    for (const entry of dbConnection.modulesLocationConnectionsMap) {
        const {module_parent_location_id} = entry[1];

        if (module_parent_location_id === moduleParentLocationId) {
            return Promise.resolve(entry[1]);
        }
    }

    return Promise.resolve(null);
};

const selectModuleLocationConnection = (dbConnection, moduleLocationId, moduleParentLocationId, usrType, usrDepth) => {
    for (const entry of dbConnection.modulesLocationConnectionsMap) {
        const {module_location_id, module_parent_location_id, type, depth} = entry[1];

        if (
            module_location_id === moduleLocationId &&
            module_parent_location_id === moduleParentLocationId &&
            type === usrType &&
            depth === usrDepth
        ) {
            return Promise.resolve(entry[1]);
        }
    }

    return Promise.resolve(null);
};

const selectInsertModuleLocationConnection = (dbConnection, moduleLocationId, moduleParentLocationId, usrType, usrDepth) => {
    return new Promise((resolve, reject) => {
        selectModuleLocationConnection(dbConnection, moduleLocationId, moduleParentLocationId, usrType, usrDepth)
            .then(moduleLocationConnectionRow => {
                if (!isNil(moduleLocationConnectionRow)) {
                    resolve(moduleLocationConnectionRow.id);
                } else {
                    insertNewModuleLocationConnection(dbConnection, moduleLocationId, moduleParentLocationId, usrType, usrDepth)
                        .then((moduleLocationConnectionStatement) => {
                            resolve(moduleLocationConnectionStatement.lastID)
                        })
                        .catch(reject);
                }
            })
            .catch(reject)
    });
}

const convertTableToJSON = (dbConnection) => {
    const modulesLocationConnections = convertMapToJSON(dbConnection.modulesLocationConnectionsMap);
    const modulesLocationConnectionsIndex = convertMapToJSON(dbConnection.modulesLocationConnectionsIndexMap);

    const combinedObject = {
        modulesLocationConnections,
        modulesLocationConnectionsIndex,
    };

    return Promise.resolve(combinedObject);
};

const importTableFromJSON = (dbConnection, jsonData) => {
    dbConnection.modulesLocationConnectionsMapLastId = findLastRowIndexInJSON(jsonData.modulesLocationConnections);

    dbConnection.modulesLocationConnectionsMap = convertJSONToMap(jsonData.modulesLocationConnections);
    dbConnection.modulesLocationConnectionsIndexMap = convertJSONToMap(jsonData.modulesLocationConnectionsIndex);

    return Promise.resolve(dbConnection);
};

// export
exports.createModulesLocationConnectionsTable = createModulesLocationConnectionsTable;
exports.dropModulesLocationConnectionsTable = dropModulesLocationConnectionsTable;
exports.insertNewModuleLocationConnection = insertNewModuleLocationConnection;
exports.selectModuleLocationConnectionByParentLocationId = selectModuleLocationConnectionByParentLocationId;
exports.selectModuleLocationConnection = selectModuleLocationConnection;
exports.selectInsertModuleLocationConnection = selectInsertModuleLocationConnection;
exports.convertTableToJSON = convertTableToJSON;
exports.importTableFromJSON = importTableFromJSON;