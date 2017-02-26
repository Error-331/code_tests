'use strict';

import symbols from './fundamentals/symbols';

import combinators from './functional/combinators';
import compose from './functional/compose';
import basics from './functional/basics';
import transducers from './functional/transducers';
import promises from './functional/promises';
import lenses from './functional/lenses';

async function run() {
    // fundamentals
    await symbols();

    // functional programming
    await combinators();
    await compose();
    await basics();
    await transducers();
    await promises();
    await lenses();
}

run();