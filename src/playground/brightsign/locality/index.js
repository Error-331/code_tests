'use strict';

import {sortSelectedLocalities, prepareDeviceGroups} from './functions';

import devicesData1 from './test_data/devices_data1.json';

export default async () => {
    console.log('BrightSign locality problem');
    console.log('===========================');
    console.log('');

    const selectedLocalities1 = sortSelectedLocalities(["/US/CO/Arapahoe County/", "/US/GA/", "/US/TX/Harris County/", "/US/CA/", "/CA/"]);
    let filteredDeviceGroups = prepareDeviceGroups(devicesData1, selectedLocalities1, false);

    console.log('fil:', JSON.stringify(filteredDeviceGroups));


    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}