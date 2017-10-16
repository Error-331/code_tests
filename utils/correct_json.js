'use strict';

const jsonfile = require('jsonfile');

// local imports
const hapiServerConfig = require('./test.json');

const test1JSON = hapiServerConfig.reduce((countries, countryItem, index) => {
    countryItem.id = index
    countries[index] = countryItem;
    return countries;
}, {});

jsonfile.writeFileSync('./test1.json', test1JSON, {spaces: 2});