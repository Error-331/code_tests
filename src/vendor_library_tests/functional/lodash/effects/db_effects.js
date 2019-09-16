'use strict';

// external imports
const {join} = require('path');
const {realpathSync} = require('fs');

const {isNil, defaultTo, keys, curry} = require('lodash/fp');

// local imports
const {removeLastPathEntity} = require('./../helpers/path_helpers');
const {generateSync} = require('./../helpers/promise_sync_helpers');

const {getDBType} = require('./app_effects');
const {logErrorMessage, logDBMessage} = require('./log_effects');

const {
    getModulesNamesQueryWrappers,
    getModulesVersionsQueryWrappers,
    getModulesLocationsQueryWrappers,
    getModulesLocationConnectionsQueryWrappers,
    getPathsTraversedQueryWrappers,
} = require('./../helpers/db_helpers');

// effects implementation
const isPathAlreadyTraversed = curry((dbConnection, path) => {
    return generateSync(function* (dbConnection, path) {
        let preparedPath = realpathSync(removeLastPathEntity(path)); // TODO: to helpers

        const traversedPath = yield getPathsTraversedQueryWrappers(getDBType()).selectTraversedPathByPath(dbConnection, preparedPath);

        if (!isNil(traversedPath)) {
            logErrorMessage(`Found traversed path '${traversedPath.path}'`);
        }

        yield !isNil(traversedPath);

    })(dbConnection, path);
});

const insertModuleData = generateSync(function* (dbConnection, name, version, location, parentModuleLocationId, type, depth) {
    const dbType = getDBType();

    logDBMessage(`Adding module '${name}' (version: ${version}) in '${location}'`);

    const moduleNameId = yield getModulesNamesQueryWrappers(dbType).selectInsertModuleName(dbConnection, name, 0);
    const moduleVersionId = yield getModulesVersionsQueryWrappers(dbType).selectInsertModuleVersion(dbConnection, moduleNameId, version);
    const moduleLocationId = yield getModulesLocationsQueryWrappers(dbType).selectInsertModuleLocation(dbConnection, moduleNameId, moduleVersionId, location);

    if (!isNil(parentModuleLocationId)) {
        yield getModulesLocationConnectionsQueryWrappers(dbType).selectInsertModuleLocationConnection(dbConnection, moduleLocationId, parentModuleLocationId, type, depth);
    }

    yield moduleLocationId;
});

const insertDependencyListToDB = generateSync(function* (dbConnection, packageJSONDependencies, pathToParentModule, parentLocationId, type, depth) {
    const dependencies = defaultTo({})(packageJSONDependencies);
    const dependenciesKeys = keys(dependencies);

    for (let dependencyKeyIndex = 0; dependencyKeyIndex < dependenciesKeys.length; dependencyKeyIndex++) {
        const dependencyName = dependenciesKeys[dependencyKeyIndex];
        const dependencyVersion = dependencies[dependencyName];

        yield insertModuleData(dbConnection, dependencyName, dependencyVersion, join(pathToParentModule, 'node_modules', dependencyName), parentLocationId, type, depth);
    }
});

// export
exports.isPathAlreadyTraversed = isPathAlreadyTraversed;
exports.insertModuleData = insertModuleData;
exports.insertDependencyListToDB = insertDependencyListToDB;