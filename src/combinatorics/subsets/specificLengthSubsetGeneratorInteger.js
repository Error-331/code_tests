'use strict';

// http://rosettacode.org/wiki/Combinations#JavaScript
//
// Generate subsets of given length from set 1 - n

// solution
const convertSetNumberToSubset = (digit) => {
    let subset = [];

    for (let positionNumber = 0; digit; ++positionNumber, digit >>= 1) {
        if (digit & 1) {
            subset.push(positionNumber);
        }
    }

    return subset;
}

const iteratedBitCount = (digit) => {
    let bitsCount = 0;

    while (digit) {
        bitsCount += (digit & 1);
        digit >>= 1;
    }

    return bitsCount;
}

const generateSubSets = (setLength, subSetLength) => {
    // 00001 => 100000
    let setsCount = 1 << setLength;
    let subSets = [];

    for (let setCounter = 0; setCounter < setsCount; setCounter++) {
        if (iteratedBitCount(setCounter) === subSetLength) {
            subSets.push(convertSetNumberToSubset(setCounter))
        }
    }

    return subSets.sort();

}

console.log('Subset generation (integers only)');
console.log('=================================');

let generatedSubsets = generateSubSets(5, 3);
console.log('Subsets (5,3): ');
console.log(generatedSubsets);
console.log('------------------------------');

generatedSubsets = generateSubSets(10, 2);
console.log('Subsets (10,2): ');
console.log(generatedSubsets);
console.log('------------------------------');

generatedSubsets = generateSubSets(10, 6);
console.log('Subsets (10,6): ');
console.log(generatedSubsets);
console.log('------------------------------');