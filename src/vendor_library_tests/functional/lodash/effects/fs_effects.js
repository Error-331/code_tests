'use strict';

// external imports
const {curry} = require('lodash/fp');

// local imports
const {joinTwoPaths} = require('./../helpers/path_helpers');

// effects implementation
const readPackageJSON = curry((packageJSONDir) => {
    const pathToPackageJSON = joinTwoPaths(packageJSONDir, 'package.json');
    return require(pathToPackageJSON);
});

// export
exports.readPackageJSON = readPackageJSON;
