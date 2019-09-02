'use strict';

// external imports
const chalk = require('chalk');

// local imports
const {createModulesNamesTable, dropModulesNamesTable} = require('./../db/js_memory/modules_names_query_wrappers');
const {createModulesVersionsTable, dropModulesVersionsTable} = require('./../db/js_memory/modules_versions_query_wrappers');
const {createModulesLocationsTable, dropModulesLocationsTable} = require('./../db/js_memory/modules_locations_query_wrappers');
const {createModulesLocationConnectionsTable, dropModulesLocationConnectionsTable} = require('./../db/js_memory/modules_location_connections_query_wrappers');
const {createPathsTraversedTable, dropPathsTraversedTable} = require('./../db/js_memory/paths_traversed_query_wrappers');

// effects implementation
const openConnectionToDB = () => ({
    modulesLocationsMapLastId: null,

    modulesLocationsMap: null,
    modulesLocationIndexMap: null,
});

const closeConnectionToDB = (dbConnection) => null;

const prepareDatabase = (dbConnection) => {
    console.log(chalk.blue('Dropping `modules_names` table...'));
    dropModulesNamesTable(dbConnection);

    console.log(chalk.blue('Dropping `modules_versions` table...'));
    dropModulesVersionsTable(dbConnection);

    console.log(chalk.blue('Dropping `modules_locations` table...'));
    dropModulesLocationsTable(dbConnection);

    console.log(chalk.blue('Dropping `modules_location_connections` table...'));
    dropModulesLocationConnectionsTable(dbConnection);

    console.log(chalk.blue('Dropping `paths_traversed` table...'));
    dropPathsTraversedTable(dbConnection);

    console.log(chalk.blue('Creating `modules_names` table...'));
    createModulesNamesTable(dbConnection);

    console.log(chalk.blue('Creating `modules_versions` table...'));
    createModulesVersionsTable(dbConnection);

    console.log(chalk.blue('Creating `modules_locations` table...'));
    createModulesLocationsTable(dbConnection);

    console.log(chalk.blue('Creating `modules_location_connections` table...'));
    createModulesLocationConnectionsTable(dbConnection);

    console.log(chalk.blue('Creating `paths_traversed` table...'));
    createPathsTraversedTable(dbConnection);
};
