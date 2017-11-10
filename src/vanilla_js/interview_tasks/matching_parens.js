'use strict';

// https://www.interviewcake.com/question/javascript/matching-parens
//
// Algorithm that tries to find position of closing parenthesis in a given string based on a given position of opened parentheses

// mock data
let testSentence1 = 'Sometimes (when I nest them (my parentheticals) too much (like this (and this))) they get confusing.';
let testSentence2 = 'Test ( some text ( some other text ) some more text )';

// best solution
const findClosingParenthesesPositionBestSolution = (sentenceToTest, openingParenthesesPosition) => {
    let sentenceLength = sentenceToTest.length;
    let openedParenthesisCount = 0;

    for (let charCounter = openingParenthesesPosition; charCounter < sentenceLength; charCounter++) {
        let currentLetter = sentenceToTest.charAt(charCounter);

        if (currentLetter === '(') {
            openedParenthesisCount++;
        } else if (currentLetter === ')') {
            openedParenthesisCount--;
        }

        if (openedParenthesisCount === 0) {
            return charCounter;
        }
    }

    return null;
};

console.log('Parenthesis matching');
console.log('====================');

console.log('');
console.log('Best solution');
console.log('');

console.log('Sentence 1, opening position - 10, closing position - ' + findClosingParenthesesPositionBestSolution(testSentence1, 10));
console.log('Sentence 1, opening position - 28, closing position - ' + findClosingParenthesesPositionBestSolution(testSentence1, 28));

console.log('');

console.log('Sentence 2, opening position - 5, closing position - ' + findClosingParenthesesPositionBestSolution(testSentence2, 5));
console.log('Sentence 2, opening position - 17, closing position - ' + findClosingParenthesesPositionBestSolution(testSentence2, 17));