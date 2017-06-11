'use strict';

import moment from './date/moment';

import fluture from './functional/fluture';
import lodash from './functional/lodash';
import ramda from './functional/ramda';

async function run() {
    // date libraries
    await moment();

    // functional libraries
    //await fluture();
    //await lodash();
    //await ramda();
}

run();