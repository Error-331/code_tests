// external imports
const {basename} = require('path');
const {constants, statSync, accessSync} = require('fs');

const {eq, complement, curry, contains} = require('lodash/fp');

// local imports
const {DIRECTORIES_TO_EXCLUDE} = require('./../constants/exclusion_constants');
console.log(constants.R_OK);
// helpers implementation

/**
 * Checks whether provided value belongs to exclusions list.
 *
 */

const isExclusion = curry((exclusions, value) => contains(value, exclusions));

const isNotExclusion =  curry((exclusions, value) => !contains(value, exclusions));

/**
 * Checks whether directory belongs to exclusion list.
 *
 */

const isExclusionDirPath = path => isExclusion(DIRECTORIES_TO_EXCLUDE, basename(path));

const isNPMOrganizationDir = dirName => dirName[0] === '@';

const isNoneNPMOrganizationDir = complement(isNPMOrganizationDir);

const isEntityHasAccess = curry((accessType, entity) => {
    try {
        accessSync(entity, accessType);
        return true;
    } catch(error) {
        return false;
    }
});

const isEntityExists = isEntityHasAccess(constants.F_OK);

const isEntityReadable = isEntityHasAccess(constants.R_OK);

const isEntityNotExists = complement(isEntityExists);

const isEntityNotReadable = complement(isEntityReadable);

const isDirectory = path => statSync(path).isDirectory();

const isNotDirectory = path => eq(false, isDirectory(path));

// export
exports.isExclusion = isExclusion;
exports.isNotExclusion = isNotExclusion;

exports.isExclusionDirPath = isExclusionDirPath;
exports.isNPMOrganizationDir = isNPMOrganizationDir;
exports.isNoneNPMOrganizationDir = isNoneNPMOrganizationDir;

exports.isEntityHasAccess = isEntityHasAccess;
exports.isEntityExists = isEntityExists;
exports.isEntityNotExists = isEntityNotExists;
exports.isEntityNotReadable = isEntityNotReadable;
exports.isDirectory = isDirectory;
exports.isNotDirectory = isNotDirectory;