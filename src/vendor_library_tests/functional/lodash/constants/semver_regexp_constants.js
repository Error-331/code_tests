'use strict';

// external imports

// local imports

// constants definition
const SEMVER_SINGLE_DELIMETER_REG_EXP = RegExp('([^\\|])(\\|)([^\\|])', 'g');
const SEMVER_PRERELEASE_REG_EXP = RegExp('([0-9]|x|X|\\*)(\\ )*(\-)(\\ )*([A-Za-z])', 'g');
const SEMVER_OPERATOR_TO_VERSION_REG_EXP = RegExp('(\\<|\\>|\\<\\=|\\>\\=|\\=|\\~|\\^)(\\ )*(\\*|[0-9]|x|X)', 'g');


const SEMVER_OPERATOR_REG_EXP = RegExp('^\\>|\\<|\\=|\\~|\\^|\\*', 'g');
const SEMVER_VERSION_REG_EXP = RegExp('^[0-9]', 'g');
const SEMVER_OPERATOR_AND_VERSION_REG_EXP = RegExp('^(\\>|\\<|\\=|\\~|\\^|\\*)+(\\ )*[0-9]', 'g');

// export
exports.SEMVER_SINGLE_DELIMETER_REG_EXP = SEMVER_SINGLE_DELIMETER_REG_EXP;
exports.SEMVER_PRERELEASE_REG_EXP = SEMVER_PRERELEASE_REG_EXP;
exports.SEMVER_OPERATOR_TO_VERSION_REG_EXP = SEMVER_OPERATOR_TO_VERSION_REG_EXP;




exports.SEMVER_OPERATOR_REG_EXP = SEMVER_OPERATOR_REG_EXP;
exports.SEMVER_VERSION_REG_EXP = SEMVER_VERSION_REG_EXP;
exports.SEMVER_OPERATOR_AND_VERSION_REG_EXP = SEMVER_OPERATOR_AND_VERSION_REG_EXP;