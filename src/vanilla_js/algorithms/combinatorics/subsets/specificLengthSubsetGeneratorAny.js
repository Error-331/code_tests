'use strict';

// Generate subsets of given length for specific set

// mock data
let userSet1 = [1,2,3,4,5,6];
let userSet2 = ['a', 'b', 'c', 'd'];
let userSet3 = ['bam', 'yum', 'hum'];

// solution
const iteratedBitCount = (digit) => {
    let bitsCount = 0;

    while (digit) {
        bitsCount += (digit & 1);
        digit >>= 1;
    }

    return bitsCount;
}

const generateSubSets = (userSet, subSetLength) => {
    let setLength = userSet.length;

    // 00001 => 100000
    let setsCount = 1 << setLength;
    let resultSet = [];

    for(let setCounter = 0; setCounter < setsCount; setCounter++)
    {
        if (iteratedBitCount(setCounter) !== subSetLength) {
            continue;
        }

        let elementPosition = setLength - 1;
        let bitmask = setCounter;
        let subSet = [];

        while(bitmask > 0)
        {
            if((bitmask & 1) == 1) {
                subSet.push(userSet[elementPosition])
            }

            bitmask >>= 1;
            elementPosition--;
        }

        resultSet.push(subSet);
    }

    return resultSet;
}

console.log('Specific length subset generation');
console.log('=================================');

let generatedSubsets = generateSubSets(userSet1, 4);
console.log('Subsets for set1 (length 4): ');
console.log(generatedSubsets);
console.log('------------------------------');

generatedSubsets = generateSubSets(userSet2, 3);
console.log('Subsets set2 (length 3): ');
console.log(generatedSubsets);
console.log('------------------------------');

generatedSubsets = generateSubSets(userSet3, 2);
console.log('Subsets set3 (length 2): ');
console.log(generatedSubsets);
console.log('------------------------------');