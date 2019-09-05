'use strict';

// external imports
const {isNil} = require('lodash/fp');

// local imports
const {convertMapToJSON} = require('./../../helpers/map_helpers');

// query wrappers implementation
const createModulesLocationsTable = (dbConnection) => {
    dbConnection.modulesLocationsMapLastId = -1;

    dbConnection.modulesLocationsMap = new Map();
    dbConnection.modulesLocationIndexMap = new Map();

    return Promise.resolve(dbConnection);
};

const dropModulesLocationsTable = (dbConnection) => {
    dbConnection.modulesLocationsMapLastId = null;

    dbConnection.modulesLocationsMap = null;
    dbConnection.modulesLocationIndexMap = null;

    return Promise.resolve(dbConnection);
};

const insertNewModuleLocation = (dbConnection, moduleNameId, moduleVersionId, path) => {
    const composedKey = `${moduleNameId}_${moduleVersionId}_${path}`; // UNIQUE(module_name_id, module_version_id, path)

    if (dbConnection.modulesLocationIndexMap.has(composedKey)) {
        return Promise.resolve({
            lastID: dbConnection.modulesLocationsMapLastId
        });
    } else {
        dbConnection.modulesLocationsMapLastId += 1;
        dbConnection.modulesLocationsMap.set(dbConnection.modulesLocationsMapLastId, {
            id: dbConnection.modulesLocationsMapLastId,
            module_name_id: moduleNameId,
            module_version_id: moduleVersionId,
            path,
        });

        dbConnection.modulesLocationIndexMap.set(composedKey, dbConnection.modulesLocationsMapLastId);

        return Promise.resolve({
            lastID: dbConnection.modulesLocationsMapLastId
        });
    }
};

const selectLocationByPath = (dbConnection, usrPath) => {
    for (const entry of dbConnection.modulesLocationsMap) {
        const {path} = entry[1];

        if (path === usrPath) {
            return Promise.resolve(entry[1]);
        }
    }

    return Promise.resolve(null);
};

const selectLocationByNameIdAndVersion = (dbConnection, moduleNameId, moduleVersionId, usrPath) => {
    for (const entry of dbConnection.modulesLocationsMap) {
        const {module_name_id, module_version_id, path} = entry[1];

        if (
            module_name_id === moduleNameId &&
            module_version_id === moduleVersionId &&
            path === usrPath
        ) {
            return Promise.resolve(entry[1]);
        }
    }

    return Promise.resolve(null);
};

// returns id
const selectInsertModuleLocation = (dbConnection, moduleNameId, moduleVersionId, path) => {
    return new Promise((resolve, reject) => {
        selectLocationByNameIdAndVersion(dbConnection, moduleNameId, moduleVersionId, path)
            .then(moduleLocationRow => {
                if (!isNil(moduleLocationRow)) {
                    resolve(moduleLocationRow.id);
                } else {
                    insertNewModuleLocation(dbConnection, moduleNameId, moduleVersionId, path)
                        .then((moduleLocationStatement) => {
                            resolve(moduleLocationStatement.lastID)
                        })
                        .catch(reject);
                }
            })
            .catch(reject)
    });
};

const convertTableToJSON = (dbConnection) => {
    const modulesNames = convertMapToJSON(dbConnection.modulesLocationsMap);
    const modulesNamesIndex = convertMapToJSON(dbConnection.modulesLocationIndexMap);

    const combinedObject = {
        modulesNames,
        modulesNamesIndex,
    };

    return Promise.resolve(combinedObject);
};

// export
exports.createModulesLocationsTable = createModulesLocationsTable;
exports.dropModulesLocationsTable = dropModulesLocationsTable;
exports.insertNewModuleLocation = insertNewModuleLocation;
exports.selectLocationByPath = selectLocationByPath;
exports.selectLocationByNameIdAndVersion = selectLocationByNameIdAndVersion;
exports.selectInsertModuleLocation = selectInsertModuleLocation;
exports.convertTableToJSON = convertTableToJSON;