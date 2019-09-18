'use strict';

// external imports
const {isNil, identity} = require('lodash/fp');

// local imports
const {findLastRowIndexInJSON, convertMapToJSON, convertJSONToMap} = require('./../../helpers/json_helpers');
const {mapMapToArray} = require('./../../helpers/map_helpers');

// query wrappers implementation
const createNPMModulesVersionsTable = (dbConnection) => {
    return clearNPMModulesVersionsTable(dbConnection);
};

const dropNPMModulesVersionsTable = (dbConnection) => {
    dbConnection.npmModulesVersionsMapLastId = null;

    dbConnection.npmModulesVersionsMap = null;
    dbConnection.npmModulesVersionsIndexMap = null;

    return Promise.resolve(dbConnection);
};

const clearNPMModulesVersionsTable = (dbConnection) => {
    dbConnection.npmModulesVersionsMapLastId = -1;

    dbConnection.npmModulesVersionsMap = new Map();
    dbConnection.npmModulesVersionsIndexMap = new Map();

    return Promise.resolve(dbConnection);
};

const insertNewNPMModuleVersion = (dbConnection, moduleName, version) => {
    const composedKey = `${moduleName}_${version}`; // UNIQUE(module_name, version)

    if (dbConnection.npmModulesVersionsIndexMap.has(composedKey)) {
        return Promise.resolve({
            lastID: dbConnection.npmModulesVersionsMapLastId
        });
    } else {
        dbConnection.npmModulesVersionsMapLastId += 1;
        dbConnection.npmModulesVersionsMap.set(dbConnection.npmModulesVersionsMapLastId, {
            id: dbConnection.npmModulesVersionsMapLastId,
            name: moduleName,
            version
        });

        dbConnection.npmModulesVersionsIndexMap.set(composedKey, dbConnection.npmModulesVersionsMapLastId);

        return Promise.resolve({
            lastID: dbConnection.npmModulesVersionsMapLastId
        });
    }
};

const selectAllNPMModulesVersions = (dbConnection) => {
    const npmModulesVersions =  mapMapToArray(identity, dbConnection.npmModulesVersionsMap);
    return Promise.resolve(npmModulesVersions);
};

const selectNPMModuleVersionByNameAndVersion = (dbConnection, moduleName, usrVersion) => {
    for (const entry of dbConnection.npmModulesVersionsMap) {
        const {name, version} = entry[1];

        if (
            name === moduleName &&
            version === usrVersion
        ) {
            return Promise.resolve(entry[1]);
        }
    }

    return Promise.resolve(null);
};

// returns id
const selectInsertNPMModuleVersion = (dbConnection, moduleName, version) => {
    return new Promise((resolve, reject) => {
        selectNPMModuleVersionByNameAndVersion(dbConnection, moduleName, version)
            .then(moduleVersionRow => {
                if (!isNil(moduleVersionRow)) {
                    resolve(moduleVersionRow.id);
                } else {
                    insertNewNPMModuleVersion(dbConnection, moduleName, version)
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
exports.clearNPMModulesVersionsTable = clearNPMModulesVersionsTable;
exports.insertNewNPMModuleVersion = insertNewNPMModuleVersion;
exports.selectAllNPMModulesVersions = selectAllNPMModulesVersions;
exports.selectNPMModuleVersionByNameAndVersion = selectNPMModuleVersionByNameAndVersion;
exports.selectInsertNPMModuleVersion = selectInsertNPMModuleVersion;
exports.convertTableToJSON = convertTableToJSON;
exports.importTableFromJSON = importTableFromJSON;