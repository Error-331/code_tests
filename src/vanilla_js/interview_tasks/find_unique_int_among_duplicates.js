'use strict';

// https://www.interviewcake.com/question/javascript/find-unique-int-among-duplicates
//
// Algorithm that finds unique integer among large set of duplicate values

// mock data
let largeIntegersSet1 = [
    16,27,81,52,18,94,5,49,79,51,3,70,34,2,84,96,54,25,53,79,84,35,49,31,4,30,33,46,52,27,63,50,34,69,91,
    24,33,82,8,74,39,2,43,28,94,65,47,31,77,30,15,74,36,19,20,32,16,20,8,92,70,4,81,88,90,78,17,6,10,93,46,
    82,53,7,58,59,42,1,95,68,89,93,97,100,28,67,18,76,26,67,1,73,75,66,71,55,98,47,54,92,98,100,7,60,32,97,
    40,5,37,45,45,51,60,96,64,6,86,13,37,59,36,87,24,48,21,63,55,83,99,38,91,12,87,76,41,38,83,40,21,77,
    62,72,62,14,99,23,66,69,43,50,39,17,80,73,48,72,89,10,25,64,12,15,95,26,65,78,90,41,58,86,57,35,80,11,
    88,68,19,85,22,57,13,85,71,11,3,29,61,23,44,75,29,14,56,44,22,56,61,9,9
]; // '42' is unique

let largeIntegersSet2 = [
    25,95,32,46,94,96,15,51,30,60,84,15,33,9,1,18,17,1,91,27,20,43,7,30,23,10,83,9,10,85,83,61,27,46,95,25,
    89,100,75,2,75,59,3,5,60,68,31,47,52,70,49,79,14,67,98,7,42,86,92,36,44,71,13,97,69,53,35,55,72,74,68,23,
    18,66,70,74,16,89,73,47,86,26,8,61,48,63,69,65,96,82,19,20,50,31,41,66,50,81,82,93,98,49,36,38,72,43,39,44,
    24,90,8,64,5,28,22,42,13,85,57,64,76,6,93,76,55,33,37,21,2,79,59,17,3,11,87,28,88,73,37,94,65,4,26,19,45,87,
    21,57,45,35,4,56,24,14,48,77,54,84,41,53,77,91,100,11,63,6,38,56,71,39,62,29,67,62,58,58,78,80,22,16,32,
    54,34,52,80,40,29,88,92,97,81,40,78,99,34,51,12,12,99
]; // '90' is unique

let largeIntegersSet3 = [
    95,88,18,79,74,46,89,76,96,47,28,37,75,66,85,94,50,15,48,65,61,67,12,70,68,94,63,9,2,95,13,100,73,17,40,88,
    53,64,76,65,24,12,73,72,98,21,20,96,85,8,34,60,75,69,71,70,2,34,60,39,68,43,69,66,23,5,53,74,63,59,14,64,56,
    58,26,15,62,6,79,84,10,61,22,38,18,57,23,33,43,45,48,13,35,42,42,45,17,21,54,9,25,35,62,55,30,100,16,4,33,8,
    58,38,71,82,83,31,47,40,32,89,83,4,22,50,28,56,14,31,26,41,86,81,80,92,44,55,90,81,41,72,87,54,99,1,86,1,25,
    91,3,93,84,87,19,5,80,16,20,49,98,99,24,49,77,90,27,57,27,78,37,59,51,6,10,93,46,77,11,78,36,29,67,32,36,82,
    39,3,29,51,7,30,97,11,91,44,92,19,7,97,52
]; // '52' is unique

// not best solution
const uniqueIntFinderNotBestSolution = (integerArray) => {
    let integerOccurrences = {};
    let integerArrayLength = integerArray.length;

    for (let integerArrayCounter = 0; integerArrayCounter < integerArrayLength; integerArrayCounter++) {
        let currentInteger = integerArray[integerArrayCounter];

        if (integerOccurrences[currentInteger] === undefined) {
            integerOccurrences[currentInteger] = true
        } else {
            delete integerOccurrences[currentInteger];
        }
    }

    let integerOccurrencesKeys = Object.keys(integerOccurrences);

    return integerOccurrencesKeys.length === 1 ? integerOccurrencesKeys[0] : null;
};

// best solution
const uniqueIntFinderBestSolution = (integerArray) => {
    let uniqueInteger = 0;

    integerArray.forEach(function(currentInteger) {
        uniqueInteger ^= currentInteger;
    });

    return uniqueInteger;
};

console.log('Random position tuples generation');
console.log('=================================');

console.log('');
console.log('Not best solution');
console.log('');

console.log('Unique integer for large set 1: ' + uniqueIntFinderNotBestSolution(largeIntegersSet1));
console.log('Unique integer for large set 2: ' + uniqueIntFinderNotBestSolution(largeIntegersSet2));
console.log('Unique integer for large set 3: ' + uniqueIntFinderNotBestSolution(largeIntegersSet3));

console.log('');
console.log('Best solution');
console.log('');

console.log('Unique integer for large set 1: ' + uniqueIntFinderBestSolution(largeIntegersSet1));
console.log('Unique integer for large set 2: ' + uniqueIntFinderBestSolution(largeIntegersSet2));
console.log('Unique integer for large set 3: ' + uniqueIntFinderBestSolution(largeIntegersSet3));