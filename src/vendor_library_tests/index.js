'use strict';

//import moment from './date/moment';

import sanctuary from './functional/sanctuary';
import fluture from './functional/fluture';
import lodash from './functional/lodash';
//import ramda from './functional/ramda';
import crocks from './functional/crocks';
import mori from './functional/mori';

import flutureSanctuary from './functional/fluture_sanctuary';

import rxjs from './other/rxjs';

async function run() {
    // date libraries
    //await moment();

    // functional libraries
    //await sanctuary();
    //await fluture();
    //await lodash();
    //await ramda();
    //await crocks();
   // await mori();
    await rxjs();

    // functional libraries combinations
    //await flutureSanctuary();
}

run();
