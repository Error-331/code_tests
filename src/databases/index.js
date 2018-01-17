'use strict';

const neDB = require('./ne_db');
const mongoDB = require('./mongo_db');
const mongoose = require('./mongoose');
const redis = require('./redis');

async function run() {
    // NeDB
    //await neDB();
    //await mongoDB();
    //await mongoose();
    await redis();
}

run();