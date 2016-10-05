'use strict';

// Generate integer tuples with random position in resulting array
//
// Example
//
// minInteger - 5
// maxInteger - 10
//
// result:
//
// [ 10, 7, 8, 8, 9, 10, 7, 6, 9, 6, 5, 5 ]

// mock data
let minInteger1 = 1;
let maxInteger1 = 10;

let minInteger2 = 5;
let maxInteger2 = 23;

let minInteger3 = 3;
let maxInteger3 = 7;

// not best solution
const generateRandomPositionTuples = (minInteger, maxInteger) => {
    let tuplesArray = [];
    let tuplesArrayLength = (maxInteger - (minInteger - 1))  * 2;

    maxInteger += 1;

    while (tuplesArray.length < tuplesArrayLength) {
        // generate random int excluding maximum
        let randomNumber =  Math.floor(Math.random() * (maxInteger - minInteger)) + minInteger;

        // check number of occurrence of the current number
        let occurrenceNumber = 0;
        for (let numberIndex = 0; numberIndex < tuplesArray.length;  numberIndex++) {
            if (tuplesArray[numberIndex] === randomNumber) {
                ++occurrenceNumber;
            }

            if (occurrenceNumber === 2) {
                break;
            }
        }

        if (occurrenceNumber < 2) {
            tuplesArray.push(randomNumber);
        }

        occurrenceNumber = 0;
    }

    return tuplesArray;
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

console.log('Random position tuples generation');
console.log('=================================');

console.log('');

console.log(`Tuples array 1 (min - ${minInteger1}, max - ${maxInteger1})`);
console.log('----------------------------------');

console.log('');

let integerArray = generateRandomPositionTuples(minInteger1, maxInteger1);
console.log('Integer array: ');
console.log(integerArray);

console.log('');

let integerOccurrence = integerOccurrenceCounter(integerArray);
console.log('Count of integer occurrence: ');
console.log(integerOccurrence);

console.log('');

console.log('------------------------------');

console.log('');

console.log(`Tuples array 2 (min - ${minInteger2}, max - ${maxInteger2})`);
console.log('----------------------------------');

console.log('');

integerArray = generateRandomPositionTuples(minInteger2, maxInteger2);
console.log('Integer array: ');
console.log(integerArray);

console.log('');

integerOccurrence = integerOccurrenceCounter(integerArray);
console.log('Count of integer occurrence: ');
console.log(integerOccurrence);

console.log('');

console.log('------------------------------');

console.log('');

console.log(`Tuples array 2 (min - ${minInteger3}, max - ${maxInteger3})`);
console.log('----------------------------------');

console.log('');

integerArray = generateRandomPositionTuples(minInteger3, maxInteger3);
console.log('Integer array: ');
console.log(integerArray);

console.log('');

integerOccurrence = integerOccurrenceCounter(integerArray);
console.log('Count of integer occurrence: ');
console.log(integerOccurrence);

console.log('');

console.log('------------------------------');