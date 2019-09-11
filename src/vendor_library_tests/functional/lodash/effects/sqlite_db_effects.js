'use strict';

// external imports
const sqlite = require('sqlite');

// local imports
const {generateSync} = require('./../helpers/promise_sync_helpers');

const {createModulesNamesTable, dropModulesNamesTable} = require('../db/sqlite/modules_names_query_wrappers');
const {createModulesVersionsTable, dropModulesVersionsTable} = require('../db/sqlite/modules_versions_query_wrappers');
const {createModulesLocationsTable, dropModulesLocationsTable} = require('../db/sqlite/modules_locations_query_wrappers');
const {createModulesLocationConnectionsTable, dropModulesLocationConnectionsTable} = require('../db/sqlite/modules_location_connections_query_wrappers');
const {createPathsTraversedTable, dropPathsTraversedTable} = require('../db/sqlite/paths_traversed_query_wrappers');

const {logDBMessage} = require('./../effects/log_effects');

// effects implementation
const openConnectionToDB = () => sqlite.open(':memory:');
const closeConnectionToDB = (dbConnection) => dbConnection.close();

const prepareDatabase = generateSync(function* (dbConnection) {
    logDBMessage('Dropping `modules_names` table...');
    yield dropModulesNamesTable(dbConnection);

    logDBMessage('Dropping `modules_versions` table...');
    yield dropModulesVersionsTable(dbConnection);

    logDBMessage('Dropping `modules_locations` table...');
    yield dropModulesLocationsTable(dbConnection);

    logDBMessage('Dropping `modules_location_connections` table...');
    yield dropModulesLocationConnectionsTable(dbConnection);

    logDBMessage('Dropping `paths_traversed` table...');
    yield dropPathsTraversedTable(dbConnection);

    logDBMessage('Creating `modules_names` table...');
    yield createModulesNamesTable(dbConnection);

    logDBMessage('Creating `modules_versions` table...');
    yield createModulesVersionsTable(dbConnection);

    logDBMessage('Creating `modules_locations` table...');
    yield createModulesLocationsTable(dbConnection);

    logDBMessage('Creating `modules_location_connections` table...');
    yield createModulesLocationConnectionsTable(dbConnection);

    logDBMessage('Creating `paths_traversed` table...');
    yield createPathsTraversedTable(dbConnection);
});

// export
exports.openConnectionToDB = openConnectionToDB;
exports.closeConnectionToDB = closeConnectionToDB;

exports.prepareDatabase = prepareDatabase;