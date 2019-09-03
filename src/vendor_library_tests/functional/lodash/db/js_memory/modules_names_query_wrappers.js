'use strict';

// external imports
const {isNil} = require('lodash/fp');

// local imports
const {convertMapToJSON} = require('./../../helpers/map_helpers');

// query wrappers implementation
const createModulesNamesTable = (dbConnection) => {
    dbConnection.modulesNamesMapLastId = -1;

    dbConnection.modulesNamesMap = new Map();
    dbConnection.modulesNamesIndexMap = new Map();

    return Promise.resolve(dbConnection);
};

const dropModulesNamesTable = (dbConnection) => {
    dbConnection.modulesNamesMapLastId = null;

    dbConnection.modulesNamesMap = null;
    dbConnection.modulesNamesIndexMap = null;

    return Promise.resolve(dbConnection);
};

const insertNewModuleName = (dbConnection, name, belongsToOrganization) => {
    const composedKey = name; // UNIQUE(name)

    if (dbConnection.modulesNamesIndexMap.has(composedKey)) {
        return Promise.resolve({
            lastID: dbConnection.modulesNamesMapLastId
        });
    } else {
        dbConnection.modulesNamesMapLastId += 1;
        dbConnection.modulesNamesMap.set(dbConnection.modulesNamesMapLastId, {
            id: dbConnection.modulesNamesMapLastId,
            name,
            belongs_to_organization: belongsToOrganization,
        });

        dbConnection.modulesNamesIndexMap.set(composedKey, dbConnection.modulesNamesMapLastId);

        return Promise.resolve({
            lastID: dbConnection.modulesNamesMapLastId
        });
    }
};

const selectModule = (dbConnection, usrName, belongsToOrganization) => {
    for (const entry of dbConnection.modulesNamesMap) {
        const {name, belongs_to_organization} = entry[1];

        if (
            name === usrName &&
            belongs_to_organization === belongsToOrganization
        ) {
            return Promise.resolve(entry[1]);
        }
    }

    return Promise.resolve(null);
};


// returns id
const selectInsertModuleName = (dbConnection, name, belongsToOrganization) => {
    return new Promise((resolve, reject) => {
        selectModule(dbConnection, name, belongsToOrganization)
            .then(moduleNameRow => {
                if (!isNil(moduleNameRow)) {
                    resolve(moduleNameRow.id);
                } else {
                    insertNewModuleName(dbConnection, name, belongsToOrganization)
                        .then((moduleNameStatement) => {
                            resolve(moduleNameStatement.lastID)
                        })
                        .catch(reject);
                }
            })
            .catch(reject)
    });
};

const convertTableToJSON = (dbConnection) => {
    const modulesNames = convertMapToJSON(dbConnection.modulesNamesMap);
    const modulesNamesIndex = convertMapToJSON(dbConnection.modulesNamesIndexMap);

    const combinedObject = {
        modulesNames,
        modulesNamesIndex,
    };

    return Promise.resolve(combinedObject);
};

// export
exports.createModulesNamesTable = createModulesNamesTable;
exports.dropModulesNamesTable = dropModulesNamesTable;
exports.insertNewModuleName = insertNewModuleName;
exports.selectModule = selectModule;
exports.selectInsertModuleName = selectInsertModuleName;
exports.convertTableToJSON = convertTableToJSON;