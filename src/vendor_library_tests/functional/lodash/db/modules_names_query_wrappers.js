'use strict';

// external imports

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
    `DROP TABLE modules_names`
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

// export
exports.createModulesNamesTable = createModulesNamesTable;
exports.dropModulesNamesTable = dropModulesNamesTable;
exports.insertNewModuleName = insertNewModuleName;