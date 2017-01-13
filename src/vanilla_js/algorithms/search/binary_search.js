'use strict';

// https://www.tutorialspoint.com/data_structures_algorithms/binary_search_algorithm.htm
// https://en.wikipedia.org/wiki/Binary_search_algorithm
//
// Features
//
// - applies to a wider range of search problems;
// - quite fast;
//
// Notes
//
// - array must be sorted;

// mock data
let sortedIntsArray1 = [-1, 2, 4, 5, 7];
let sortedIntsArray2 = [-9 , -3, -2, 1, 8, 10];

// good solution
const binarySearchOfIntegerGoodSolution = (sortedInts, intToFind) => {
    let sortedIntsSize = sortedInts.length;
    let searchValuePosition = -1;

    let lowerBound = 0;
    let upperBound = sortedIntsSize - 1;
    let midPoint;

    while (searchValuePosition === -1) {
        if (upperBound < lowerBound) {
            return -1;
        }

        midPoint = lowerBound + parseInt(( upperBound - lowerBound ) / 2);

        if (sortedInts[midPoint] === intToFind) {
            searchValuePosition = midPoint;
        }

        if (sortedInts[midPoint] < intToFind) {
            lowerBound = midPoint + 1;
        }

        if (sortedInts[midPoint] > intToFind) {
            upperBound = midPoint - 1;
        }

    }

    return searchValuePosition;
}

console.log('Binary search');
console.log('=============');

console.log('');

console.log('Array 1, value -1, position ' + binarySearchOfIntegerGoodSolution(sortedIntsArray1, -1)); // 0
console.log('Array 1, value 4, position ' + binarySearchOfIntegerGoodSolution(sortedIntsArray1, 4)); // 2
console.log('Array 1, value 3, position ' + binarySearchOfIntegerGoodSolution(sortedIntsArray1, 3)); // -1

console.log('');

console.log('Array 2, value -9, position ' + binarySearchOfIntegerGoodSolution(sortedIntsArray2, -9)); // 0
console.log('Array 2, value 6, position ' + binarySearchOfIntegerGoodSolution(sortedIntsArray2, 6)); // -1
console.log('Array 2, value 1, position ' + binarySearchOfIntegerGoodSolution(sortedIntsArray2, 1)); // 3