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
const insertionSort1 = (userSequence) => {
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

const insertionSort2 = (userSequence) => {
    const sortedSequence = userSequence.slice();

    for(let sequenceCounter1 = 1; sequenceCounter1 < sortedSequence.length; sequenceCounter1++) {
        let second = sortedSequence[sequenceCounter1];

        for (let sequenceCounter2 = sequenceCounter1 - 1; sequenceCounter2 > -1; sequenceCounter2--) {
            let first = sortedSequence[sequenceCounter2];

            if (first > second) {
                sortedSequence[sequenceCounter2 + 1] = first;
                sortedSequence[sequenceCounter2] = second;
            } else {
                break;
            }
        }
    }

    return sortedSequence;
};

console.log('Insertion sorting');
console.log('=================');

console.log('Sorted sequence 1 (variant 1): ', insertionSort1(userSet1));
console.log('Sorted sequence 2 (variant 1): ', insertionSort1(userSet2));
console.log('Sorted sequence 3 (variant 1): ', insertionSort1(userSet3));

console.log('');

console.log('Sorted sequence 1 (variant 2): ', insertionSort2(userSet1));
console.log('Sorted sequence 2 (variant 2): ', insertionSort2(userSet2));
console.log('Sorted sequence 3 (variant 2): ', insertionSort2(userSet3));
