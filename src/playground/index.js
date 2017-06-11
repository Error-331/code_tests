'use strict';

import BrightSignScheduler from './brightsign/scheduler';
import BrightSignLocality from './brightsign/locality';
import BrightSignDeviceFilterSort from './brightsign/devices_filter_sort';

async function run() {
    // brightsign
    await BrightSignScheduler();
    //await BrightSignLocality();
    //await BrightSignDeviceFilterSort();
}

run();