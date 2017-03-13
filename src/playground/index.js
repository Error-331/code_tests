'use strict';

import BrightSignScheduler from './brightsign/scheduler';

async function run() {
    // brightsign
    await BrightSignScheduler();
}

run();