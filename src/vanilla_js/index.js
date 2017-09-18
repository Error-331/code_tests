'use strict';

import numbers from './fundamentals/numbers';
import numberStringOrder from './fundamentals/operators/number_string_order';

import hoistingGeneral from './fundamentals/hoisting/hoisting_general';
import modules from './fundamentals/modules';

import templateStrings from './fundamentals/strings/template_strings';
import regexp from './fundamentals/strings/regexp';

import symbols from './fundamentals/symbols';
import builtInFunctions from './fundamentals/built_in_functions';

import generators from './fundamentals/iterators/generators';

//import objectsBase from './fundamentals/objects/base';
import checkIfPropertyExist from './fundamentals/objects/check_if_property_exist';
import reflection from './fundamentals/objects/reflection';

import combinators from './functional/combinators';
import compose from './functional/compose';
import basics from './functional/basics';
import functor from './functional/functor';
//import monad from './functional/monad';
import transducers from './functional/transducers';
import lenses from './functional/lenses';

import functionFactories from './functional/fundamentals/function_factories';
import partialApplication from './functional/fundamentals/partial_application';
import currying from './functional/fundamentals/currying';

import promisesBase from './functional/promisses/base';
import promisesTasks from './functional/promisses/tasks';
import promisesUserCreated from './functional/promisses/user_created';

async function run() {
    // fundamentals
    //await numbers();
   // await numberStringOrder();

    //await hoistingGeneral();
    //await modules();

    // strings
    //await templateStrings();
    //await regexp();

    //await symbols();
    //await builtInFunctions();

    // iterators
    await generators();

    // fundamentals (objects)
    //await objectsBase();
    //await checkIfPropertyExist();
    //await reflection();

    // functional programming (base)
    //await combinators();
    //await compose();
    //await basics();
    //await functor();
    //await monad();
    //await transducers();
    //await lenses();

    // functional programming (fundamentals)
    //await functionFactories();
    //await partialApplication();
    //await currying();

    // functional programming (promises)
    //await promisesBase();
    //await promisesTasks();
    //await promisesUserCreated();
    //await compose();
}

run();