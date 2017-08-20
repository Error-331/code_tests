'use strict';

const neDB = require('./ne_db');
const mongoDB = require('./mongo_db');
const mongoose = require('./mongoose');

async function run() {
    // NeDB
    //await neDB();
    //await mongoDB();
    await mongoose();
}

run();