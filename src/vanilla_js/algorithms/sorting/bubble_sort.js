'use strict';

// https://en.wikipedia.org/wiki/Bubble_sort
//
// Sort defined sequence using bubble sort algorithm.
//
// Features
//
// - worst-case and average complexity;

// mock data
let userSet1 = [5, -1, 7, 3, 27, -5];
let userSet2 = [6, 1, 4, 10, 22, 3];
let userSet3 = [-4, -20, -5, -7, -7, 0, -1, 0];

// solution
const bubbleSort = (userSequence) => {
    let sortedSequence = userSequence.slice();
    let sortedSequenceLength = sortedSequence.length;

    for (let sequenceCounter = 1; sequenceCounter < sortedSequenceLength; sequenceCounter++) {
        let curSequenceNumber = sortedSequence[sequenceCounter];
        let prevSequenceNumber = sortedSequence[sequenceCounter - 1];

        if (prevSequenceNumber > curSequenceNumber) {
            sortedSequence[sequenceCounter] = prevSequenceNumber;
            sortedSequence[sequenceCounter - 1] = curSequenceNumber;

            sequenceCounter = 0;
        }
    }

    return sortedSequence;
};

console.log('Bubble sorting');
console.log('==============');

let sortedSequence = bubbleSort(userSet1);
console.log('Sorted sequence 1: ' + sortedSequence);

sortedSequence = bubbleSort(userSet2);
console.log('Sorted sequence 2: ' + sortedSequence);

sortedSequence = bubbleSort(userSet3);
console.log('Sorted sequence 3: ' + sortedSequence);
