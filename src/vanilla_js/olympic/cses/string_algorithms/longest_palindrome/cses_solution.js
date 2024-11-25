const readline = require('readline');

function composePalindrome([length, middle, palindromePart1, palindromePart2]) {
    if (length <= 0) {
        return null;
    }

    if (length === 1) {
        return palindromePart1[0];
    }

    if (palindromePart2 !== null) {
        const fullRightPartCopy = palindromePart2.concat(palindromePart1.reverse()).slice();
        return (fullRightPartCopy.slice().reverse().concat(middle ? [middle] : [], fullRightPartCopy)).join('');
    } else {
        const palindromePart1Copy = palindromePart1.slice();
        return (palindromePart1Copy.reverse().concat(middle ? [middle] : [], palindromePart1)).join('');
    }
}

function extractPalindrome(sequence, possibleSeqLength, idxShift) {
    const possibleSeqHalfLength = Math.floor(possibleSeqLength / 2);

    let leftOuterIdx = idxShift;
    let rightOuterIdx = idxShift + (possibleSeqLength - 1);

    let leftInnerIdx = null;
    let rightInnerIdx = null;

    if (possibleSeqLength % 2 > 0) {
        leftInnerIdx = possibleSeqHalfLength - 1;
        rightInnerIdx = leftInnerIdx + 2;
    } else {
        leftInnerIdx = possibleSeqHalfLength - 1;
        rightInnerIdx = leftInnerIdx + 1;
    }

    leftInnerIdx += idxShift;
    rightInnerIdx += idxShift;

    let palindromePart1 = [];
    const palindromePart2 = [];

    const middle = (rightInnerIdx - leftInnerIdx) > 1 ? sequence[leftInnerIdx + 1] : null;
    const sequenceLength = sequence.length;

    let leftInnerValue = sequence[leftInnerIdx];
    let rightInnerValue = sequence[rightInnerIdx];

    let leftOuterValue = sequence[leftOuterIdx];
    let rightOuterValue = sequence[rightOuterIdx];

    while (
        leftInnerValue === rightInnerValue &&

        leftOuterIdx < leftInnerIdx &&
        rightOuterIdx > rightInnerIdx &&

        leftInnerIdx > -1 &&
        rightInnerIdx < sequenceLength
        ) {

        if (leftOuterValue === rightOuterValue) {
            palindromePart1.push(leftOuterValue);
        } else {
            if (palindromePart1.length > 0) {
                palindromePart1 = [];
            }
        }

        palindromePart2.push(rightInnerValue);

        leftOuterIdx += 1;
        rightOuterIdx -= 1;

        leftInnerIdx -= 1;
        rightInnerIdx += 1;

        leftOuterValue = sequence[leftOuterIdx];
        rightOuterValue = sequence[rightOuterIdx];

        leftInnerValue = sequence[leftInnerIdx];
        rightInnerValue = sequence[rightInnerIdx];
    }

    if ((possibleSeqLength === 2 || possibleSeqLength === 3) && leftInnerValue === rightInnerValue) {
        palindromePart2.push(rightInnerValue);
    } else if (leftOuterIdx === leftInnerIdx && leftOuterValue === rightOuterValue) {
        palindromePart2.push(leftOuterValue);
    }

    let palindromeLengthWithoutMiddle = (palindromePart1.length + palindromePart2.length) * 2;

    if (palindromePart2.length > 0) {
        if ((middle && palindromeLengthWithoutMiddle + 1 === possibleSeqLength) || (!middle && palindromeLengthWithoutMiddle === possibleSeqLength)) {
            return [possibleSeqLength, middle, palindromePart1, palindromePart2];
        } else {
            return [(palindromePart2.length * 2) + (middle ? 1 : 0), middle, palindromePart2, null];
        }
    } else {
        return possibleSeqLength === 1 ? [1, null, [sequence[idxShift]]] : [0];
    }
}

