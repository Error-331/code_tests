'use strict';

// external imports
const {isNil} = require('lodash/fp');

// local imports
const {convertMapToJSON} = require('./../../helpers/map_helpers');

// query wrappers implementation
const createModulesVersionsTable = (dbConnection) => {
    dbConnection.modulesVersionsMapLastId = -1;

    dbConnection.modulesVersionsMap = new Map();
    dbConnection.modulesVersionsIndexMap = new Map();

    return Promise.resolve(dbConnection);
};

const dropModulesVersionsTable = (dbConnection) => {
    dbConnection.modulesVersionsMapLastId = null;

    dbConnection.modulesVersionsMap = null;
    dbConnection.modulesVersionsIndexMap = null;

    return Promise.resolve(dbConnection);
};

const insertNewModuleVersion = (dbConnection, moduleNameId, version) => {
    const composedKey = `${moduleNameId}_${version}`; // UNIQUE(module_name_id, version)

    if (dbConnection.modulesVersionsIndexMap.has(composedKey)) {
        return Promise.resolve({
            lastID: dbConnection.modulesVersionsMapLastId
        });
    } else {
        dbConnection.modulesVersionsMapLastId += 1;
        dbConnection.modulesVersionsMap.set(dbConnection.modulesVersionsMapLastId, {
            id: dbConnection.modulesVersionsMapLastId,
            module_name_id: moduleNameId,
            version
        });

        dbConnection.modulesVersionsIndexMap.set(composedKey, dbConnection.modulesVersionsMapLastId);

        return Promise.resolve({
            lastID: dbConnection.modulesVersionsMapLastId
        });
    }
};

const selectModuleByNameIdAndVersion = (dbConnection, moduleNameId, usrVersion) => {
    for (const entry of dbConnection.modulesNamesMap) {
        const {module_name_id, version} = entry[1];

        if (
            module_name_id === moduleNameId &&
            version === usrVersion
        ) {
            return Promise.resolve(entry[1]);
        }
    }

    return Promise.resolve(null);
};

// returns id
const selectInsertModuleVersion = (dbConnection, moduleNameId, version) => {
    return new Promise((resolve, reject) => {
        selectModuleByNameIdAndVersion(dbConnection, moduleNameId, version)
            .then(moduleVersionRow => {
                if (!isNil(moduleVersionRow)) {
                    resolve(moduleVersionRow.id);
                } else {
                    insertNewModuleVersion(dbConnection, moduleNameId, version)
                        .then((moduleVersionStatement) => {
                            resolve(moduleVersionStatement.lastID)
                        })
                        .catch(reject);
                }
            })
            .catch(reject)
    });
};

const convertTableToJSON = (dbConnection) => {
    const modulesVersions = convertMapToJSON(dbConnection.modulesVersionsMap);
    const modulesVersionsIndex = convertMapToJSON(dbConnection.modulesVersionsIndexMap);

    const combinedObject = {
        modulesVersions,
        modulesVersionsIndex,
    };

    return Promise.resolve(combinedObject);
};

// export
exports.createModulesVersionsTable = createModulesVersionsTable;
exports.dropModulesVersionsTable = dropModulesVersionsTable;
exports.insertNewModuleVersion = insertNewModuleVersion;
exports.selectModuleByNameIdAndVersion = selectModuleByNameIdAndVersion;
exports.selectInsertModuleVersion = selectInsertModuleVersion;
exports.convertTableToJSON = convertTableToJSON;