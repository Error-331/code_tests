'use strict';

import combinators from './functional/combinators';
import compose from './functional/compose';
import basics from './functional/basics';

async function run() {

    // functional programming
    await combinators();
    await compose();
    await basics();
}

run();