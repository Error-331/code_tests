'use strict';

// external imports
const {
    stubTrue,
    constant,
    identity,
    isFinite,
    equals,
    cond,
    spread,
    curry,
    map,
    reduce,
    flatten,
    pipe,
    over,
    findIndex,
    findLastIndex,
    concat,
    slice,
    range,
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

const addReplaceInfinityFromToIndex = curry((startIndex, endIndex, usrArray) => {
    return cond([
        [
            usrArray => size(usrArray) - 1 < endIndex,
            pipe(
                over([
                    identity,
                    usrArray => range(0, endIndex - (size(usrArray) - 1))
                ]),
                spread(concat),
                replaceToInfinityFromIndex(startIndex),
            )
        ],
        [stubTrue, replaceToInfinityFromIndex(startIndex)]
    ])(usrArray);
});

// https://gist.github.com/ijy/6094414#gistcomment-2651944
const cartesianProduct = (setsArray) => {
    return reduce((product, setItem) =>
            flatten(
                map(
                    productItem => map(nextSetItem => concat(productItem, [nextSetItem]), setItem),
                    product,
                )
            )
        , [[]], setsArray);
};

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
exports.addReplaceInfinityFromToIndex = addReplaceInfinityFromToIndex;
exports.cartesianProduct = cartesianProduct;
