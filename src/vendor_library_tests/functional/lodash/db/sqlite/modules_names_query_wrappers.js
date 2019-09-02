'use strict';

// external imports
const {isNil} = require('lodash/fp');

// local imports

// query wrappers implementation
const createModulesNamesTable = (dbConnection) => dbConnection.exec(
    `CREATE TABLE IF NOT EXISTS modules_names (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        belongs_to_organization INTEGER NOT NULL
    )`
);

const dropModulesNamesTable = (dbConnection) => dbConnection.exec(
    `DROP TABLE IF EXISTS modules_names`
);

const insertNewModuleName = (dbConnection, name, belongsToOrganization) => dbConnection.run(
    `INSERT OR IGNORE INTO modules_names (
        name, belongs_to_organization
    ) 
    VALUES (
        '${name}', 
        ${belongsToOrganization}
    )`
);

const selectModule = (dbConnection, name, belongsToOrganization) => dbConnection.get(
    `SELECT * from modules_names WHERE name = '${name}' AND belongs_to_organization = ${belongsToOrganization} ORDER BY id LIMIT 1`
);

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

// export
exports.createModulesNamesTable = createModulesNamesTable;
exports.dropModulesNamesTable = dropModulesNamesTable;
exports.insertNewModuleName = insertNewModuleName;
exports.selectModule = selectModule;
exports.selectInsertModuleName = selectInsertModuleName;