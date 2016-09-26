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
const highestProductOfThreeIntegersNotBestSolution = (integersToCount, multiplierCountLimit = 3) => {
    let product;
    let setLength = integersToCount.length;

    // 00001 => 100000
    let setsCount = 1 << setLength;

    for(let setCounter = 0; setCounter < setsCount; setCounter++)
    {
        // count bits
        let bitsCount = 0;
        let bitCounter = setCounter;

        while (bitCounter) {
            bitsCount += (bitCounter & 1);
            bitCounter >>= 1;
        }

        if (bitsCount !== multiplierCountLimit) {
            continue;
        }


        // find sub-product
        let elementPosition = setLength - 1;
        let bitMask = setCounter;
        let subProduct = 1;

        while(bitMask > 0)
        {
            if((bitMask & 1) == 1) {
                subProduct *= integersToCount[elementPosition];
            }

            bitMask >>= 1;
            elementPosition--;
        }

        product = (product === undefined || product < subProduct) ? subProduct : product;
    }

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