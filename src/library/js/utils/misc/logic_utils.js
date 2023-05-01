'use strict';

const isBoolean = (input) => {
    return typeof input === 'boolean';
};

const isNumber = (input) => {
    return typeof input === 'number';
};

const isString = (input) => {
    return typeof input === 'string';
};

const isObject = (input) => {
    if (isNil(input)) {
        return false;
    } else if (isArray(input)) {
        return false;
    } else return typeof input === 'object';
};

const isArray = (input) => {
    return (
        input instanceof Array ||
        Object.prototype.toString.call(input) === '[object Array]'
    );
};

const isFunction = (input) => {
    return typeof input === 'function';
};

const isClass = (input) => {
    if (typeof input === 'function') {
        if (!isNullOrEmpty(input.prototype)) {
            const descResult = Object.getOwnPropertyDescriptor(input, 'prototype').writable;

            if (isNullOrEmpty(descResult)) {
                return false;
            } else {
                return !descResult;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
};

const isUndefined = (value) => {
    return value === undefined;
};

const isNull = (value) => {
    return value === null;
};

const isNil = (value) => {
    return isUndefined(value) || isNull(value);
};

const isNullOrEmpty = (value) => {
    if (isNil(value)) {
        return true;
    }

    if (isString(value)) {
        return value.length === 0;
    } else if (isArray(value)) {
        return value.length === 0;
    }

    return false;
};

const defaultTo = (defaultValue, value) => {
    if (isNullOrEmpty(value)) {
        return defaultValue;
    } else {
        return value;
    }
};

module.exports.isBoolean = isBoolean;
module.exports.isNumber = isNumber;
module.exports.isString = isString;
module.exports.isObject = isObject;
module.exports.isArray = isArray;
module.exports.isFunction = isFunction;
module.exports.isClass = isClass;
module.exports.isUndefined = isUndefined;
module.exports.isNull = isNull;
module.exports.isNil = isNil;
module.exports.isNullOrEmpty = isNullOrEmpty;
module.exports.defaultTo = defaultTo;