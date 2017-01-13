'use strict';

// Generates array filled with unique integers in random positions
//
// Example
//
// minInteger - 5
// maxInteger - 10
//
// result:
//
// [  ]

// mock data
let minInteger1 = 1;
let maxInteger1 = 10;

let minInteger2 = 5;
let maxInteger2 = 23;

let minInteger3 = 3;
let maxInteger3 = 7;

let minInteger4 = -10;
let maxInteger4 = -1;

// worst solution
const generateRandomPositionIntegersWorstSolution = (minInteger, maxInteger) => {
    let integersArray = [];
    let integersArrayLength = (maxInteger - (minInteger - 1));

    maxInteger += 1;

    while (integersArray.length < integersArrayLength) {
        // generate random int excluding maximum
        let randomNumber =  Math.floor(Math.random() * (maxInteger - minInteger)) + minInteger;

        if (integersArray.indexOf(randomNumber) === -1) {
            integersArray.push(randomNumber);
        }
    }

    return integersArray;
}

// counts number of occurrences of each integer in array
const integerOccurrenceCounter = (integerArray) => {
    let integerOccurrences = {};
    let integerArrayLength = integerArray.length;

    for (let integerArrayCounter = 0; integerArrayCounter < integerArrayLength; integerArrayCounter++) {
        let currentInteger = integerArray[integerArrayCounter];

        integerOccurrences[currentInteger] = integerOccurrences[currentInteger] !== undefined ? integerOccurrences[currentInteger] + 1 : 1;
    }

    return integerOccurrences;
}

console.log('Set with randomly positioned integers');
console.log('=====================================');

console.log('');

console.log('Worst solution');
console.log('--------------');

console.log('');

console.log(`Unique integer value array 1 (min: ${minInteger1}, max: ${maxInteger1})`);
console.log('----------------------------------------------');

console.log('');

let integerArray = generateRandomPositionIntegersWorstSolution(minInteger1, maxInteger1);
console.log('Integer array: ');
console.log(integerArray);

console.log('');

let integerOccurrence = integerOccurrenceCounter(integerArray);
console.log('Count of integer occurrence: ');
console.log(integerOccurrence);


console.log('');

console.log(`Unique integer value array 2 (min: ${minInteger2}, max: ${maxInteger2})`);
console.log('----------------------------------------------');

console.log('');

integerArray = generateRandomPositionIntegersWorstSolution(minInteger2, maxInteger2);
console.log('Integer array: ');
console.log(integerArray);

console.log('');

integerOccurrence = integerOccurrenceCounter(integerArray);
console.log('Count of integer occurrence: ');
console.log(integerOccurrence);

console.log('');

console.log(`Unique integer value array 3 (min: ${minInteger3}, max: ${maxInteger3})`);
console.log('---------------------------------------------');

console.log('');

integerArray = generateRandomPositionIntegersWorstSolution(minInteger3, maxInteger3);
console.log('Integer array: ');
console.log(integerArray);

console.log('');

integerOccurrence = integerOccurrenceCounter(integerArray);
console.log('Count of integer occurrence: ');
console.log(integerOccurrence);

console.log('');

console.log(`Unique integer value array 3 (min: ${minInteger4}, max: ${maxInteger4})`);
console.log('------------------------------------------------');

console.log('');

integerArray = generateRandomPositionIntegersWorstSolution(minInteger4, maxInteger4);
console.log('Integer array: ');
console.log(integerArray);

console.log('');

integerOccurrence = integerOccurrenceCounter(integerArray);
console.log('Count of integer occurrence: ');
console.log(integerOccurrence);