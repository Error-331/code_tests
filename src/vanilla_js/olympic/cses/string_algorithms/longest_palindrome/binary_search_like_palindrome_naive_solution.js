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
    let evenMiddle = lowerEvenBoundary + ((upperEvenBoundary - lowerEvenBoundary) / 2);

    let maxOddPalindromeLength = 0;
    let maxEvenPalindromeLength = 0;

    let maxOddPalindromeData = [];
    let maxEvenPalindromeData = [];

    while (
        (!((lowerOddBoundary === upperOddBoundary) && lowerOddBoundary  === oddMiddle)) &&
        (!((lowerEvenBoundary === upperEvenBoundary) && lowerEvenBoundary === evenMiddle))
        ) {

        if (!((lowerEvenBoundary === upperEvenBoundary) && lowerEvenBoundary === evenMiddle)) {
            evenMiddle = Math.floor(lowerEvenBoundary + ((upperEvenBoundary - lowerEvenBoundary) / 2));
            evenMiddle = evenMiddle % 2 === 0 ? evenMiddle : evenMiddle + 1;

            let numberOfEvenSequences = (sequenceLength - evenMiddle) + 1;
            let prevMaxEvenPalindromeLength = maxEvenPalindromeLength;

            for (let idxShift = 0; idxShift < numberOfEvenSequences; idxShift++) {
                const resultPalindromeData = extractPalindrome(sequence, evenMiddle, idxShift);

                if (resultPalindromeData[0] > maxEvenPalindromeLength) {
                    maxEvenPalindromeLength = resultPalindromeData[0];
                    maxEvenPalindromeData = resultPalindromeData;

                    if (upperEvenBoundary - lowerEvenBoundary === 2) {
                        lowerEvenBoundary = upperEvenBoundary;
                    } else {
                        lowerEvenBoundary = evenMiddle;
                    }

                    break;
                }
            }

            if (prevMaxEvenPalindromeLength === maxEvenPalindromeLength) {
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
            let prevMaxOddPalindromeLength = maxOddPalindromeLength;

            for (let idxShift = 0; idxShift < numberOfOddSequences; idxShift++) {
                const resultPalindromeData = extractPalindrome(sequence, oddMiddle, idxShift);

                if (resultPalindromeData[0] > maxOddPalindromeLength) {
                    maxOddPalindromeLength = resultPalindromeData[0];
                    maxOddPalindromeData = resultPalindromeData;

                    if (upperOddBoundary - lowerOddBoundary === 2) {
                        lowerOddBoundary = upperOddBoundary;
                    } else {
                        lowerOddBoundary = oddMiddle;
                    }

                    break;
                }
            }

            if (prevMaxOddPalindromeLength === maxOddPalindromeLength) {
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

export default binarySearchLikePalindromeNaiveSolution;