'use strict';

// external imports
const {realpathSync} = require('fs');

// local imports

// query wrappers implementation
const createPathsTraversedTable = (dbConnection) => dbConnection.exec(
    `CREATE TABLE IF NOT EXISTS paths_traversed (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        path TEXT NOT NULL,
        rel_path TEXT NOT NULL,
        
        UNIQUE(path, rel_path)
    )`
);

const dropPathsTraversedTable = (dbConnection) => dbConnection.exec(
    `DROP TABLE IF EXISTS paths_traversed`
);

const insertNewPath = (dbConnection, path) => {
    const relPath = realpathSync(path);

    return dbConnection.run(
        `INSERT OR IGNORE INTO paths_traversed (
        path, rel_path
    ) 
    VALUES (
        '${path}', 
        '${relPath}'
    )`);
};

const selectTraversedPathByPath = (dbConnection, path) => dbConnection.get(
    `SELECT * from paths_traversed WHERE path = '${path}' ORDER BY id LIMIT 1`
);

// export
exports.createPathsTraversedTable = createPathsTraversedTable;
exports.dropPathsTraversedTable = dropPathsTraversedTable;
exports.insertNewPath = insertNewPath ;
exports.selectTraversedPathByPath = selectTraversedPathByPath;