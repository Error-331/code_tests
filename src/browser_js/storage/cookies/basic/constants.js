'use strict';

const MAX_AGE_YEARS_COOKIE = 30;
const MAS_AGE_SECONDS_COOKIE = 31536000 * MAX_AGE_YEARS_COOKIE;
const COOKIE_FIELD_NAMES = ['path', 'domain', 'max-age', 'expires', 'secure', 'httponly'];

const COOKIE_FIELD_NAME_TO_OBJECT_FIELD_NAME = Object.freeze({
    'path': 'path',
    'domain': 'domain',
    'max-age': 'maxAge',
    'expires': 'expires',
    'secure': 'secure',
    'httponly': 'httpOnly'
});

module.exports.MAX_AGE_YEARS_COOKIE = MAX_AGE_YEARS_COOKIE;
module.exports.MAS_AGE_SECONDS_COOKIE = MAS_AGE_SECONDS_COOKIE;
module.exports.COOKIE_FIELD_NAMES = COOKIE_FIELD_NAMES;
module.exports.COOKIE_FIELD_NAME_TO_OBJECT_FIELD_NAME = COOKIE_FIELD_NAME_TO_OBJECT_FIELD_NAME;