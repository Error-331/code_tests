'use strict';

import BrightSignScheduler from './brightsign/scheduler';
import BrightSignLocality from './brightsign/locality';

async function run() {
    // brightsign
    //await BrightSignScheduler();
    await BrightSignLocality();
}

run();