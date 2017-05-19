'use strict';

// TODO: --noEmitHelpers , tslib, --importHelpers - if needed
import basicTypes from './basic_types';
import interfaces from './interfaces';
//import classes from './classes';
import functions from './functions';
//import rest_spread from './rest_spread';
//import async_await from './async_await';

async function run() {
    await basicTypes();
    //await interfaces();
    //await classes();
    //await functions();
    //await rest_spread();
    //await async_await();
}

run();