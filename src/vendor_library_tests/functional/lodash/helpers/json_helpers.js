'use strict';

// external imports
const {pipe, forEach, map, keys, max} = require('lodash/fp');

// local imports

// helpers implementation
const findLastRowIndexInJSON = pipe(keys, map(parseInt), max);

const convertMapToJSON = (mapToConvert) => {
    const composedObject = {};

    for (const entry of mapToConvert) {
        const [id, value] = entry;

        composedObject[id] = value;
    }

    return composedObject;
};

const convertJSONToMap = (jsonData) => {
    const dataMap = new Map();

    forEach(index => dataMap.set(index, jsonData[index]), keys(jsonData));
    return dataMap;
};

// export
exports.findLastRowIndexInJSON = findLastRowIndexInJSON;
exports.convertMapToJSON = convertMapToJSON;
exports.convertJSONToMap = convertJSONToMap;