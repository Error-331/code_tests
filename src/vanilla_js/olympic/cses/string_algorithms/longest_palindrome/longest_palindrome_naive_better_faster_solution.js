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

    const palindromePart1 = [];
    const palindromePart2 = [];

    const middle = (rightInnerIdx - leftInnerIdx) > 1 ? sequence[leftInnerIdx + 1] : null;
    const sequenceLength = sequence.length;

    let leftInnerValue = sequence[leftInnerIdx];
    let rightInnerValue = sequence[rightInnerIdx];

    let leftOuterValue = sequence[leftOuterIdx];
    let rightOuterValue = sequence[rightOuterIdx];

    while (
        leftOuterValue === rightOuterValue &&
        leftInnerValue === rightInnerValue &&

        leftOuterIdx < leftInnerIdx &&
        rightOuterIdx > rightInnerIdx &&

        leftInnerIdx > -1 &&
        rightInnerIdx < sequenceLength
        ) {
        palindromePart1.push(leftOuterValue);
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
        let result = [];

        if (middle) {
            result.push(middle);
        }

        const palindromeCopy2 = palindromePart2.slice();

        if ((middle && palindromeLengthWithoutMiddle + 1 === possibleSeqLength) || (!middle && palindromeLengthWithoutMiddle === possibleSeqLength)) {
            const fullRightPartCopy = palindromePart2.concat(palindromePart1.reverse()).slice();
            return fullRightPartCopy.slice().reverse().concat(result, fullRightPartCopy);
        } else {
            return palindromeCopy2.reverse().concat(result, palindromePart2);
        }
    } else {
        return [];
    }
}

function longestPalindromeNaiveBetterFasterSolution(sequence) {
    const sequenceLength = sequence.length;

    let maxPalindromeLength = 0;
    let maxPalindrome = [];

    for (let possibleSeqLength = sequenceLength; possibleSeqLength > 1; possibleSeqLength--) {
        const numberOfSequences = (sequenceLength - possibleSeqLength) + 1;

        if (possibleSeqLength <= maxPalindromeLength) {
            return maxPalindrome.join('');
        }

        for (let idxShift = 0; idxShift < numberOfSequences; idxShift++) {
            const resultPalindrome = extractPalindrome(sequence, possibleSeqLength, idxShift);

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

export default longestPalindromeNaiveBetterFasterSolution;