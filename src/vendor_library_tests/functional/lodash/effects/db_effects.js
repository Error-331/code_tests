'use strict';

// external imports
const {join} = require('path');
const {isNil, defaultTo, keys} = require('lodash/fp');

// local imports
const {generateSync} = require('./../helpers/promise_sync_helpers');

const {createModulesNamesTable, dropModulesNamesTable, insertNewModuleName} = require('./../db/modules_names_query_wrappers');
const {createModulesVersionsTable, dropModulesVersionsTable, insertNewModuleVersion} = require('./../db/modules_versions_query_wrappers');
const {createModulesLocationsTable, dropModulesLocationsTable, insertNewModuleLocation} = require('./../db/modules_locations_query_wrappers');
const {createModulesLocationConnectionsTable, dropModulesLocationConnectionsTable, insertNewModuleLocationConnection} = require('./../db/modules_location_connections_query_wrappers');

// effects implementation
const prepareDatabase = generateSync(function* (dbConnection) {
    console.log('Dropping `modules_names` table...');
    yield dropModulesNamesTable(dbConnection);

    console.log('Dropping `modules_versions` table...');
    yield dropModulesVersionsTable(dbConnection);

    console.log('Dropping `modules_locations` table...');
    yield dropModulesLocationsTable(dbConnection);

    console.log('Dropping `modules_location_connections` table...');
    yield dropModulesLocationConnectionsTable(dbConnection);

    console.log('Creating `modules_names` table...');
    yield createModulesNamesTable(dbConnection);

    console.log('Creating `modules_versions` table...');
    yield createModulesVersionsTable(dbConnection);

    console.log('Creating `modules_locations` table...');
    yield createModulesLocationsTable(dbConnection);

    console.log('Creating `modules_location_connections` table...');
    yield createModulesLocationConnectionsTable(dbConnection);
});

const insertModuleData = generateSync(function* (dbConnection, name, version, location, parentModuleLocationId, type) {
    const moduleNameStatement = yield insertNewModuleName(dbConnection, name, 0);
    const moduleVersionStatement = yield insertNewModuleVersion(dbConnection, moduleNameStatement.lastID, version); // TODO: FIX!!!
    const moduleLocationStatement = yield insertNewModuleLocation(dbConnection, moduleNameStatement.lastID, moduleVersionStatement.lastID, location);

    if (!isNil(parentModuleLocationId)) {
        yield insertNewModuleLocationConnection(dbConnection, moduleLocationStatement.lastID, parentModuleLocationId, type);
    }

    yield moduleLocationStatement.lastID;
});

const insertDependencyListToDB = generateSync(function* (dbConnection, packageJSONDependencies, pathToParentModule, parentLocationId, type) {
    const dependencies = defaultTo({})(packageJSONDependencies);
    const dependenciesKeys = keys(dependencies);

    for (let dependencyKeyIndex = 0; dependencyKeyIndex < dependenciesKeys.length; dependencyKeyIndex++) {
        const dependencyName = dependenciesKeys[dependencyKeyIndex];
        const dependencyVersion = dependencies[dependencyName];

        yield insertModuleData(dbConnection, dependencyName, dependencyVersion, join(pathToParentModule, 'node_modules', dependencyName), parentLocationId, type);
    }
});

// export
exports.prepareDatabase = prepareDatabase;
exports.insertModuleData = insertModuleData;
exports.insertDependencyListToDB = insertDependencyListToDB;