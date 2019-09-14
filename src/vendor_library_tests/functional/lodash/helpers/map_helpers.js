'use strict';

// external imports

// local imports

// helpers implementation
const convertMapKeysToArray = (usrMap) => {
    const keys = [];

    for (let [rowId] of usrMap) {
        keys.push(rowId);
    }

    return keys;
};

const convertMapDataToArray = (covertCallback, fieldName, usrMap, ) => {
    const values = [];
    for (let mapRow of usrMap) {
        values.push(covertCallback(mapRow[1][fieldName]));
    }

    return values;
};

// exports
exports.convertMapKeysToArray = convertMapKeysToArray;
exports.convertMapDataToArray = convertMapDataToArray;