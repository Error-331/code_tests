'use strict';

// external imports

// local imports

// constants definition
const SEMVER_OPERATOR_REG_EXP = RegExp('^\\>|\\<|\\=|\\~|\\^|\\*');
const SEMVER_VERSION_REG_EXP = RegExp('^[0-9]');
const SEMVER_OPERATOR_AND_VERSION_REG_EXP = RegExp('^(\\>|\\<|\\=|\\~|\\^|\\*)+(\\ )*[0-9]');

// export
exports.SEMVER_OPERATOR_REG_EXP = SEMVER_OPERATOR_REG_EXP;
exports.SEMVER_VERSION_REG_EXP = SEMVER_VERSION_REG_EXP;
exports.SEMVER_OPERATOR_AND_VERSION_REG_EXP = SEMVER_OPERATOR_AND_VERSION_REG_EXP;