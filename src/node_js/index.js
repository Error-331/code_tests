'use strict';

const globalsExamples = require('./fundamentals/globals');
const bufferExamples = require('./fundamentals/buffer');
const eventEmitters = require('./fundamentals/event_emitters');
const streams = require('./fundamentals/streams');
const crypto = require('./fundamentals/crypto');
const fileSystem = require('./fundamentals/file_system');

async function run() {
    // fundamentals
    await globalsExamples();
    //await bufferExamples();
    //await eventEmitters();
    //await streams();
    //await crypto();
    //await fileSystem();
}

run();