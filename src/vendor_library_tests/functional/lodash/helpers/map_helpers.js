'use strict';

// external imports
const {curry} = require('lodash/fp');

// local imports

// helpers implementation
const convertMapKeysToArray = (usrMap) => {
    const keys = [];

    for (let [rowId] of usrMap) {
        keys.push(rowId);
    }

    return keys;
};

const convertMapDataToArrayByField = (covertCallback, fieldName, usrMap) => {
    const values = [];
    for (let mapRow of usrMap) {
        values.push(covertCallback(mapRow[1][fieldName]));
    }

    return values;
};

const mapMapToArray = curry((callback, usrMap) => {
    const resultArray = [];

    for (let [mapKey, mapValue] of usrMap) {
        resultArray.push(callback(mapValue, mapKey))
    }

    return resultArray;
});

const getMapValue = curry(
    (usrMap, key) => usrMap.get(key.toString())
);

// exports
exports.convertMapKeysToArray = convertMapKeysToArray;
exports.convertMapDataToArrayByField = convertMapDataToArrayByField;
exports.mapMapToArray = mapMapToArray;
exports.getMapValue = getMapValue;