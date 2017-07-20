'use strict';

const eventEmitters = require('./fundamentals/event_emitters');
const streams = require('./fundamentals/streams');

async function run() {
    // fundamentals
    //await eventEmitters();
    await streams();
}

run();