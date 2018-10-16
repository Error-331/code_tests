'use strict';

// https://www.interviewcake.com/question/javascript/product-of-other-numbers
//
// Algorithm that calculates product of every integer except the integer at that index

export default async () => {
    // mock data
    let integers1 = [1, 7, 3, 4];
    let integers2 = [1, 2, 6, 5, 9];
    let integers3 = [2, 4, 10];

    // not best solution
    const getProductsOfAllIntsExceptAtIndexNotBestSolution = (integersToCount) => {
        let productArray = [];

        integersToCount.forEach((currentInteger, currentIndex) => {
            let product = 1;

            integersToCount.forEach((subInteger, subIndex) => {
                if (currentIndex === subIndex) {
                    return;
                }

                product *= subInteger;
            });

            productArray.push(product);
        });

        return productArray;
    };

    // best solution
    const getProductsOfAllIntsExceptAtIndexBestSolution = (integersToCount) => {

        let productsOfAllIntsExceptAtIndex = [];
        let productSoFar = 1;

        let integersToCountLength = integersToCount.length;

        for (let i = 0; i < integersToCountLength; i++) {
            productsOfAllIntsExceptAtIndex[i] = productSoFar;
            productSoFar *= integersToCount[i];
        }

        productSoFar = 1;
        for (let j = integersToCountLength - 1; j >= 0; j--) {
            productsOfAllIntsExceptAtIndex[j] *= productSoFar;
            productSoFar *= integersToCount[j];
        }

        return productsOfAllIntsExceptAtIndex;
    };

    console.log('Product calculation (every integer expect at index)');
    console.log('===================================================');

    let product = getProductsOfAllIntsExceptAtIndexNotBestSolution(integers1);

    console.log('Product calculation - not the best solution - case 1');
    console.log('Product: ' + product);

    product = getProductsOfAllIntsExceptAtIndexNotBestSolution(integers2);

    console.log('Product calculation - not the best solution - case 2');
    console.log('Product: ' + product);

    product = getProductsOfAllIntsExceptAtIndexNotBestSolution(integers3);

    console.log('Product calculation - not the best solution - case 3');
    console.log('Product: ' + product);

    console.log('------------------------------------------------------');

    product = getProductsOfAllIntsExceptAtIndexBestSolution(integers1);

    console.log('Product calculation - the best solution - case 1');
    console.log('Product: ' + product);

    product = getProductsOfAllIntsExceptAtIndexBestSolution(integers2);

    console.log('Product calculation - the best solution - case 2');
    console.log('Product: ' + product);

    product = getProductsOfAllIntsExceptAtIndexBestSolution(integers3);

    console.log('Product calculation - the best solution - case 3');
    console.log('Product: ' + product);
}