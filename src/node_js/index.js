"use strict";

const bufferExamples = require('./fundamentals/buffer');
const eventEmitters = require('./fundamentals/event_emitters');
const streams = require('./fundamentals/streams');
const crypto = require('./fundamentals/crypto');

async function run() {
    // fundamentals
    await bufferExamples();
    //await eventEmitters();
    //await streams();
    //await crypto();
}

run();