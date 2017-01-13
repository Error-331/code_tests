'use strict';

// http://codesam.blogspot.com/2011/03/find-all-subsets-of-given-set.html
//
// Generate every subset of a given set

// mock data
let userSet1 = [1,2,3,4,5,6];
let userSet2 = ['a', 'b', 'c', 'd'];
let userSet3 = ['bam', 'yum', 'hum'];

// solution
const generateSubSets = (userSet) => {
    let setLength = userSet.length;

    // 00001 => 100000
    let setsCount = 1 << setLength;
    let resultSet = [];

    for(let setCounter = 0; setCounter < setsCount; setCounter++)
    {
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

console.log('All subset generation');
console.log('=====================');

let generatedSubsets = generateSubSets(userSet1);
console.log('Subsets for set1: ');
console.log(generatedSubsets);
console.log('------------------------------');

generatedSubsets = generateSubSets(userSet2);
console.log('Subsets set2: ');
console.log(generatedSubsets);
console.log('------------------------------');

generatedSubsets = generateSubSets(userSet3);
console.log('Subsets set3: ');
console.log(generatedSubsets);
console.log('------------------------------');