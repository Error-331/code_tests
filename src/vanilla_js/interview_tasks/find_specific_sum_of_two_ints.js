'use strict';

// Algorithm that finds whether we can get sum of two elements that equals to specific sum provided by the user
export default async () => {
    // mock data
    let intsArray1 = [4, 7, 2, -1, 5]; // -1 2 4 5 7
    let intsArray2 = [-2, 8, -3, -9, 10, 1];

    // binary search algorithm
    const binarySearchOfInteger = (sortedInts, intToFind) => {
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
    };

    // best solution
    const findSpecificSumOfTwoIntsBestSolution = (intsArray, specificSum) => {
        let intsArrayCopy = intsArray.slice().sort((firstInt, secondInt) => {
            return firstInt - secondInt;
        });

        let intsArrayLength = intsArray.length;

        let leftIndex = 0;
        let rightIndex = intsArrayLength - 1;

        while(leftIndex !== rightIndex) {
            let currentSum = intsArrayCopy[leftIndex] + intsArrayCopy[rightIndex];

            if (currentSum < specificSum) {
                leftIndex++;
            } else if (currentSum > specificSum) {
                rightIndex--;
            } else {
                return true;
            }
        }

        return false;
    };

    // binary search solution
    const findSpecificSumOfTwoIntsBinarySearchSolution = (intsArray, specificSum) => {
        let intsArrayCopy = intsArray.slice().sort((firstInt, secondInt) => {
            return firstInt - secondInt;
        });

        let intsArrayLength = intsArrayCopy.length;

        for (let intIndex = 0; intIndex < intsArrayLength; intIndex++) {
            let firstInt = intsArrayCopy[intIndex];
            let secondInt = specificSum - firstInt;
            let searchIndex = binarySearchOfInteger(intsArrayCopy, secondInt);

            if (searchIndex !== -1 && searchIndex !== intIndex) {
                return true;
            }
        }

        return false;
    };

    console.log('Sum of two elements equality to use sum');
    console.log('=======================================');

    console.log('');
    console.log('Best solution');
    console.log('');

    console.log('Array: 1, sum: 6, isFound: ' + findSpecificSumOfTwoIntsBestSolution(intsArray1, 6)); // true
    console.log('Array: 1, sum: 9, isFound: ' + findSpecificSumOfTwoIntsBestSolution(intsArray1, 9)); // true
    console.log('Array: 1, sum: 10, isFound: ' + findSpecificSumOfTwoIntsBestSolution(intsArray1, 10)); // false

    console.log('');

    console.log('Array: 2, sum: -11, isFound: ' + findSpecificSumOfTwoIntsBestSolution(intsArray2, -11)); // true
    console.log('Array: 2, sum: -3, isFound: ' + findSpecificSumOfTwoIntsBestSolution(intsArray2, -3)); // false
    console.log('Array: 2, sum: -5, isFound: ' + findSpecificSumOfTwoIntsBestSolution(intsArray2, -5)); // true

    console.log('');
    console.log('Binary search solution');
    console.log('');

    console.log('Array: 1, sum: 6, isFound: ' + findSpecificSumOfTwoIntsBinarySearchSolution(intsArray1, 6)); // true
    console.log('Array: 1, sum: 9, isFound: ' + findSpecificSumOfTwoIntsBinarySearchSolution(intsArray1, 9)); // true
    console.log('Array: 1, sum: 10, isFound: ' + findSpecificSumOfTwoIntsBinarySearchSolution(intsArray1, 10)); // false

    console.log('');

    console.log('Array: 2, sum: -11, isFound: ' + findSpecificSumOfTwoIntsBinarySearchSolution(intsArray2, -11)); // true
    console.log('Array: 2, sum: -3, isFound: ' + findSpecificSumOfTwoIntsBinarySearchSolution(intsArray2, -3)); // false
    console.log('Array: 2, sum: -5, isFound: ' + findSpecificSumOfTwoIntsBinarySearchSolution(intsArray2, -5)); // true

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
