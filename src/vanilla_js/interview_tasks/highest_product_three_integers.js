'use strict';

// https://www.interviewcake.com/question/javascript/product-of-other-numbers
//
// Algorithm that calculates highest product of three integers from array

export default async () => {
    // mock data
    let integers1 = [1, 7, 3, 4]; // 7 * 3 * 4 = 84
    let integers2 = [-10, -1, 9, 9, 9]; // 9 * 9 * 9 = 729
    let integers3 = [-10, -3, 1, 2]; // -10 * -3 * 2 = 60
    let integers4 = [-10, -3, 1, -4]; // -10 * -4 * 1 = 40
    let integers5 = [-10, -5, -6, -1]; // -1 * -5 * -6 = -30

    // combinatorial solution
    const highestProductOfThreeIntegersCombinatorialSolution = (integersToCount, multiplierCountLimit = 3) => {
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
    };

    // best solution
    const highestProductOfThreeIntegersBestSolution = (integersToCount) => {
        let highest = Math.max(integersToCount[0], integersToCount[1]);
        let lowest  = Math.min(integersToCount[0], integersToCount[1]);

        let highestProductOf2 = integersToCount[0] * integersToCount[1];
        let lowestProductOf2  = integersToCount[0] * integersToCount[1];

        let highestProductOf3 = integersToCount[0] * integersToCount[1] * integersToCount[2];

        for (let i = 2; i < integersToCount.length; i++) {
            let current = integersToCount[i];

            highestProductOf3 = Math.max(
                highestProductOf3,
                current * highestProductOf2,
                current * lowestProductOf2
            );

            highestProductOf2 = Math.max(
                highestProductOf2,
                current * highest,
                current * lowest
            );

            lowestProductOf2 = Math.min(
                lowestProductOf2,
                current * highest,
                current * lowest
            );

            highest = Math.max(highest, current);
            lowest = Math.min(lowest, current);
        }

        return highestProductOf3;
    };

    console.log('Product calculation (highest product of three integers)');
    console.log('=======================================================');

    let product = highestProductOfThreeIntegersCombinatorialSolution(integers1);

    console.log('Product calculation - combinatorial solution - case 1');
    console.log('Product: ' + product);

    product = highestProductOfThreeIntegersCombinatorialSolution(integers2);

    console.log('Product calculation - combinatorial solution - case 2');
    console.log('Product: ' + product);

    product = highestProductOfThreeIntegersCombinatorialSolution(integers3);

    console.log('Product calculation - combinatorial solution - case 3');
    console.log('Product: ' + product);

    product = highestProductOfThreeIntegersCombinatorialSolution(integers4);

    console.log('Product calculation - combinatorial solution - case 4');
    console.log('Product: ' + product);

    product = highestProductOfThreeIntegersCombinatorialSolution(integers5);

    console.log('Product calculation - combinatorial solution - case 5');
    console.log('Product: ' + product);

    console.log('-------------------------------------------------------');

    product = highestProductOfThreeIntegersBestSolution(integers1);

    console.log('Product calculation - best solution - case 1');
    console.log('Product: ' + product);

    product = highestProductOfThreeIntegersBestSolution(integers2);

    console.log('Product calculation - best solution - case 2');
    console.log('Product: ' + product);

    product = highestProductOfThreeIntegersBestSolution(integers3);

    console.log('Product calculation - best solution - case 3');
    console.log('Product: ' + product);

    product = highestProductOfThreeIntegersBestSolution(integers4);

    console.log('Product calculation - best solution - case 4');
    console.log('Product: ' + product);

    product = highestProductOfThreeIntegersBestSolution(integers5);

    console.log('Product calculation - best solution - case 5');
    console.log('Product: ' + product);
}
