'use strict';

// external imports
const chalk = require('chalk');

// local imports
const modulesNamesQueryWrappers = require('./../db/js_memory/modules_names_query_wrappers');
const modulesVersionsQueryWrappers = require('./../db/js_memory/modules_versions_query_wrappers');
const modulesLocationsQueryWrappers = require('./../db/js_memory/modules_locations_query_wrappers');
const modulesLocationConnectionsQueryWrappers = require('./../db/js_memory/modules_location_connections_query_wrappers');
const pathsTraversedQueryWrappers = require('./../db/js_memory/paths_traversed_query_wrappers');

// effects implementation
const openConnectionToDB = () => ({
    modulesNamesMapLastId: null,
    modulesVersionsMapLastId:  null,
    modulesLocationsMapLastId: null,
    modulesLocationConnectionsMapLastId: null,
    pathsTraversedMapLastId: null,

    modulesNamesMap: null,
    modulesVersionsMap: null,
    modulesLocationsMap: null,
    modulesLocationConnectionsMap: null,
    pathsTraversedMap: null,

    modulesNamesIndexMap: null,
    modulesVersionsIndexMap: null,
    modulesLocationIndexMap: null,
    modulesLocationConnectionsIndexMap: null,
    pathsTraversedIndexMap: null,
});

const closeConnectionToDB = () => null;

const prepareDatabase = (dbConnection) => {
    console.log(chalk.blue('Dropping `modules_names` table...'));
    modulesNamesQueryWrappers.dropModulesNamesTable(dbConnection);

    console.log(chalk.blue('Dropping `modules_versions` table...'));
    modulesVersionsQueryWrappers.dropModulesVersionsTable(dbConnection);

    console.log(chalk.blue('Dropping `modules_locations` table...'));
    modulesLocationsQueryWrappers.dropModulesLocationsTable(dbConnection);

    console.log(chalk.blue('Dropping `modules_location_connections` table...'));
    modulesLocationConnectionsQueryWrappers.dropModulesLocationConnectionsTable(dbConnection);

    console.log(chalk.blue('Dropping `paths_traversed` table...'));
    pathsTraversedQueryWrappers.dropPathsTraversedTable(dbConnection);

    console.log(chalk.blue('Creating `modules_names` table...'));
    modulesNamesQueryWrappers.createModulesNamesTable(dbConnection);

    console.log(chalk.blue('Creating `modules_versions` table...'));
    modulesVersionsQueryWrappers.createModulesVersionsTable(dbConnection);

    console.log(chalk.blue('Creating `modules_locations` table...'));
    modulesLocationsQueryWrappers.createModulesLocationsTable(dbConnection);

    console.log(chalk.blue('Creating `modules_location_connections` table...'));
    modulesLocationConnectionsQueryWrappers.createModulesLocationConnectionsTable(dbConnection);

    console.log(chalk.blue('Creating `paths_traversed` table...'));
    pathsTraversedQueryWrappers.createPathsTraversedTable(dbConnection);
};

const exportToJSON = (dbConnection) => {
    return Promise.all(
        [
            modulesNamesQueryWrappers.convertTableToJSON(dbConnection),
            modulesVersionsQueryWrappers.convertTableToJSON(dbConnection),
            modulesLocationsQueryWrappers.convertTableToJSON(dbConnection),
            modulesLocationConnectionsQueryWrappers.convertTableToJSON(dbConnection),
            pathsTraversedQueryWrappers.convertTableToJSON(dbConnection)
        ]
    ).then((pathsTraversed) => {
        const resultingJSON = Object.assign(
            {},
                pathsTraversed[0],
                pathsTraversed[1],
                pathsTraversed[2],
                pathsTraversed[3],
                pathsTraversed[4]
            );

        return Promise.resolve(resultingJSON);
    });
};

// export
exports.openConnectionToDB = openConnectionToDB;
exports.closeConnectionToDB = closeConnectionToDB;

exports.prepareDatabase = prepareDatabase;
exports.exportToJSON = exportToJSON;
