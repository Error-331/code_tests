'use strict';
//process.exit(35);

module.exports = async () => {
    console.log('NodeJS "globals" examples');
    console.log('=========================');
    console.log('');

    console.log('Global object variable - global');
    console.log('Current process data - global.process');
    console.log('Current process environment data - global.process.env');

    console.log('');

    console.log('Current process data (shortcut) - process');
    console.log('Current user name - process.env.USER');

    console.log('');

    console.log('Custom exit code - process.exit(35)');

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
};