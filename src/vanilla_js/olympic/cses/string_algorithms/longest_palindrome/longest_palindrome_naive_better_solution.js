import { readFileSync } from 'node:fs';

const userSequence1 = '54321512346';

const csesSequence1 = 'aaaaaaaaaa';
const csesSequence2 = 'ababababab';
const csesSequence9 = 'ihpohpzoffel';
const csesSequence10 = 'flexflexvpqxierullgcfckjqflexflex';
const csesSequence12 = 'obsession';
const csesSequence13 = 'abcxcbaxcba';
const csesSequence14 = 'zzabc';
const csesSequence15 = 'aaccaabbaaccaaccaabbaaccaa';
const csesSequence17 = 'pan';
const csesSequence18 = 'a';
const csesSequence19 = 'abcdba';
const csesSequence20 = 'abb';

//const csesSequenceLarge = readFileSync('./test_input8.txt').toString();

function extractPalindrome(sequence, leftIdx, rightIdx) {
    const palindromePart = [];
    const isMiddle = (rightIdx - leftIdx) > 1;
    const sequenceLength = sequence.length;

    let leftValue = sequence[leftIdx];
    let rightValue = sequence[rightIdx];

    if (isMiddle) {
        palindromePart.push(sequence[leftIdx + 1]);
    }

    while (
            leftValue === rightValue &&
            leftIdx > -1 &&
            rightIdx < sequenceLength
        ) {
        palindromePart.push(rightValue);

        leftIdx -= 1;
        rightIdx += 1;

        leftValue = sequence[leftIdx];
        rightValue = sequence[rightIdx];
    }

    if (palindromePart.length > 0) {
        const palindromeCopy = isMiddle ? palindromePart.slice(1) : palindromePart.slice();
        return palindromeCopy.reverse().concat(palindromePart);
    } else {
        return [];
    }
}

function longestPalindromeNaiveBetterSolution(sequence) {
    const sequenceLength = sequence.length;

    let maxPalindromeLength = 0;
    let maxPalindrome = [];

    for (let possibleSeqLength = sequenceLength; possibleSeqLength > 1; possibleSeqLength--) {
        const numberOfSequences = (sequenceLength - possibleSeqLength) + 1;
        const possibleSeqHalfLength = Math.floor(possibleSeqLength / 2);

        let leftIdx = null;
        let rightIdx = null;

        if (possibleSeqLength % 2 > 0) {
            leftIdx = possibleSeqHalfLength - 1;
            rightIdx = leftIdx + 2;
        } else {
            leftIdx = possibleSeqHalfLength - 1;
            rightIdx = leftIdx + 1;
        }

        if (possibleSeqLength <= maxPalindromeLength) {
            return maxPalindrome.join('');
        }

        for (let idxShift = 0; idxShift < numberOfSequences; idxShift++) {
            const resultPalindrome = extractPalindrome(sequence, leftIdx + idxShift, rightIdx + idxShift);

            if (resultPalindrome.length === possibleSeqLength) {
                return resultPalindrome.join('');
            }

            if (resultPalindrome.length > maxPalindromeLength) {
                maxPalindromeLength = resultPalindrome.length;
                maxPalindrome = resultPalindrome;
            }
        }
    }

    return maxPalindromeLength > 1 ? maxPalindrome.join('') : sequence[0];
}


console.log(longestPalindromeNaiveBetterSolution(csesSequence10));
//aaccaabbaaccaaccaabbaaccaa - c
//aaccaabbaaccaaccaabbaaccaa





