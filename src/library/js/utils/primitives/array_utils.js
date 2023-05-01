'use strict';

const { isNil } = require('./../misc/logic_utils');

function findIdxInObjectsArrayByKeyValue(valueToFind, objectsArray, keyToFind){
    for (let objectIdx = 0; objectIdx < objectsArray.length; objectIdx++) {
        if (objectsArray[objectIdx][keyToFind] === valueToFind) {
            return objectIdx;
        }
    }

    return -1;
}

function removeFieldsFromObjectsArray(objectsArray, fieldsToRemove = []) {
    for (const arrayRow of objectsArray) {
        for (const fieldToRemove of fieldsToRemove) {
            delete arrayRow[fieldToRemove];
        }
    }

    return objectsArray;
}

function checkAllArraysEqualSize(dataArrays) {
    let prevArraySize = null;

    for (const dataArray of dataArrays) {
        if (isNil(prevArraySize)) {
            prevArraySize = dataArray.length;
            continue;
        }

        if (prevArraySize !== dataArray.length) {
            return false;
        } else {
            prevArraySize = dataArray.length;
        }
    }

    return true;
}

function intersection(firstArray, secondArray) {
    return firstArray.filter(field => secondArray.includes(field));
}

function difference(firstArray, secondArray) {
    return firstArray.filter(field => !secondArray.includes(field));
}

function pick(obj, keys) {
    const newObj = {};

    for (const key of keys) {
        newObj[key] = obj[key];
    }

    return newObj;
}

function pickTo(obj, keysObj) {
    const newObj = {};

    for (const key in keysObj) {
        const newKey = keysObj[key];
        newObj[newKey] = obj[key];
    }

    return newObj;
}

function unique(inputArray) {
    return inputArray.filter((element, index, inputArray) => inputArray.indexOf(element) === index);
}

function uniqueParallelByFirstArray(arraysToFilter) {
    const indexesToRemove = [];

    const onlyUnique = (value, index, self) => {
        const indexCompareRes = self.indexOf(value) === index;

        if (!indexCompareRes) {
            indexesToRemove.push(index);
        }

        return indexCompareRes
    }

    const byIndex = (value, index) => indexesToRemove.indexOf(index) === -1;
    const newArrays = [];

    newArrays.push(arraysToFilter[0].filter(onlyUnique));

    for (let arrayIdx = 1; arrayIdx < arraysToFilter.length; arrayIdx++) {
        newArrays.push(arraysToFilter[arrayIdx].filter(byIndex));
    }

    return newArrays;
}

module.exports.findIdxInObjectsArrayByKeyValue = findIdxInObjectsArrayByKeyValue;
module.exports.removeFieldsFromObjectsArray = removeFieldsFromObjectsArray;
module.exports.checkAllArraysEqualSize = checkAllArraysEqualSize;

module.exports.intersection = intersection;
module.exports.difference = difference;
module.exports.pick = pick;
module.exports.pickTo = pickTo;
module.exports.unique = unique;

module.exports.uniqueParallelByFirstArray = uniqueParallelByFirstArray;