'use strict';

// https://www.interviewcake.com/question/javascript/product-of-other-numbers
//
// Algorithm that calculates highest product of three integers from array

// mock data
let integers1 = [1, 7, 3, 4];
let integers2 = [-10, -1, 9, 9, 9];
let integers3 = [-10, -3, 1, 2];
let integers4 = [-10, -3, 1, -4];
let integers5 = [-10, -5, -6, -1];

// combinatorial solution
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

const highestProductOfThreeIntegersNotBestSolution = (integersToCount, multiplierCountLimit = 3) => {
    let subSets = generateSubSets(integersToCount, multiplierCountLimit);
    let product;

    subSets.forEach((subSet) => {
        let subProduct = 1;

        subSet.forEach((subSetElement) => {
            subProduct *= subSetElement;
        });

        product = (product === undefined || product < subProduct) ? subProduct : product;
    });

    return product;
}

console.log('Product calculation (highest product of three integers)');
console.log('=======================================================');

let product = highestProductOfThreeIntegersNotBestSolution(integers1);

console.log('Product calculation - not the best solution - case 1');
console.log('Product: ' + product);

product = highestProductOfThreeIntegersNotBestSolution(integers2);

console.log('Product calculation - not the best solution - case 2');
console.log('Product: ' + product);

product = highestProductOfThreeIntegersNotBestSolution(integers3);

console.log('Product calculation - not the best solution - case 3');
console.log('Product: ' + product);

product = highestProductOfThreeIntegersNotBestSolution(integers4);

console.log('Product calculation - not the best solution - case 4');
console.log('Product: ' + product);

product = highestProductOfThreeIntegersNotBestSolution(integers5);

console.log('Product calculation - not the best solution - case 5');
console.log('Product: ' + product);