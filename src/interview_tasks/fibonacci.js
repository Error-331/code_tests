'use strict';

// https://www.interviewcake.com/question/javascript/nth-fibonacci
//
// Algorithms that build Fibonacci sequence and returns nth element of Fibonacci sequence
//
// Example of Fibonacci sequence (nine first elements): 0,1,1,2,3,5,8,13,21

// not best solution (Fibonacci sequence)
const buildFibonacciSequenceNotBestSolution = (numOfElements, prevElement = 0, nextElement = 0, elementsCount = 0, storageArray = []) => {
    if (elementsCount >= numOfElements) {
        return storageArray;
    }

    let prevNextSum = prevElement + nextElement;

    storageArray.push(prevNextSum);
    buildFibonacciSequenceNotBestSolution(numOfElements, nextElement, prevNextSum, ++elementsCount, storageArray);

    return storageArray;
};

// not best solution (Fibonacci nth element)
const findFibonacciNthElementNotBestSolution = (elementNumber, prevElement = 0, nextElement = 0, elementsCount = 0) => {
    if (elementNumber === elementsCount - 1) {
        return prevElement;
    }

    let prevNextSum = prevElement + nextElement;
    return findFibonacciNthElementNotBestSolution(elementNumber, nextElement, prevNextSum, ++elementsCount);
};

// good solution (Fibonacci sequence)
const buildFibonacciSequenceGoodSolution = (numOfElements, startElement = 1) => {

    let prevElement = 0;
    let currentElement = prevElement + startElement;
    let prevNextSum = 0;

    for(let elementsCount = 1; elementsCount < numOfElements; elementsCount++) {

        prevElement = currentElement;
        currentElement = prevElement + currentElement;

    }
};

let gg = buildFibonacciSequenceGoodSolution(10);
console.log(gg);

console.log('Fibonacci sequence');
console.log('==================');

console.log('');

let fibonacciSequence = buildFibonacciSequenceNotBestSolution(10, 1);

console.log('Fibonacci sequence - not the best solution (elements - 10, first - 1)');
console.log(fibonacciSequence);

fibonacciSequence = buildFibonacciSequenceNotBestSolution(10, 3);

console.log('Fibonacci sequence - not the best solution (elements - 10, first - 3)');
console.log(fibonacciSequence);

fibonacciSequence = buildFibonacciSequenceNotBestSolution(10, 5);

console.log('Fibonacci sequence - not the best solution (elements - 10, first - 5)');
console.log(fibonacciSequence);

console.log('');

console.log('------------------------------------------------------');

console.log('');

console.log('Fibonacci nth element');
console.log('=====================');

let fibonacciNthElement = findFibonacciNthElementNotBestSolution(3, 1);

console.log('Fibonacci nth element - not the best solution (element - 3, first - 1)');
console.log(fibonacciNthElement);

fibonacciNthElement = findFibonacciNthElementNotBestSolution(4, 3);

console.log('Fibonacci nth element - not the best solution (element - 4, first - 3)');
console.log(fibonacciNthElement);

fibonacciNthElement = findFibonacciNthElementNotBestSolution(6, 5);

console.log('Fibonacci nth element - not the best solution (element - 6, first - 5)');
console.log(fibonacciNthElement);