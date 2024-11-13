function composePalindrome([length, middle, palindromePart1, palindromePart2]) {
    if (length <= 0) {
        return null;
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
        return [0];
    }
}

function longestPalindromeNaiveBetterFasterSolution(sequence) {
    const sequenceLength = sequence.length;

    let maxPalindromeLength = 0;
    let maxPalindromeData = [];

    for (let possibleSeqLength = sequenceLength; possibleSeqLength > 1; possibleSeqLength--) {
        const numberOfSequences = (sequenceLength - possibleSeqLength) + 1;

        if (possibleSeqLength <= maxPalindromeLength) {
            return composePalindrome(maxPalindromeData);
        }

        for (let idxShift = 0; idxShift < numberOfSequences; idxShift++) {
            const resultPalindromeData = extractPalindrome(sequence, possibleSeqLength, idxShift);

            if (resultPalindromeData[0] === possibleSeqLength) {
                return composePalindrome(resultPalindromeData);
            }

            if (resultPalindromeData[0] > maxPalindromeLength) {
                maxPalindromeLength = resultPalindromeData[0];
                maxPalindromeData = resultPalindromeData;
            }
        }
    }

    return maxPalindromeLength > 1 ? composePalindrome(maxPalindromeData) : sequence[0];
}

export default longestPalindromeNaiveBetterFasterSolution;