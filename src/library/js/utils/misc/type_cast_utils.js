'use strict';

const { isArray, isNumber, isString } = require('./../misc/logic_utils');

const toSingleValue = (value) => {
    if (isArray(value)) {
        return value[0];
    }

    return value;
}

const toInt = (value) => {
    value = toSingleValue(value);

    if (!isNumber(value)) {
        return parseInt(value);
    }

    return value;
};

const toStringDefault = (value) => {
    if (value === null) {
        return 'NULL';
    } else if (value === undefined) {
        return 'UNDEFINED';
    } else if (isString(value) || value instanceof String) {
        return `${value}`;
    }

    return value.toString();
}

const toString = (value) => {
    value = toSingleValue(value);

    if (!isString(value)) {
        return toStringDefault(value);
    }

    return value;
};

const toArray = (value) => {
    if (!isArray(value)) {
        return [value];
    }

    return value;
};

const toBoolean = (value) => {
    value = toSingleValue(value);

    if (isNumber(value)) {
        value = value !== 0;
        return value;
    } else if (isString(value)) {
        value = value.toLowerCase();
        return value !== 'false';
    } else {
        return value;
    }
};

module.exports.toSingleValue = toSingleValue;
module.exports.toInt = toInt;
module.exports.toStringDefault = toStringDefault;
module.exports.toString = toString;
module.exports.toArray = toArray;
module.exports.toBoolea = toBoolean;