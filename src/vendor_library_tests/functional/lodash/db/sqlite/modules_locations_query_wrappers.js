'use strict';

// external imports
const {isNil} = require('lodash/fp');

// local imports

// query wrappers implementation
const createModulesLocationsTable = (dbConnection) => dbConnection.exec(
    `CREATE TABLE IF NOT EXISTS modules_locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        module_name_id INTEGER NOT NULL,
        module_version_id INTEGER NOT NULL,
        path TEXT NOT NULL,
        
        UNIQUE(module_name_id, module_version_id, path)
    )`
);

const dropModulesLocationsTable = (dbConnection) => dbConnection.exec(
    `DROP TABLE IF EXISTS modules_locations`
);

const insertNewModuleLocation = (dbConnection, moduleNameId, moduleVersionId, path) => dbConnection.run(
    `INSERT OR IGNORE INTO modules_locations (
        module_name_id, module_version_id, path
    ) 
    VALUES (
        ${moduleNameId}, 
        ${moduleVersionId},
        '${path}'
    )`
);

const selectLocationByPath = (dbConnection, path) => dbConnection.get(
    `SELECT * from modules_locations WHERE path = '${path}' ORDER BY id LIMIT 1`
);

const selectLocationByNameIdAndVersion = (dbConnection, moduleNameId, moduleVersionId, path) => dbConnection.get(
    `SELECT * from modules_locations WHERE module_name_id = ${moduleNameId} AND module_version_id = ${moduleVersionId} AND path = '${path}' ORDER BY id LIMIT 1`
);

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

// export
exports.createModulesLocationsTable = createModulesLocationsTable;
exports.dropModulesLocationsTable = dropModulesLocationsTable;
exports.insertNewModuleLocation = insertNewModuleLocation;
exports.selectLocationByPath = selectLocationByPath;
exports.selectLocationByNameIdAndVersion = selectLocationByNameIdAndVersion;
exports.selectInsertModuleLocation = selectInsertModuleLocation;