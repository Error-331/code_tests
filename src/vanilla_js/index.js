'use strict';

import numbers from './fundamentals/numbers';
import bitwise from './fundamentals/operators/bitwise';
import numberStringOrder from './fundamentals/operators/number_string_order';
import classes from './fundamentals/classes';

import hoistingGeneral from './fundamentals/hoisting/hoisting_general';
import modules from './fundamentals/modules';

import templateStrings from './fundamentals/strings/template_strings';
import regexp from './fundamentals/strings/regexp';

import symbols from './fundamentals/symbols';
import builtInFunctions from './fundamentals/built_in_functions';

import generators from './fundamentals/iterators/generators';

import objectsBase from './fundamentals/objects/base';
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

import sagaPattern from './design_patterns/saga_pattern';

import apples from './interview_tasks/apples';
import bracketValidator from './interview_tasks/bracket_validator';
import fibonacci from './interview_tasks/fibonacci';
import findSpecificSumOfTwoInts from './interview_tasks/find_specific_sum_of_two_ints';
import findUniqueIntAmongDuplicates from './interview_tasks/find_unique_int_among_duplicates';
import highestProductThreeIntegers from './interview_tasks/highest_product_three_integers';
import matchingParens from './interview_tasks/matching_parens';
import productOfEveryIntegerExceptIndex from './interview_tasks/product_of_every_integer_except_index';
import weeksInHawaii from './interview_tasks/weeks_in_hawaii';
import passengerSeatsForFamiliesOfThree from './interview_tasks/passenger_seats_for_families_of_three';
import reversePolishNotation from './interview_tasks/reverse_polish_notation';

async function run() {
    // fundamentals
    //await numbers();
    //await bitwise();
    //await numberStringOrder();
    await classes();

    //await hoistingGeneral();
    //await modules();

    // strings
    //await templateStrings();
    //await regexp();

    //await symbols();
    //await builtInFunctions();

    // iterators
    //await generators();

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

    // design patterns
   // await sagaPattern();

    // interview tasks
    //await apples();
    //await bracketValidator();
    //await fibonacci();
    //await findSpecificSumOfTwoInts();
    //await findUniqueIntAmongDuplicates();
    //await highestProductThreeIntegers();
    //await matchingParens();
    //await productOfEveryIntegerExceptIndex();
    //await weeksInHawaii();
    //await passengerSeatsForFamiliesOfThree();
    //await reversePolishNotation();
}

run();