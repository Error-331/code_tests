'use strict';

// https://en.wikipedia.org/wiki/Heap%27s_algorithm
//
// Features
//
// - suitable for most cases;
// - minimum movement;

// mock data
let userSet1 = [1, 2, 3];
let userSet2 = ['a', 'b', 'c', 'd'];

const heapsPermutationGenerator = (arrayToPermute) => {
    let arrayToPermuteCopy = arrayToPermute.slice();
    let permutationsArray = [];

    let arrayToPermuteLength = arrayToPermuteCopy.length;
    let helperArray = Array(arrayToPermuteLength).fill(0);

    let permCounter = 1;

    while (permCounter < arrayToPermuteLength) {
        if  (helperArray[permCounter] < permCounter) {
            // if 'permCounter' is even
            if (permCounter % 2 == 0) {
                [arrayToPermuteCopy[0], arrayToPermuteCopy[permCounter]] = [arrayToPermuteCopy[permCounter], arrayToPermuteCopy[0]];
            } else {
                [arrayToPermuteCopy[helperArray[permCounter]], arrayToPermuteCopy[permCounter]] = [arrayToPermuteCopy[permCounter], arrayToPermuteCopy[helperArray[permCounter]]];
            }

            permutationsArray.push(arrayToPermuteCopy.slice());

            helperArray[permCounter]++;
            permCounter = 1;
        } else {
            helperArray[permCounter] = 0;
            permCounter++;
        }
    }

    return permutationsArray;
}


console.log('Bubble sorting');
console.log('==============');

console.log('');

let permutedSequence = heapsPermutationGenerator(userSet1);
console.log('Permuted sequences (set 1): ');
console.log('');
console.log(permutedSequence);

console.log('');

permutedSequence = heapsPermutationGenerator(userSet2);
console.log('Permuted sequences (set 2): ');
console.log('');
console.log(permutedSequence);