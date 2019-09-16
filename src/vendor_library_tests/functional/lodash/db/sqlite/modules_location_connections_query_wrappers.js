'use strict';

// external imports

// local imports

// query wrappers implementation

// type - dev, peer, regular
const createModulesLocationConnectionsTable = (dbConnection) => dbConnection.exec(
    `CREATE TABLE IF NOT EXISTS modules_location_connections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        module_location_id INTEGER NOT NULL,
        module_parent_location_id INTEGER NOT NULL,
        type TEXT NOT NULL,
        depth INTEGER NOT NULL,
        
        UNIQUE(module_location_id, module_parent_location_id, type)
    )`
);

const dropModulesLocationConnectionsTable = (dbConnection) => dbConnection.exec(
    `DROP TABLE IF EXISTS modules_location_connections`
);

const insertNewModuleLocationConnection = (dbConnection, moduleLocationId, moduleParentLocationId, type, depth) => dbConnection.run(
    `INSERT OR IGNORE INTO modules_location_connections (
        module_location_id, module_parent_location_id, type, depth
    ) 
    VALUES (
        ${moduleLocationId}, 
        ${moduleParentLocationId},
        '${type}',
        ${depth}
    )`
);

// export
exports.createModulesLocationConnectionsTable = createModulesLocationConnectionsTable;
exports.dropModulesLocationConnectionsTable = dropModulesLocationConnectionsTable;
exports.insertNewModuleLocationConnection = insertNewModuleLocationConnection;