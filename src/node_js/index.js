'use strict';

const eventEmitters = require('./fundamentals/event_emitters');
const streams = require('./fundamentals/streams');
const crypto = require('./fundamentals/crypto');

async function run() {
    // fundamentals
    //await eventEmitters();
    await streams();
    //await crypto();
}

run();