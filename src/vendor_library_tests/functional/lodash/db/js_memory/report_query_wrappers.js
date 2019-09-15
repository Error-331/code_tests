'use strict';

// external imports
const {isNil, equals, stabTrue, constant, spread, over, pipe, difference, filter, cond, some, path, pathOr} = require('lodash/fp');

// local imports
const {convertMapKeysToArray, convertMapDataToArray} = require('./../../helpers/map_helpers');

// query wrappers implementation
const selectChildModulesFullData = (dbConnection) => {
    const {modulesNamesMap, modulesVersionsMap, modulesLocationsMap, modulesLocationConnectionsMap} = dbConnection;
    const resultData = [];

    for (let modulesLocationConnectionRow of modulesLocationConnectionsMap) {
        const moduleLocationConnectionData = modulesLocationConnectionRow[1];

        const moduleLocationId = moduleLocationConnectionData.module_location_id;
        const moduleLocationData = modulesLocationsMap.get(moduleLocationId.toString());

        const locationModuleNameId = moduleLocationData.module_name_id.toString();
        const locationModuleVersionId = moduleLocationData.module_version_id.toString();

        if (!modulesNamesMap.get(locationModuleNameId) || !modulesVersionsMap.get(locationModuleVersionId)) {
            continue;
        }

        const moduleNameData = modulesNamesMap.get(locationModuleNameId);
        const moduleVersionData = modulesVersionsMap.get(locationModuleVersionId);

        if (moduleVersionData.module_name_id !== moduleNameData.id) {
            continue;
        }

        const locationConnectionParentPathId = moduleLocationConnectionData.module_parent_location_id.toString();

        resultData.push({
            module_name_id: moduleNameData.id,
            module_version_id: moduleVersionData.id,
            module_location_id: moduleLocationId,
            module_parent_location_id: moduleLocationConnectionData.module_parent_location_id,
            name: moduleNameData.name,
            type: moduleLocationConnectionData.type,
            belongs_to_organization: moduleNameData.belongs_to_organization,
            version: moduleVersionData.version,
            parent_path: modulesLocationsMap.has(locationConnectionParentPathId) ? modulesLocationsMap.get(locationConnectionParentPathId).path : null,
            path: moduleLocationData.path,
        });
    }

    return Promise.resolve(resultData);
};

const selectRootModulesFullData = (dbConnection) => {
    const {modulesNamesMap, modulesVersionsMap, modulesLocationsMap, modulesLocationConnectionsMap} = dbConnection;

    const locationsIDs = convertMapKeysToArray(modulesLocationsMap);
    const connectionLocationsIDs = convertMapDataToArray(mapValue => mapValue.toString(), 'module_location_id', modulesLocationConnectionsMap);

    const parentLocationsIDs = difference(locationsIDs, connectionLocationsIDs);

    const resultData = [];

    for (let moduleLocationId of parentLocationsIDs) {
        const moduleLocationData = modulesLocationsMap.get(moduleLocationId);

        const locationModuleNameId = moduleLocationData.module_name_id.toString();
        const locationModuleVersionId = moduleLocationData.module_version_id.toString();

        if (!modulesNamesMap.get(locationModuleNameId) || !modulesVersionsMap.get(locationModuleVersionId)) {
            continue;
        }

        const moduleNameData = modulesNamesMap.get(locationModuleNameId);
        const moduleVersionData = modulesVersionsMap.get(locationModuleVersionId);

        if (moduleVersionData.module_name_id !== moduleNameData.id) {
            continue;
        }

        resultData.push({
            module_name_id: moduleNameData.id,
            module_version_id: moduleVersionData.id,
            module_location_id: moduleLocationId,
            name: moduleNameData.name,
            belongs_to_organization: moduleNameData.belongs_to_organization,
            version: moduleVersionData.version,
            path: moduleLocationData.path,
        });
    }

    return Promise.resolve(resultData);
};

const selectModulesFullData = (dbConnection) => {
    const {modulesNamesMap, modulesVersionsMap, modulesLocationsMap} = dbConnection;
    const resultData = [];

    for (let [moduleLocationId, moduleLocationData] of modulesLocationsMap) {
        moduleLocationId = parseInt(moduleLocationId);

        const locationModuleNameId = moduleLocationData.module_name_id.toString();
        const locationModuleVersionId = moduleLocationData.module_version_id.toString();

        if (!modulesNamesMap.get(locationModuleNameId) || !modulesVersionsMap.get(locationModuleVersionId)) {
            continue;
        }

        const moduleNameData = modulesNamesMap.get(locationModuleNameId);
        const moduleVersionData = modulesVersionsMap.get(locationModuleVersionId);

        if (moduleVersionData.module_name_id !== moduleNameData.id) {
            continue;
        }

        resultData.push({
            module_name_id: moduleNameData.id,
            module_version_id: moduleVersionData.id,
            module_location_id: moduleLocationId,
            name: moduleNameData.name,
            belongs_to_organization: moduleNameData.belongs_to_organization,
            version: moduleVersionData.version,
            path: moduleLocationData.path,
        });
    }

    return Promise.resolve(resultData);
};

const mapMapToArray = (callback, usrMap) => {
    const resultArray = [];

    for (let [mapKey, mapValue] of usrMap) {
        resultArray.push(callback(mapValue, mapKey))
    }

    return resultArray;
};

const getMapValue = (usrMap, key) => usrMap.get(key.toString());

const selectModulesFullDataByParentLocationId = (dbConnection) => {
    const {modulesNamesMap, modulesVersionsMap, modulesLocationsMap, modulesLocationConnectionsMap} = dbConnection;



    const c = pipe(
        spread(difference),

        filter(
            pipe(
                moduleLocationId => modulesLocationsMap.get(moduleLocationId),
                over([
                    pathOr(null, 'module_name_id'),
                    pathOr(null, 'module_version_id'),
                ]),

                ([locationModuleNameId, locationModuleVersionId]) => [
                    getMapValue(modulesNamesMap, locationModuleNameId),
                    getMapValue(modulesVersionsMap, locationModuleVersionId)
                ],

                cond([
                    [some(isNil), constant(false)],

                    [
                        ([moduleNameData, moduleVersionData]) => equals(path('id', moduleNameData), path('module_name_id', moduleVersionData)),
                        constant(true),
                    ],

                    [stabTrue, constant(false)],
                ]),

            )
        ),
    )([
        convertMapKeysToArray(modulesLocationsMap),
        convertMapDataToArray(mapValue => mapValue.toString(), 'module_location_id', modulesLocationConnectionsMap),
    ]);


    return Promise.resolve(c);
    /*map(
        pipe(
            parentModuleLocationId => modulesLocationsMap.get(parentModuleLocationId)
        ),

        difference(
            convertMapKeysToArray(modulesLocationsMap),
            convertMapDataToArray(mapValue => mapValue.toString(), 'module_location_id', modulesLocationConnectionsMap)
        )
    )*/
};

// export
exports.selectModulesFullData = selectModulesFullData;
exports.selectRootModulesFullData = selectRootModulesFullData;
exports.selectChildModulesFullData = selectChildModulesFullData;
exports.selectModulesFullDataByParentLocationId = selectModulesFullDataByParentLocationId;