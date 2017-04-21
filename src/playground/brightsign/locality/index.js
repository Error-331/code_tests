'use strict';

import {isObject, chain, sortBy, reduce, findIndex} from 'lodash';

export default async () => {
    console.log('BrightSign locality problem');
    console.log('===========================');
    console.log('');

    const selectedLocalities1 = sortBy(["/US/CO/Arapahoe County/", "/US/GA/", "/US/TX/Harris County/", "/US/CA/"], (localityName) => {return localityName.length;});
    let selectedLocalities = selectedLocalities1;

    const currentDevices = [
        {id: 1, name: "device 1", locationPath: "/CA/"},
        {id: 2, name: "device 2", locationPath: "/US/GA/Muscogee County/Columbus/"},
        {id: 3, name: "device 3", locationPath: "/US/CA/Los Angeles County/"},
        {id: 4, name: "device 4", locationPath: "/US/CA/San Mateo County/"},
        {id: 5, name: "device 5", locationPath: "/US/CO/Arapahoe County/Greenwood Village/"},
        {id: 6, name: "device 6", locationPath: "/US/TX/"},
        {id: 7, name: "device 7", locationPath: "/US/CO/Boulder County/"},
        {id: 8, name: "device 8", locationPath: "/US/MA/Suffolk County/"},
        {id: 9, name: "device 9", locationPath: "/US/MA/Suffolk County/Chelsea/"},
        {id: 10, name: "device 10", locationPath: "/US/NH/Hillsborough County/"},
        {id: 11, name: "device 11", locationPath: "/US/NH/Hillsborough County/Manchester/"},
        {id: 12, name: "device 12", locationPath: "/US/CA/"},
        {id: 13, name: "device 13", locationPath: "/US/GA/"},
    ];

    const extractLocationPathParams = (localityData) => {
        let locationPath = isObject(localityData) ? localityData.locationPath : localityData;
        return locationPath.split('/').filter(value => value != '');
    };

    const deviceLocalityFilter = (deviceData) => {
        const selectedLocalitiesCount = selectedLocalities.length;

        for (let localityCounter1 = 0; localityCounter1 < selectedLocalitiesCount; localityCounter1++) {
            let locationPath = selectedLocalities[localityCounter1];

            if (deviceData.locationPath.indexOf(locationPath) === 0) {
                return true;
            }
        }

        return false;
    };

    const groupDevicesByLocality1 = (deviceGroups, deviceData) => {
        const locationPathParams = extractLocationPathParams(deviceData);
        const locationPathParamsCount = locationPathParams.length;

        let currentDeviceGroup = deviceGroups.localities;
        let currentDeviceGroupDevices = [];
        let currentLocationPathParams = [];

        for (let locationPathParamsCounter1 = 0; locationPathParamsCounter1 < locationPathParamsCount; locationPathParamsCounter1++) {
            let currentPathParam = locationPathParams[locationPathParamsCounter1];
            currentLocationPathParams.push(currentPathParam);

            let currentPathParamsCombination = `/${currentLocationPathParams.join('/')}/`;

            if (!currentDeviceGroup[currentPathParamsCombination]) {
                currentDeviceGroup[currentPathParamsCombination] = {
                    localities: {},
                    devices: []
                }
            }

            currentDeviceGroupDevices = currentDeviceGroup[currentPathParamsCombination].devices;
            currentDeviceGroup = currentDeviceGroup[currentPathParamsCombination].localities;
        }

        currentDeviceGroupDevices.push(deviceData);
        return deviceGroups
    };

    const groupDevicesByLocality = (deviceGroups, deviceData) => {
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

                currentDeviceGroup = currentDeviceGroup[currentDeviceGroup.length - 1].devices;
            } else {
                currentDeviceGroup = currentDeviceGroup[groupIndex].devices;
            }


           // currentDeviceGroupDevices = currentDeviceGroup[currentPathParamsCombination].devices;
          //  currentDeviceGroup = currentDeviceGroup[currentPathParamsCombination].localities;
        }

        //currentDeviceGroupDevices.push(deviceData);
        return deviceGroups
    };

    const sortDevicesByLocation = (deviceData) => {
        return deviceData.locationPath.split('/').join('');
    };

    const sortDeviceGroups = (deviceGroup) => {
        console.log(deviceGroup);
        return deviceGroup;
    };

    let filteredDeviceGroups = chain(currentDevices).filter(deviceLocalityFilter).reduce(groupDevicesByLocality, []).value();



    console.log('fil:', JSON.stringify(filteredDeviceGroups));



    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}

/*


 0(pin): "/CA/"
 1(pin): "/US/CA/"
 2(pin): "/US/CO/"
 3(pin): "/US/CT/"
 4(pin): "/US/DE/"
 5(pin): "/US/FL/"
 6(pin): "/US/GA/"
 7(pin): "/US/IL/"
 8(pin): "/US/IN/"
 9(pin): "/US/KS/"
 10(pin): "/US/MA/"
 11(pin): "/US/MD/"
 12(pin): "/US/MO/"
 13(pin): "/US/NC/"
 14(pin): "/US/NH/"
 15(pin): "/US/NJ/"
 16(pin): "/US/NY/"
 17(pin): "/US/OH/"
 18(pin): "/US/OK/"
 19(pin): "/US/PA/"
 20(pin): "/US/SC/"
 21(pin): "/US/TN/"
 22(pin): "/US/TX/"
 23(pin): "/US/VA/"
 24(pin): "/US/VT/"
 25(pin): "/US/WA/"
 26(pin): "/US/CO/Arapahoe County/"
 27(pin): "/US/CO/Arapahoe County/Greenwood Village/"
 28(pin): "/US/CT/Hartford County/"
 29(pin): "/US/CT/Hartford County/Newington/"
 30(pin): "/US/DE/New Castle County/"
 31(pin): "/US/DE/New Castle County/Middletown/"
 32(pin): "/US/GA/Muscogee County/"
 33(pin): "/US/GA/Muscogee County/Columbus/"
 34(pin): "/US/IL/Cook County/"
 35(pin): "/US/IL/Cook County/Chicago/"
 36(pin): "/US/IN/Vanderburgh County/"
 37(pin): "/US/IN/Vanderburgh County/Evansville/"
 38(pin): "/US/MA/Suffolk County/"
 39(pin): "/US/MA/Suffolk County/Chelsea/"
 40(pin): "/US/NH/Hillsborough County/"
 41(pin): "/US/NH/Hillsborough County/Manchester/"
 42(pin): "/US/OH/Franklin County/"
 43(pin): "/US/OH/Franklin County/Columbus/"
 44(pin): "/US/SC/Richland County/"
 45(pin): "/US/SC/Richland County/Columbia/"
 46(pin): "/US/TX/Harris County/"
 47(pin): "/US/TX/Harris County/Spring/"
 48(pin): "/US/VT/Bennington County/"
 49(pin): "/US/"


 */