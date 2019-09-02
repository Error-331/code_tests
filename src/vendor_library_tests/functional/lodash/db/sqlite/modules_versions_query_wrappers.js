'use strict';

// external imports
const {isNil} = require('lodash/fp');

// local imports

// query wrappers implementation
const createModulesVersionsTable = (dbConnection) => dbConnection.exec(
    `CREATE TABLE IF NOT EXISTS modules_versions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        module_name_id INTEGER NOT NULL,
        version TEXT NOT NULL,
        
        UNIQUE(module_name_id, version)
    )`
);

const dropModulesVersionsTable = (dbConnection) => dbConnection.exec(
    `DROP TABLE IF EXISTS modules_versions`
);

const insertNewModuleVersion = (dbConnection, moduleNameId, version) => dbConnection.run(
    `INSERT OR IGNORE INTO modules_versions (
        module_name_id, version
    ) 
    VALUES (
        ${moduleNameId}, 
        '${version}'
    )`
);

const selectModuleByNameIdAndVersion = (dbConnection, moduleNameId, version) => dbConnection.get(
    `SELECT * from modules_versions WHERE module_name_id = ${moduleNameId} AND version = '${version}' ORDER BY id LIMIT 1`
);

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

// export
exports.createModulesVersionsTable = createModulesVersionsTable;
exports.dropModulesVersionsTable = dropModulesVersionsTable;
exports.insertNewModuleVersion = insertNewModuleVersion;
exports.selectModuleByNameIdAndVersion = selectModuleByNameIdAndVersion;
exports.selectInsertModuleVersion = selectInsertModuleVersion;