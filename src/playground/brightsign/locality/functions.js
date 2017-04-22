'use strict';

import {isObject, chain, sortBy, reduce, findIndex, reverse} from 'lodash';

export const extractLocationPathParams = (localityData) => {
    let locationPath = isObject(localityData) ? localityData.locationPath : localityData;
    return locationPath.split('/').filter(value => value != '');
};

export const sortSelectedLocalities = (selectedLocalities) => {
    return sortBy(selectedLocalities, (localityName) => {return localityName.length;});
};

export const filterDevicesByLocality = (selectedLocalities, deviceData) => {
    const selectedLocalitiesCount = selectedLocalities.length;

    for (let localityCounter1 = 0; localityCounter1 < selectedLocalitiesCount; localityCounter1++) {
        let locationPath = selectedLocalities[localityCounter1];

        if (deviceData.locationPath.indexOf(locationPath) === 0) {
            return true;
        }
    }

    return false;
};

export const groupDevicesByLocality = (deviceGroups, deviceData) => {
    const locationPathParams = extractLocationPathParams(deviceData);
    const locationPathParamsCount = locationPathParams.length;

    let currentDeviceGroup = deviceGroups;
    let currentDeviceGroupDevices = [];
    let currentLocationPathParams = [];

    for (let locationPathParamsCounter1 = 0; locationPathParamsCounter1 < locationPathParamsCount; locationPathParamsCounter1++) {
        const currentPathParam = locationPathParams[locationPathParamsCounter1];
        currentLocationPathParams.push(currentPathParam);

        const currentPathParamsCombination = `/${currentLocationPathParams.join('/')}/`;
        const groupIndex = findIndex(currentDeviceGroup, (deviceGroup) => {return deviceGroup.localityPath === currentPathParamsCombination});

        if (groupIndex === -1) {
            currentDeviceGroup.push({
                localityPath: currentPathParamsCombination,
                localities: [],
                devices: []
            });

            currentDeviceGroupDevices = currentDeviceGroup[currentDeviceGroup.length - 1].devices;
            currentDeviceGroup = currentDeviceGroup[currentDeviceGroup.length - 1].localities;
        } else {
            currentDeviceGroupDevices = currentDeviceGroup[groupIndex].devices;
            currentDeviceGroup = currentDeviceGroup[groupIndex].localities;
        }
    }

    currentDeviceGroupDevices.push(deviceData);
    return deviceGroups
};

export const sortDeviceGroups = (deviceGroup, orderASC = true) => {
    let functionsChain = deviceGroup.localities = chain(deviceGroup.localities).sortBy(deviceGroup => sortDeviceGroups(deviceGroup, orderASC));
    functionsChain = orderASC ? functionsChain : functionsChain.reverse();

    deviceGroup.localities = functionsChain.value();
    return deviceGroup.localityPath.split('/').join('');
};

export const prepareDeviceGroups = (devicesData, selectedLocalities, orderASC = true) => {
    let functionsChain = chain(devicesData).filter(deviceData => filterDevicesByLocality(selectedLocalities, deviceData))
                            .reduce(groupDevicesByLocality, [])
                            .sortBy(deviceGroup => sortDeviceGroups(deviceGroup, orderASC));

    functionsChain = orderASC ? functionsChain : functionsChain.reverse();
    return functionsChain.value();
};