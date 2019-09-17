'use strict';

// external imports
const {isNil} = require('lodash/fp');

// local imports
const {findLastRowIndexInJSON, convertMapToJSON, convertJSONToMap} = require('./../../helpers/json_helpers');

// query wrappers implementation
const createNPMModulesVersionsTable = (dbConnection) => {
    dbConnection.npmModulesVersionsMapLastId = -1;

    dbConnection.npmModulesVersionsMap = new Map();
    dbConnection.npmModulesVersionsIndexMap = new Map();

    return Promise.resolve(dbConnection);
};

const dropNPMModulesVersionsTable = (dbConnection) => {
    dbConnection.npmModulesVersionsMapLastId = null;

    dbConnection.npmModulesVersionsMap = null;
    dbConnection.npmModulesVersionsIndexMap = null;

    return Promise.resolve(dbConnection);
};

const insertNewNPMModuleVersion = (dbConnection, moduleNameId, version) => {
    const composedKey = `${moduleNameId}_${version}`; // UNIQUE(module_name_id, version)

    if (dbConnection.npmModulesVersionsIndexMap.has(composedKey)) {
        return Promise.resolve({
            lastID: dbConnection.npmModulesVersionsMapLastId
        });
    } else {
        dbConnection.npmModulesVersionsMapLastId += 1;
        dbConnection.npmModulesVersionsMap.set(dbConnection.npmModulesVersionsMapLastId, {
            id: dbConnection.npmModulesVersionsMapLastId,
            module_name_id: moduleNameId,
            version
        });

        dbConnection.npmModulesVersionsIndexMap.set(composedKey, dbConnection.npmModulesVersionsMapLastId);

        return Promise.resolve({
            lastID: dbConnection.npmModulesVersionsMapLastId
        });
    }
};

const selectNPMModuleVersionByNameIdAndVersion = (dbConnection, moduleNameId, usrVersion) => {
    for (const entry of dbConnection.npmModulesVersionsMap) {
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
const selectInsertNPMModuleVersion = (dbConnection, moduleNameId, version) => {
    return new Promise((resolve, reject) => {
        selectNPMModuleVersionByNameIdAndVersion(dbConnection, moduleNameId, version)
            .then(moduleVersionRow => {
                if (!isNil(moduleVersionRow)) {
                    resolve(moduleVersionRow.id);
                } else {
                    insertNewNPMModuleVersion(dbConnection, moduleNameId, version)
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
    const npmModulesVersions = convertMapToJSON(dbConnection.npmModulesVersionsMap);
    const npmModulesVersionsIndex = convertMapToJSON(dbConnection.npmModulesVersionsIndexMap);

    const combinedObject = {
        npmModulesVersions,
        npmModulesVersionsIndex,
    };

    return Promise.resolve(combinedObject);
};

const importTableFromJSON = (dbConnection, jsonData) => {
    dbConnection.npmModulesVersionsMapLastId = findLastRowIndexInJSON(jsonData.npmModulesVersions);

    dbConnection.npmModulesVersionsMap = convertJSONToMap(jsonData.npmModulesVersions);
    dbConnection.npmModulesVersionsIndexMap = convertJSONToMap(jsonData.npmModulesVersionsIndex);

    return Promise.resolve(dbConnection);
};

// export
exports.createNPMModulesVersionsTable = createNPMModulesVersionsTable;
exports.dropNPMModulesVersionsTable = dropNPMModulesVersionsTable;
exports.insertNewNPMModuleVersion = insertNewNPMModuleVersion;
exports.selectNPMModuleVersionByNameIdAndVersion = selectNPMModuleVersionByNameIdAndVersion;
exports.selectInsertNPMModuleVersion = selectInsertNPMModuleVersion;
exports.convertTableToJSON = convertTableToJSON;
exports.importTableFromJSON = importTableFromJSON;