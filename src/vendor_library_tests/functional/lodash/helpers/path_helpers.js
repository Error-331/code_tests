'use strict';

// external imports
const {sep, join} = require('path');
const {initial, curry} = require('lodash/fp');

// local imports

// helpers implementation
const joinTwoPaths = curry((path1, path2) => join(path1, path2));
const removeLastPathEntity = (path) => initial(path.split(sep)).join(sep);

// exports
exports.joinTwoPaths = joinTwoPaths;
exports.removeLastPathEntity = removeLastPathEntity;