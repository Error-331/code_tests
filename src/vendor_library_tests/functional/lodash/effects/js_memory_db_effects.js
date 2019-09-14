'use strict';

// external imports

// local imports
const modulesNamesQueryWrappers = require('./../db/js_memory/modules_names_query_wrappers');
const modulesVersionsQueryWrappers = require('./../db/js_memory/modules_versions_query_wrappers');
const modulesLocationsQueryWrappers = require('./../db/js_memory/modules_locations_query_wrappers');
const modulesLocationConnectionsQueryWrappers = require('./../db/js_memory/modules_location_connections_query_wrappers');
const pathsTraversedQueryWrappers = require('./../db/js_memory/paths_traversed_query_wrappers');

const {logDBMessage} = require('./../effects/log_effects');

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
    logDBMessage('Dropping `modules_names` table...');
    modulesNamesQueryWrappers.dropModulesNamesTable(dbConnection);

    logDBMessage('Dropping `modules_versions` table...');
    modulesVersionsQueryWrappers.dropModulesVersionsTable(dbConnection);

    logDBMessage('Dropping `modules_locations` table...');
    modulesLocationsQueryWrappers.dropModulesLocationsTable(dbConnection);

    logDBMessage('Dropping `modules_location_connections` table...');
    modulesLocationConnectionsQueryWrappers.dropModulesLocationConnectionsTable(dbConnection);

    logDBMessage('Dropping `paths_traversed` table...');
    pathsTraversedQueryWrappers.dropPathsTraversedTable(dbConnection);

    logDBMessage('Creating `modules_names` table...');
    modulesNamesQueryWrappers.createModulesNamesTable(dbConnection);

    logDBMessage('Creating `modules_versions` table...');
    modulesVersionsQueryWrappers.createModulesVersionsTable(dbConnection);

    logDBMessage('Creating `modules_locations` table...');
    modulesLocationsQueryWrappers.createModulesLocationsTable(dbConnection);

    logDBMessage('Creating `modules_location_connections` table...');
    modulesLocationConnectionsQueryWrappers.createModulesLocationConnectionsTable(dbConnection);

    logDBMessage('Creating `paths_traversed` table...');
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

const importFromJSON = (dbConnection, pathToFile) => {
    const jsonContents = require(pathToFile);

    logDBMessage(`Importing JSON data ('${pathToFile}')...`);

    return Promise.all(
        [
            modulesNamesQueryWrappers.importTableFromJSON(dbConnection, jsonContents),
            modulesVersionsQueryWrappers.importTableFromJSON(dbConnection, jsonContents),
            modulesLocationsQueryWrappers.importTableFromJSON(dbConnection, jsonContents),
            modulesLocationConnectionsQueryWrappers.importTableFromJSON(dbConnection, jsonContents),
            pathsTraversedQueryWrappers.importTableFromJSON(dbConnection, jsonContents)
        ]
    );
};

// export
exports.openConnectionToDB = openConnectionToDB;
exports.closeConnectionToDB = closeConnectionToDB;

exports.prepareDatabase = prepareDatabase;
exports.exportToJSON = exportToJSON;
exports.importFromJSON = importFromJSON;
