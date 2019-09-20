'use strict';

// external imports
const {
    constant,
    isFinite,
    equals,
    curry,
    map,
    findIndex,
    findLastIndex,
    concat,
    slice,
    size,
    add,
} = require('lodash/fp');

// local imports

// helpers implementation
const findLastFiniteValueIndex = findLastIndex(isFinite);
const findLastFiniteNoneZeroValueIndex = findLastIndex(usrValue => isFinite(usrValue) && usrValue !== 0);
const findFirstNoneZeroValue = findIndex(nextValue => !equals(nextValue, 0));

const mapAtIndex = curry((index, callback, usrArray) => {
    const newArray = usrArray.slice();
    newArray[index] = callback(newArray[index]);

    return newArray;
});

const incrementAtIndex = curry((index, usrArray) => mapAtIndex(index, add(1), usrArray));
const decrementAtIndex = curry((index, usrArray) => mapAtIndex(index, value => value - 1, usrArray));
const infinityAtIndex = curry((index, usrArray) => mapAtIndex(index, constant(Infinity), usrArray));

const addValueToArray = curry((newValue, usrArray) => {
    const newArray = usrArray.slice();
    newArray.push(newValue);

    return newArray;
});

const addInfinityToArray = addValueToArray(Infinity);

const replaceToValueFromIndex = curry((startIndex, newValue, usrArray) => {
    return concat(
        slice(0, startIndex, usrArray),
        map(
            constant(newValue),
            slice(startIndex, size(usrArray), usrArray)
        )
    );
});

const replaceToInfinityFromIndex = curry((startIndex, usrArray) => {
    return replaceToValueFromIndex(startIndex, Infinity, usrArray);
});


// export
exports.findLastFiniteValueIndex = findLastFiniteValueIndex;
exports.findLastFiniteNoneZeroValueIndex = findLastFiniteNoneZeroValueIndex;
exports.findFirstNoneZeroValue = findFirstNoneZeroValue;

exports.incrementAtIndex = incrementAtIndex;
exports.decrementAtIndex = decrementAtIndex;
exports.infinityAtIndex = infinityAtIndex;

exports.addValueToArray = addValueToArray;
exports.addInfinityToArray = addInfinityToArray;

exports.replaceToValueFromIndex = replaceToValueFromIndex;
exports.replaceToInfinityFromIndex = replaceToInfinityFromIndex;
