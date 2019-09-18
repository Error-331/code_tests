'use strict';

// external imports
const {join} = require('path');
const {realpathSync} = require('fs');

const {isNil, defaultTo, equals, size, keys, curry, map, differenceWith} = require('lodash/fp');

// local imports
const {removeLastPathEntity} = require('./../helpers/path_helpers');
const {generateSync} = require('./../helpers/promise_sync_helpers');

const {getDBType} = require('./app_effects');
const {logErrorMessage, logDBMessage, logRemoteTaskMessage} = require('./log_effects');
const {loadNPMPackageCurrentVersionBy} = require('./npm_effects');

const {
    getModulesNamesQueryWrappers,
    getModulesVersionsQueryWrappers,
    getModulesLocationsQueryWrappers,
    getModulesLocationConnectionsQueryWrappers,
    getPathsTraversedQueryWrappers,
    getNPMModulesVersionsQueryWrappers,
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

const loadAndInsertNPMVersions = generateSync(function* (dbConnection, moduleNamesRows) {
    const dbType = getDBType();
    const npmModulesVersionsQueryWrappers = getNPMModulesVersionsQueryWrappers(dbType);

    logRemoteTaskMessage('Loading versions numbers from NPM');
    const npmRequestsPromises = map(({name}) => loadNPMPackageCurrentVersionBy(
        version => ({name, version}),
        name
    ), moduleNamesRows);

    const npmVersionsData = yield Promise.all(npmRequestsPromises);
    const npmVersionsTablePromises = map(({name, version}) => {
        logDBMessage(`Adding NPM version '${version}' for module '${name}'`);

        return npmModulesVersionsQueryWrappers.insertNewNPMModuleVersion(dbConnection, name, version);
    }, npmVersionsData);

    return Promise.all(npmVersionsTablePromises);
});

const populateNPMModulesVersions = generateSync(function* (dbConnection) {
    const dbType = getDBType();

    const npmModulesVersionsQueryWrappers = getNPMModulesVersionsQueryWrappers(dbType);
    const modulesNamesQueryWrappers = getModulesNamesQueryWrappers(dbType);

    logDBMessage('Clearing NPM versions table (versions cache)');
    yield npmModulesVersionsQueryWrappers.clearNPMModulesVersionsTable(dbConnection);

    const modulesNamesRows = yield modulesNamesQueryWrappers.selectAllModulesNames(dbConnection);
    yield loadAndInsertNPMVersions(dbConnection, modulesNamesRows);
});

// TODO: rewrite using joins
const populateMissingNPMModulesVersions = generateSync(function* (dbConnection) {
    const dbType = getDBType();

    const modulesNamesQueryWrappers = getModulesNamesQueryWrappers(dbType);
    const npmModulesVersionsQueryWrappers = getNPMModulesVersionsQueryWrappers(dbType);

    const modulesNamesRows = yield modulesNamesQueryWrappers.selectAllModulesNames(dbConnection);
    const npmModulesVersionsRows = yield npmModulesVersionsQueryWrappers.selectAllNPMModulesVersions(dbConnection);

    const missingNPMModulesRows = differenceWith(
        (versionRow, npmVersionRow) => equals(versionRow.name, npmVersionRow.name),
        modulesNamesRows, npmModulesVersionsRows
    );

    if (size(missingNPMModulesRows) === 0) {
        return;
    }

    yield loadAndInsertNPMVersions(dbConnection, missingNPMModulesRows);
});

// export
exports.isPathAlreadyTraversed = isPathAlreadyTraversed;
exports.insertModuleData = insertModuleData;
exports.insertDependencyListToDB = insertDependencyListToDB;
exports.loadAndInsertNPMVersions = loadAndInsertNPMVersions;
exports.populateNPMModulesVersions = populateNPMModulesVersions;
exports.populateMissingNPMModulesVersions = populateMissingNPMModulesVersions;