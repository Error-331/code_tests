'use strict';

// https://en.wikipedia.org/wiki/Insertion_sort
//
// Sort defined sequence using insertion sort
//
// Features
//
// - best used for small-medium data sets;
// - not good for large data sets;
// - small memory footprint;

// mock data
let userSet1 = [5, -1, 7, 3, 27, -5];
let userSet2 = [6, 1, 4, 10, 22, 3];
let userSet3 = [-4, -20, -5, -7, -7, 0, -1, 0];

// solution
const insertionSort = (userSequence) => {
    let sortedSequence = userSequence.slice();
    let sortedSequenceLength = sortedSequence.length;

    for (let sequenceCounter = 1; sequenceCounter < sortedSequenceLength; sequenceCounter++) {
        let subSequenceCounter = sequenceCounter;

        while (subSequenceCounter > 0 && sortedSequence[subSequenceCounter - 1] > sortedSequence[subSequenceCounter]) {
            let currentNumber = sortedSequence[subSequenceCounter];

            sortedSequence[subSequenceCounter] = sortedSequence[subSequenceCounter - 1];
            sortedSequence[subSequenceCounter - 1] = currentNumber;

            subSequenceCounter--;
        }
    }

    return sortedSequence;
};

console.log('Insertion sorting');
console.log('=================');

let sortedSequence = insertionSort(userSet1);
console.log('Sorted sequence 1: ' + sortedSequence);

sortedSequence = insertionSort(userSet2);
console.log('Sorted sequence 2: ' + sortedSequence);

sortedSequence = insertionSort(userSet3);
console.log('Sorted sequence 3: ' + sortedSequence);
