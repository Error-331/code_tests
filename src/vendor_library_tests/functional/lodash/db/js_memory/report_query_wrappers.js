'use strict';

// external imports
const {isNil, equals, stubTrue, stubFalse, identity, curry, over, pipe, difference, filter, map, cond, some, path, pathOr} = require('lodash/fp');

// local imports
const {convertMapKeysToArray, convertMapDataToArrayByField, mapMapToArray, getMapValue} = require('./../../helpers/map_helpers');

// query wrappers implementation
const composeObjectDataByLocationId = curry((dbConnection, locationId) => {
    const {modulesNamesMap, modulesVersionsMap, modulesLocationsMap} = dbConnection;

    return pipe(
        getMapValue(modulesLocationsMap),
        over([
            pipe(path('module_name_id'), getMapValue(modulesNamesMap)),
            pipe(path('module_version_id'), getMapValue(modulesVersionsMap)),
            identity,
        ]),

        ([moduleNameData, moduleVersionData, moduleLocationData]) => ({
            module_name_id: moduleNameData.id,
            module_version_id: moduleVersionData.id,
            module_location_id: moduleLocationData.id,
            name: moduleNameData.name,
            belongs_to_organization: moduleNameData.belongs_to_organization,
            version: moduleVersionData.version,
            path: moduleLocationData.path,
        })
    )(locationId);
});


const filterModulesByLocationIDs = (dbConnection, preFilter, postFilter, locationIDs) => {
    const {modulesNamesMap, modulesVersionsMap, modulesLocationsMap} = dbConnection;

    return filter(
        pipe(
            preFilter,
            moduleLocationId => getMapValue(modulesLocationsMap, moduleLocationId),
            over([
                pathOr(null, 'module_name_id'),
                pathOr(null, 'module_version_id'),
            ]),

            ([locationModuleNameId, locationModuleVersionId]) => [
                getMapValue(modulesNamesMap, locationModuleNameId),
                getMapValue(modulesVersionsMap, locationModuleVersionId)
            ],

            cond([
                [some(isNil), stubFalse],

                [
                    ([moduleNameData, moduleVersionData]) => equals(path('id', moduleNameData), path('module_name_id', moduleVersionData)),
                    identity,
                ],

                [stubTrue, stubFalse],
            ]),
            postFilter,
        ),
        locationIDs
    );
};

const filterLevel1Modules = (dbConnection, usrFilter) => {
    const {modulesLocationConnectionsMap} = dbConnection;

    return filterModulesByLocationIDs(
        dbConnection,
        identity,
        usrFilter,
        pipe(
            mapMapToArray(identity),
            filter(({depth}) => equals(depth, 1)),
            map(path('module_location_id')),
        )(modulesLocationConnectionsMap)
    );
};

const filterRootModules = (dbConnection, usrFilter) => {
    const {modulesLocationsMap, modulesLocationConnectionsMap} = dbConnection;

    return filterModulesByLocationIDs(
        dbConnection,
        identity,
        usrFilter,
        difference(
            convertMapKeysToArray(modulesLocationsMap),
            convertMapDataToArrayByField(mapValue => mapValue.toString(), 'module_location_id', modulesLocationConnectionsMap),
        )
    );
};

const filterChildModules = (dbConnection, usrFilter) => {
    const {modulesLocationConnectionsMap} = dbConnection;

    return filterModulesByLocationIDs(
        dbConnection,
        identity,
        usrFilter,
        mapMapToArray(path('module_location_id'), modulesLocationConnectionsMap)
    );
};

const filterAllModules = (dbConnection, usrFilter) => {
    const {modulesLocationsMap} = dbConnection;

    return filterModulesByLocationIDs(
        dbConnection,
        identity,
        usrFilter,
        mapMapToArray(path('id'), modulesLocationsMap)
    );
};

const selectLevel1ModulesFullData = (dbConnection) => {
    const parentModules = map(
        composeObjectDataByLocationId(dbConnection),
        filterLevel1Modules(dbConnection, identity)
    );

    return Promise.resolve(parentModules);

};

const selectRootModulesFullData = (dbConnection) => {
    const parentModules = map(
        composeObjectDataByLocationId(dbConnection),
        filterRootModules(dbConnection, identity)
    );

    return Promise.resolve(parentModules);
};

const selectChildModulesFullData = (dbConnection) => {
    const parentModules = map(
        composeObjectDataByLocationId(dbConnection),
        filterChildModules(dbConnection, identity)
    );

    return Promise.resolve(parentModules);
};

const selectAllModulesFullData = (dbConnection) => {
    const parentModules = map(
        composeObjectDataByLocationId(dbConnection),
        filterAllModules(dbConnection, identity)
    );

    return Promise.resolve(parentModules);
};

const selectModulesFullDataByParentLocationId = (dbConnection, parentLocationId) => {
    const parentLocationIdFilter = pipe(([moduleNameData]) => moduleNameData.id, equals(parentLocationId));

    const parentModules = map(
        composeObjectDataByLocationId(dbConnection),
        filterRootModules(dbConnection, parentLocationIdFilter)
    );

    return Promise.resolve(parentModules);
};

// export
exports.selectModulesFullDataByParentLocationId = selectModulesFullDataByParentLocationId;
exports.selectLevel1ModulesFullData = selectLevel1ModulesFullData;
exports.selectRootModulesFullData = selectRootModulesFullData;
exports.selectChildModulesFullData = selectChildModulesFullData;
exports.selectAllModulesFullData = selectAllModulesFullData;