function binarySearchLikePalindromeNaiveSolution(sequence) {
    const sequenceLength = sequence.length;
    const isSequenceOdd = sequenceLength % 2 > 0;

    let upperOddBoundary = isSequenceOdd ? sequenceLength : sequenceLength - 1;
    let upperEvenBoundary = isSequenceOdd ? sequenceLength - 1 : sequenceLength;

    let lowerOddBoundary = 1;
    let lowerEvenBoundary = 1;

    let oddMiddle = null;
    let evenMiddle = null;

    let maxOddPalindromeLength = 0;
    let maxEvenPalindromeLength = 0;

    let maxOddPalindromeData = [];
    let maxEvenPalindromeData = [];

    let maxOddPalindromeDataBuffer = [];
    let maxEvenPalindromeDataBuffer = [];

    while (
        (!((lowerOddBoundary === upperOddBoundary) && lowerOddBoundary  === oddMiddle)) &&
        (!((lowerEvenBoundary === upperEvenBoundary) && lowerEvenBoundary === evenMiddle))
        ) {
        if (!((lowerEvenBoundary === upperEvenBoundary) && lowerEvenBoundary === evenMiddle)) {
            evenMiddle = Math.floor(lowerEvenBoundary + ((upperEvenBoundary - lowerEvenBoundary) / 2));
            evenMiddle = evenMiddle % 2 === 0 ? evenMiddle : evenMiddle + 1;

            let numberOfEvenSequences = (sequenceLength - evenMiddle) + 1;

            let currentMaxEvenPalindromeLength = 0;
            let currentMaxEvenPalindromeData = [];

            for (let idxShift = 0; idxShift < numberOfEvenSequences; idxShift++) {
                const resultPalindromeData = extractPalindrome(sequence, evenMiddle, idxShift);

                if (resultPalindromeData[0] > currentMaxEvenPalindromeLength) {
                    currentMaxEvenPalindromeLength = resultPalindromeData[0];
                    currentMaxEvenPalindromeData = resultPalindromeData;

                    if (currentMaxEvenPalindromeLength === evenMiddle) {
                        maxEvenPalindromeDataBuffer.push(currentMaxEvenPalindromeData);
                    }
                }
            }

            if (currentMaxEvenPalindromeLength > 0) {
                if (currentMaxEvenPalindromeLength > maxEvenPalindromeLength) {
                    maxEvenPalindromeLength = currentMaxEvenPalindromeLength;
                    maxEvenPalindromeData = currentMaxEvenPalindromeData;
                }

                if (currentMaxEvenPalindromeLength === evenMiddle) {
                    if (upperEvenBoundary - lowerEvenBoundary === 2) {
                        lowerEvenBoundary = upperEvenBoundary;
                    } else {
                        lowerEvenBoundary = evenMiddle;
                    }
                } else {
                    lowerEvenBoundary = evenMiddle;
                    lowerEvenBoundary = upperEvenBoundary;
                }
            } else {
                if (upperEvenBoundary - lowerEvenBoundary === 2) {
                    upperEvenBoundary = lowerEvenBoundary;
                } else {
                    upperEvenBoundary = evenMiddle;
                }
            }
        }

        if (!((lowerOddBoundary === upperOddBoundary) && lowerOddBoundary === oddMiddle)) {
            oddMiddle = Math.floor(lowerOddBoundary + ((upperOddBoundary - lowerOddBoundary) / 2));
            oddMiddle = oddMiddle % 2 === 0 ? oddMiddle + 1 : oddMiddle;

            let numberOfOddSequences = (sequenceLength - oddMiddle) + 1;

            let currentMaxOddPalindromeLength = 0;
            let currentMaxOddPalindromeData = [];

            for (let idxShift = 0; idxShift < numberOfOddSequences; idxShift++) {
                const resultPalindromeData = extractPalindrome(sequence, oddMiddle, idxShift);

                if (resultPalindromeData[0] > currentMaxOddPalindromeLength) {
                    currentMaxOddPalindromeLength = resultPalindromeData[0];
                    currentMaxOddPalindromeData = resultPalindromeData;

                    if (currentMaxOddPalindromeLength === oddMiddle) {
                        break;
                    }
                }
            }

            if (currentMaxOddPalindromeLength > 0) {
                if (currentMaxOddPalindromeLength > maxOddPalindromeLength) {
                    maxOddPalindromeLength = currentMaxOddPalindromeLength;
                    maxOddPalindromeData = currentMaxOddPalindromeData;
                }

                if (currentMaxOddPalindromeLength === oddMiddle) {
                    if (upperOddBoundary - lowerOddBoundary === 2) {
                        lowerOddBoundary = upperOddBoundary;
                    } else {
                        lowerOddBoundary = oddMiddle;
                    }
                } else {
                    lowerOddBoundary = oddMiddle;
                    lowerOddBoundary = upperOddBoundary;
                }
            } else {
                if (upperOddBoundary - lowerOddBoundary === 2) {
                    upperOddBoundary = lowerOddBoundary;
                } else {
                    upperOddBoundary = oddMiddle;
                }
            }
        }
    }

    if (maxOddPalindromeLength > maxEvenPalindromeLength) {
        return composePalindrome(maxOddPalindromeData)
    } else {
        return composePalindrome(maxEvenPalindromeData);
    }
}

const readlineInstance = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

readlineInstance.on('line', (input) => {
    console.log(binarySearchLikePalindromeNaiveSolution(input));
});
