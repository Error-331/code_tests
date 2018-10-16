'use strict';

// https://www.synebo.io/
//
// Algorithm that calculates revers polish notation (rpn)
export default async () => {
    const testData1 = [5, 2, 3, '^', '+', 5, 8, '+']; // 5 2 3 ^ + 5 8 + = 13
    const testData2 = [3, 2, '*', 11, '-'];           // 3 2 * 11 - = -5
    const testData3 = [2, 1, 12, 3, '/', '-', '+'];   // 2 1 12 3 / - + = -1
    const testData4 = [6, 3, '-', 2, '^', 11, '-'];   // 6 3 - 2 ^ 11 - = -2

    const calcNotation = (operand1, operand2, sign) => {
        switch(sign) {
            case '+':
                return operand1 + operand2;
            case '-':
                return operand1 - operand2;
            case '*':
                return operand1 * operand2;
            case '/':
                return operand1 / operand2;
            case '^':
                return Math.pow(operand1, operand2);
        }
    };

    const reversPolishNotationNotBestSolution = (notationData = []) => {
        const numbers = [];

        notationData.forEach(notationElm => {
            if (typeof notationElm === 'number') {
                numbers.push(notationElm);
            } else {
                const operand2 = numbers.pop();
                const operand1 = numbers.pop();

                numbers.push(calcNotation(operand1, operand2, notationElm));
            }
        });

        const numbersLength = numbers.length;
        return numbersLength > 0 ? numbers[numbersLength - 1] : null;
    };

    console.log('Reverse polish notation');
    console.log('=======================');
    console.log('');

    console.log('Not best solution');
    console.log('-----------------');
    console.log('');

    console.log('5 2 3 ^ + 5 8 + ->', reversPolishNotationNotBestSolution(testData1));
    console.log('3 2 * 11 - ->', reversPolishNotationNotBestSolution(testData2));
    console.log('2 1 12 3 / - + ->', reversPolishNotationNotBestSolution(testData3));
    console.log('6 3 - 2 ^ 11 - ->', reversPolishNotationNotBestSolution(testData4));

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}