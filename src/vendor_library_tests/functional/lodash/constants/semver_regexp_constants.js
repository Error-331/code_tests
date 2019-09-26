'use strict';

// external imports

// local imports

// constants definition
const SEMVER_NPM_VERSION_SANITIZE_REG_EXP = RegExp('(\\r\\n|\\n|\\r)', 'g');

const SEMVER_SINGLE_DELIMETER_REG_EXP = RegExp('([^\\|])(\\|)([^\\|])', 'g');
const SEMVER_PRERELEASE_REG_EXP = RegExp('([0-9]|x|X|\\*)(\\ )*(\-)(\\ )*([A-Za-z])', 'g');
const SEMVER_OPERATOR_TO_VERSION_REG_EXP = '(\\<|\\>|\\<\\=|\\>\\=|\\=|\\~|\\^)(\\ )*(\\*|[0-9]|x|X)';

// export
exports.SEMVER_NPM_VERSION_SANITIZE_REG_EXP = SEMVER_NPM_VERSION_SANITIZE_REG_EXP;

exports.SEMVER_SINGLE_DELIMETER_REG_EXP = SEMVER_SINGLE_DELIMETER_REG_EXP;
exports.SEMVER_PRERELEASE_REG_EXP = SEMVER_PRERELEASE_REG_EXP;
exports.SEMVER_OPERATOR_TO_VERSION_REG_EXP = SEMVER_OPERATOR_TO_VERSION_REG_EXP;
