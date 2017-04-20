'use strict';

import templateStrings from './fundamentals/strings/template_strings';
import symbols from './fundamentals/symbols';

import generators from './fundamentals/iterators/generators';

import objectsBase from './fundamentals/objects/base';
import reflection from './fundamentals/objects/reflection';

import combinators from './functional/combinators';
import compose from './functional/compose';
import basics from './functional/basics';
import functor from './functional/functor';
import monad from './functional/monad';
import transducers from './functional/transducers';
import lenses from './functional/lenses';

import promisesBase from './functional/promisses/base';
import promisesTasks from './functional/promisses/tasks';
import promisesUserCreated from './functional/promisses/user_created';

async function run() {
    // fundamentals
    //await templateStrings();
    //await symbols();

    // iterators
    await generators();

    // fundamentals (objects)
    //await objectsBase();
    //await reflection();

    // functional programming (base)
    //await combinators();
    //await compose();
    //await basics();
    //await functor();
    //await monad();
    //await transducers();
    //await lenses();

    // functional programming (promises)
    //await promisesBase();
    //await promisesTasks();
    //await promisesUserCreated();
    //await compose();
}

run();