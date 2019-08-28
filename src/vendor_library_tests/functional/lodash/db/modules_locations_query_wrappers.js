'use strict';

// external imports

// local imports

// query wrappers implementation
const createModulesLocationsTable = (dbConnection) => dbConnection.exec(
    `CREATE TABLE IF NOT EXISTS modules_locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        module_name_id INTEGER NOT NULL,
        module_version_id INTEGER NOT NULL,
        path TEXT NOT NULL
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

// export
exports.createModulesLocationsTable = createModulesLocationsTable;
exports.dropModulesLocationsTable = dropModulesLocationsTable;
exports.insertNewModuleLocation = insertNewModuleLocation;