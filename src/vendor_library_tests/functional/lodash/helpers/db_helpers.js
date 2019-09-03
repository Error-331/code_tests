'use strict';

// external imports
const {isEqual, constant, cond} = require('lodash/fp');

// local imports
const {JS_MEMORY_DB_TYPE, SQLITE_DB_TYPE} = require('./../constants/app_constants');

const jsMemoryDBEffects = require('./../effects/js_memory_db_effects');
const sqliteDBEffects = require('./../effects/sqlite_db_effects');

const jsMemoryModulesNamesQueryWrappers = require('./../db/js_memory/modules_names_query_wrappers');
const jsMemoryModulesVersionsQueryWrappers = require('./../db/js_memory/modules_versions_query_wrappers');
const jsMemoryModulesLocationsQueryWrappers = require('./../db/js_memory/modules_locations_query_wrappers');
const jsMemoryModulesLocationConnectionsQueryWrappers = require('../db/js_memory/modules_location_connections_query_wrappers');
const jsMemoryPathsTraversedQueryWrappers = require('./../db/js_memory/paths_traversed_query_wrappers');

const sqliteModulesNamesQueryWrappers = require('./../db/sqlite/modules_names_query_wrappers');
const sqliteModulesVersionsQueryWrappers = require('./../db/sqlite/modules_versions_query_wrappers');
const sqliteModulesLocationsQueryWrappers = require('./../db/sqlite/modules_locations_query_wrappers');
const sqliteModulesLocationConnectionsQueryWrappers = require('../db/sqlite/modules_location_connections_query_wrappers');
const sqlitePathsTraversedQueryWrappers = require('./../db/sqlite/paths_traversed_query_wrappers');

// helpers implementation
const getDBEffects = cond([
    [isEqual(JS_MEMORY_DB_TYPE), constant(jsMemoryDBEffects)],
    [isEqual(SQLITE_DB_TYPE), constant(sqliteDBEffects)],
]);

const getModulesNamesQueryWrappers = cond([
    [isEqual(JS_MEMORY_DB_TYPE), constant(jsMemoryModulesNamesQueryWrappers)],
    [isEqual(SQLITE_DB_TYPE), constant(sqliteModulesNamesQueryWrappers)],
]);

const getModulesVersionsQueryWrappers = cond([
    [isEqual(JS_MEMORY_DB_TYPE), constant(jsMemoryModulesVersionsQueryWrappers)],
    [isEqual(SQLITE_DB_TYPE), constant(sqliteModulesVersionsQueryWrappers)],
]);

const getModulesLocationsQueryWrappers = cond([
    [isEqual(JS_MEMORY_DB_TYPE), constant(jsMemoryModulesLocationsQueryWrappers)],
    [isEqual(SQLITE_DB_TYPE), constant(sqliteModulesLocationsQueryWrappers)],
]);

const getModulesLocationConnectionsQueryWrappers = cond([
    [isEqual(JS_MEMORY_DB_TYPE), constant(jsMemoryModulesLocationConnectionsQueryWrappers)],
    [isEqual(SQLITE_DB_TYPE), constant(sqliteModulesLocationConnectionsQueryWrappers)],
]);

const getPathsTraversedQueryWrappers = cond([
    [isEqual(JS_MEMORY_DB_TYPE), constant(jsMemoryPathsTraversedQueryWrappers)],
    [isEqual(SQLITE_DB_TYPE), constant(sqlitePathsTraversedQueryWrappers)],
]);

// export
exports.getDBEffects = getDBEffects;

exports.getModulesNamesQueryWrappers = getModulesNamesQueryWrappers;
exports.getModulesVersionsQueryWrappers = getModulesVersionsQueryWrappers;
exports.getModulesLocationsQueryWrappers = getModulesLocationsQueryWrappers;
exports.getModulesLocationConnectionsQueryWrappers = getModulesLocationConnectionsQueryWrappers;
exports.getPathsTraversedQueryWrappers = getPathsTraversedQueryWrappers;