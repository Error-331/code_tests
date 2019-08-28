'use strict';

// external imports

// local imports

// query wrappers implementation
const createModulesVersionsTable = (dbConnection) => dbConnection.exec(
    `CREATE TABLE IF NOT EXISTS modules_versions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        module_name_id INTEGER NOT NULL,
        version TEXT NOT NULL
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

// export
exports.createModulesVersionsTable = createModulesVersionsTable;
exports.dropModulesVersionsTable = dropModulesVersionsTable;
exports.insertNewModuleVersion = insertNewModuleVersion;