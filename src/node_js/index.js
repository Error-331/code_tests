'use strict';

const eventEmitters = require('./fundamentals/event_emitters');

async function run() {
    // fundamentals
    await eventEmitters();
}

run();