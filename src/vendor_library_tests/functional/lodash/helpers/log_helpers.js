'use strict';

// external imports
const {bgWhite, gray} = require('chalk');
const {pipe} = require('lodash/fp');

// local imports

// helpers implementation
const textGrayOnWhite = pipe(gray, bgWhite);

// export
exports.textGrayOnWhite = textGrayOnWhite;