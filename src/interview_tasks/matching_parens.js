'use strict';

// https://www.interviewcake.com/question/javascript/matching-parens
//
// Algorithm that tries to find position of closing parenthesis in a given string based on a given position of opened parentheses

// mock data
let testSentence1 = 'Sometimes (when I nest them (my parentheticals) too much (like this (and this))) they get confusing.';

// best solution
const findClosingParenthesesPositionNotBestSolution = (sentenceToTest, openingParenthesesPosition) => {
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
}

console.log(findClosingParenthesesPositionNotBestSolution(testSentence1, 10));