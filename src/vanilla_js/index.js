'use strict';

import templateStrings from './fundamentals/strings/template_strings'
import symbols from './fundamentals/symbols';

import objectsBase from './fundamentals/objects/base';

import combinators from './functional/combinators';
import compose from './functional/compose';
import basics from './functional/basics';
import transducers from './functional/transducers';
import lenses from './functional/lenses';

import promisesBase from './functional/promisses/base';
import promisesTasks from './functional/promisses/tasks';

async function run() {
    // fundamentals
    await templateStrings();
    await symbols();

    // fundamentals (objects)
    await objectsBase();

    // functional programming (base)
    await combinators();
    await compose();
    await basics();
    await transducers();
    await lenses();

    // functional programming (promises)
    await promisesBase();
    await promisesTasks();
}

run();