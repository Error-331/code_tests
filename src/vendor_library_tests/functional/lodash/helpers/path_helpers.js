'use strict';

// external imports
const {join} = require('path');
const {curry} = require('lodash/fp');

// local imports

// helpers implementation
const joinTwoPaths = curry((path1, path2) => join(path1, path2));

// exports
exports.joinTwoPaths = joinTwoPaths;