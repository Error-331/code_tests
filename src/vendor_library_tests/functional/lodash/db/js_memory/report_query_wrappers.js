'use strict';

// external imports
const {difference} = require('lodash/fp');

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



// export
exports.selectModulesFullData = selectModulesFullData;
exports.selectRootModulesFullData = selectRootModulesFullData;
exports.selectChildModulesFullData = selectChildModulesFullData;