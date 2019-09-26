'use strict';

// external imports
const {pipe, map, filter, includes, toLower, replace} = require('lodash/fp');

// local imports

// helpers implementation
const extractFileBasedPackagesPaths = pipe(
    filter(
        pipe(toLower, includes('file:'))
    ),
    map(replace('file:', ''))
);

// export
exports.extractFileBasedPackagesPaths = extractFileBasedPackagesPaths;