'use strict';

// external imports
const {readdirSync} = require('fs');
const {curry, map} = require('lodash/fp');

// local imports

// helpers implementation
const traverseDirectory = curry((mapCallback, rootDirPath) => {
    return map(
        mapCallback,
        readdirSync(rootDirPath),
    );
});

// export
exports.traverseDirectory = traverseDirectory;