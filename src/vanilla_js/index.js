'use strict';

import combinators from './functional/combinators';
import compose from './functional/compose';

async function run() {

    // functional programming
    await combinators();
    await compose();
}

run();