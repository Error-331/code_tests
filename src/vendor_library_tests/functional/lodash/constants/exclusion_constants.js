'use strict';

// external imports
const {concat} = require('lodash/fp');

// local imports

// constants definition
const SPECIAL_DIRECTORY_NAMES = ['.', '..'];
const SPECIFIC_DIRECTORIES_TO_EXCLUDE = ['.bin', '@babel'];

const DIRECTORIES_TO_EXCLUDE = concat(SPECIAL_DIRECTORY_NAMES, SPECIFIC_DIRECTORIES_TO_EXCLUDE);