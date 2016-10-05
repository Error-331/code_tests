'use strict';

// not best solution
const generateRandomPositionTuples = (minInteger, maxInteger) => {
    let tuplesArray = [];
    let tuplesArrayLength = maxInteger * 2;

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

let test = generateRandomPositionTuples(1, 100);

let c = {};
for (let i = 0; i < test.length; i++) {

    c[test[i]] = c[test[i]] !== undefined ? c[test[i]] + 1 : 1;
}

console.log(test.length);
console.log(c);