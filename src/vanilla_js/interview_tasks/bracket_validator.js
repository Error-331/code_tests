'use strict';

// https://www.interviewcake.com/question/javascript/bracket-validator
//
// braces/brackets/parentheses nesting validator

export default async () => {
    // mock data
    let mockString1 = '{ [ ] ( ) }';                 // true
    let mockString2 = '{ [ ( ] ) }';                 // false
    let mockString3 = '{ [ }';                       // false
    let mockString4 = '( { {} [ ( {} ) ] } )';       // true
    let mockString5 = '[ {} ( ( ) ) ] { ( { )= ) }'; // false
    let mockString6 = 'test }';                      // false

    // good solution
    const bracketsValidatorGoodSolution = (stringToTest) => {
        let openersTypes = ['(', '{', '['];
        let closersTypes = [')', '}', ']'];

        let stringLength = stringToTest.length;
        let expectedClosersIndexes = [];

        for (let charCounter = 0; charCounter < stringLength; charCounter++) {
            let currentChar = stringToTest.charAt(charCounter);

            let openerIndex = openersTypes.indexOf(currentChar);
            let closerIndex = closersTypes.indexOf(currentChar);

            if (openerIndex !== -1) {
                expectedClosersIndexes.push(openerIndex);
            } else if (closerIndex !== -1) {
                if (!expectedClosersIndexes.length) {
                    return false;
                }

                let expectedCloserIndex = expectedClosersIndexes.pop();

                if (expectedCloserIndex !== closerIndex) {
                    return false;
                }
            }
        }

        return true;
    };

    // best solution
    const bracketsValidatorBestSolution = (stringToTest) =>  {
        let openersToClosers = {
            '(': ')',
            '[': ']',
            '{': '}',
        };

        let openersTypes = new Set(['(', '[', '{']);
        let closersTypes = new Set([')', ']', '}']);

        let openersStack = [];
        let stringLength = stringToTest.length;

        for (let charCounter = 0; charCounter < stringLength; charCounter++) {
            let currentChar = stringToTest.charAt(charCounter);

            if (openersTypes.has(currentChar)) {
                openersStack.push(currentChar);
            } else if (closersTypes.has(currentChar)) {
                if (!openersStack.length) {
                    return false;
                } else {
                    let lastUnclosedOpener = openersStack.pop();

                    if (openersToClosers[lastUnclosedOpener] !== currentChar) {
                        return false;
                    }
                }
            }
        }

        return openersStack.length === 0;
    };

    console.log('Brackets validation');
    console.log('===================');

    console.log('');
    console.log('Good solution');
    console.log('');

    console.log('Mock string 1, valid: ' + bracketsValidatorGoodSolution(mockString1));
    console.log('Mock string 2, valid: ' + bracketsValidatorGoodSolution(mockString2));
    console.log('Mock string 3, valid: ' + bracketsValidatorGoodSolution(mockString3));
    console.log('Mock string 4, valid: ' + bracketsValidatorGoodSolution(mockString4));
    console.log('Mock string 5, valid: ' + bracketsValidatorGoodSolution(mockString5));
    console.log('Mock string 6, valid: ' + bracketsValidatorGoodSolution(mockString6));

    console.log('');
    console.log('Best solution');
    console.log('');

    console.log('Mock string 1, valid: ' + bracketsValidatorBestSolution(mockString1));
    console.log('Mock string 2, valid: ' + bracketsValidatorBestSolution(mockString2));
    console.log('Mock string 3, valid: ' + bracketsValidatorBestSolution(mockString3));
    console.log('Mock string 4, valid: ' + bracketsValidatorBestSolution(mockString4));
    console.log('Mock string 5, valid: ' + bracketsValidatorBestSolution(mockString5));
    console.log('Mock string 6, valid: ' + bracketsValidatorBestSolution(mockString6));

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
