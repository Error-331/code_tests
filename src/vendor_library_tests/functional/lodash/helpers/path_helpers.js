'use strict';

// external imports
const {sep, join} = require('path');
const {initial, curry} = require('lodash/fp');

// local imports

// helpers implementation
const joinTwoPaths = curry((path1, path2) => join(path1, path2));
const addNodeModulesDir = path => joinTwoPaths(path, '/node_modules');
const removeLastPathEntity = path => initial(path.split(sep)).join(sep);

// exports
exports.joinTwoPaths = joinTwoPaths;
exports.addNodeModulesDir = addNodeModulesDir;
exports.removeLastPathEntity = removeLastPathEntity;