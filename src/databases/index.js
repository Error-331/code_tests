'use strict';

const neDB = require('./ne_db');
const mongoDB = require('./mongo_db');

async function run() {
    // NeDB
    //await neDB();
    await mongoDB();
}

run();