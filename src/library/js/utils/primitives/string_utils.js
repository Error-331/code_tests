'use strict';

const { ALPHANUMERIC_LETTERS_EN_ALL } = require('./../../constants/string_constants');
const { isNullOrEmpty, isString, isBoolean, isNumber } = require('./../misc/general_utils');

function isOnlyDigits(str){
    return /^[0-9]+$/.test(str);
}

function generateRandomString(len, charSet) {
    charSet = charSet || ALPHANUMERIC_LETTERS_EN_ALL;

    let randomString = '';
    for (let i = 0; i < len; i++) {
        let randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }

    return randomString;
}

function removeComa(value) {
    return value.replace(/\,/g, '');
}

const toStringFOrT = (value, name = '') => {
    if (isNullOrEmpty(value)) {
        throw new Error(`"${name}" cannot be null or empty`);
    }

    if (isString(value)) {
        if (value.length > 1) {
            throw new Error(`"${name}" length cannot be greater than 1`);
        }

        value = value.toUpperCase();

        if (value !== 'T' && value !== 'F') {
            throw new Error(`"${name}" must contain either value of "F" or "T"`);
        }
    } else if (isBoolean(value)) {
        value = value  === true ? 'T' : 'F';
    } else if (isNumber(value)) {
        if (value !== 0 && value !== 1) {
            throw new Error(`"${name}" must contain either value of 0 or 1`);
        }

        value = value === 1 ? 'T' : 'F';
    }

    return value;
};

const toStringFOrTAsync = (value, name = '') => {
    try {
        return Promise.resolve(toStringFOrT(value, name));
    } catch (error) {
        return Promise.reject(error);
    }
};

module.exports.isOnlyDigits = isOnlyDigits;
module.exports.generateRandomString = generateRandomString;
module.exports.removeComa = removeComa;
module.exports.toStringFOrT = toStringFOrT;
module.exports.toStringFOrTAsync = toStringFOrTAsync;