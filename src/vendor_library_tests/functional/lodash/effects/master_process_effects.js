'use strict';

// external imports
const {stubTrue, equals, cond} = require('lodash/fp');

const chalk = require('chalk');
const {bind} = require('lodash/fp');

// local imports
const {
    INSERT_NEW_MODULE_NAME_CHILD_PROCESS,
    SELECT_MODULE_CHILD_PROCESS_CHILD_PROCESS,
    SELECT_INSERT_MODULE_NAME_CHILD_PROCESS,

    INSERT_NEW_MODULE_VERSION_CHILD_PROCESS,
    SELECT_MODULE_BY_NAME_ID_AND_VERSION_CHILD_PROCESS,
    SELECT_INSERT_MODULE_VERSION_CHILD_PROCESS,

    INSERT_NEW_MODULE_LOCATION_CHILD_PROCESS,
    SELECT_LOCATION_BY_PATH_CHILD_PROCESS,
    SELECT_LOCATION_BY_NAME_ID_AND_VERSION_CHILD_PROCESS,
    SELECT_INSERT_MODULE_LOCATION_CHILD_PROCESS,

    INSERT_NEW_MODULE_LOCATION_CONNECTION_CHILD_PROCESS,

    INSERT_NEW_PATH_CHILD_PROCESS,
    SELECT_TRAVERSED_PATH_BY_PATH_CHILD_PROCESS,
} = require('./../constants/child_process_db_constants');

const {
    getModulesNamesQueryWrappers,
    getModulesVersionsQueryWrappers,
    getModulesLocationsQueryWrappers,
    getModulesLocationConnectionsQueryWrappers,
    getPathsTraversedQueryWrappers,
} = require('./../helpers/db_helpers');

// effects implementation

// returns promise
const executeChildProcessTask = (dbType, dbConnection, taskType, data) => cond([
    [
        equals(INSERT_NEW_MODULE_NAME_CHILD_PROCESS),
        () => getModulesNamesQueryWrappers(dbType).insertNewModuleName(dbConnection, data.name, data.belongsToOrganization),
    ],
    [
        equals(SELECT_MODULE_CHILD_PROCESS_CHILD_PROCESS),
        () => getModulesNamesQueryWrappers(dbType).selectModule(dbConnection, data.usrName, data.belongsToOrganization),
    ],
    [
        equals(SELECT_INSERT_MODULE_NAME_CHILD_PROCESS),
        () => getModulesNamesQueryWrappers(dbType).selectInsertModuleName(dbConnection, data.name, data.belongsToOrganization),
    ],
    [
        equals(INSERT_NEW_MODULE_VERSION_CHILD_PROCESS),
        () => getModulesVersionsQueryWrappers(dbType).insertNewModuleVersion(dbConnection, data.moduleNameId, data.version),
    ],
    [
        equals(SELECT_MODULE_BY_NAME_ID_AND_VERSION_CHILD_PROCESS),
        () => getModulesVersionsQueryWrappers(dbType).selectModuleByNameIdAndVersion(dbConnection, data.moduleNameId, data.usrVersion),
    ],
    [
        equals(SELECT_INSERT_MODULE_VERSION_CHILD_PROCESS),
        () => getModulesVersionsQueryWrappers(dbType).selectInsertModuleVersion(dbConnection, data.moduleNameId, data.version),
    ],
    [
        equals(INSERT_NEW_MODULE_LOCATION_CHILD_PROCESS),
        () => getModulesLocationsQueryWrappers(dbType).insertNewModuleLocation(dbConnection, data.moduleNameId, data.moduleVersionId, data.path),
    ],
    [
        equals(SELECT_LOCATION_BY_PATH_CHILD_PROCESS),
        () => getModulesLocationsQueryWrappers(dbType).selectLocationByPath(dbConnection, data.usrPath),
    ],
    [
        equals(SELECT_LOCATION_BY_NAME_ID_AND_VERSION_CHILD_PROCESS),
        () => getModulesLocationsQueryWrappers(dbType).selectLocationByNameIdAndVersion(dbConnection, data.moduleNameId, data.moduleVersionId, data.usrPath),
    ],
    [
        equals(SELECT_INSERT_MODULE_LOCATION_CHILD_PROCESS),
        () => getModulesLocationsQueryWrappers(dbType).selectInsertModuleLocation(dbConnection, data.moduleNameId, data.moduleVersionId, data.path),
    ],
    [
        equals(INSERT_NEW_MODULE_LOCATION_CONNECTION_CHILD_PROCESS),
        () => getModulesLocationConnectionsQueryWrappers(dbType).insertNewModuleLocationConnection(dbConnection, data.moduleLocationId, data.moduleParentLocationId, data.usrType),
    ],
    [
        equals(INSERT_NEW_PATH_CHILD_PROCESS),
        () => getPathsTraversedQueryWrappers(dbType).insertNewPath(dbConnection, data.path),
    ],
    [
        equals(SELECT_TRAVERSED_PATH_BY_PATH_CHILD_PROCESS),
        () => getPathsTraversedQueryWrappers(dbType).selectTraversedPathByPath(dbConnection, data.usrPath),
    ],
    [
        stubTrue,
        () => Promise.reject(`Undefined task type: '${taskType}'`),
    ],
])(taskType);

// export
exports.executeChildProcessTask = executeChildProcessTask;