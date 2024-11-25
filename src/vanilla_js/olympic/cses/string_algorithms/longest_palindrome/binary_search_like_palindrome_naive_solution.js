function extractPalindrome(sequence, possibleSeqLength, currentMaxSeqLength, idxShift, palindromeMap) {
    const possibleSeqHalfLength = Math.floor(possibleSeqLength / 2);
    const sequenceLength = sequence.length;

    let leftInnerIdx = possibleSeqHalfLength - 1;
    let rightInnerIdx = possibleSeqLength % 2 > 0 ? leftInnerIdx + 2 : leftInnerIdx + 1;

    leftInnerIdx += idxShift;
    rightInnerIdx += idxShift;

    const palindromeMapIdx  = `${leftInnerIdx}-${rightInnerIdx}`;

    let palindromePart = [];
    let middle = null;

    if (palindromeMap.has(palindromeMapIdx)) {
        const palindromeData = palindromeMap.get(palindromeMapIdx);

        if (palindromeData[0] === 0) {
            return palindromeData;
        }

        middle = palindromeData[1];

        leftInnerIdx = palindromeData[4][0];
        rightInnerIdx = palindromeData[4][1];

        palindromePart = palindromeData[2];
    } else {
        middle = (rightInnerIdx - leftInnerIdx) > 1 ? sequence[leftInnerIdx + 1] : null;
    }

    let leftInnerValue = sequence[leftInnerIdx];
    let rightInnerValue = sequence[rightInnerIdx];

    while (
        leftInnerValue === rightInnerValue &&

        leftInnerIdx > -1 &&
        rightInnerIdx < sequenceLength
        ) {
        palindromePart.push(rightInnerValue);

        leftInnerIdx -= 1;
        rightInnerIdx += 1;

        leftInnerValue = sequence[leftInnerIdx];
        rightInnerValue = sequence[rightInnerIdx];
    }

    const palindromeDataIndexes = [leftInnerIdx, rightInnerIdx];
    let palindromeData;

    if (palindromePart.length > 0) {
        palindromeData = [(palindromePart.length * 2) + (middle ? 1 : 0), middle, palindromePart, possibleSeqLength, palindromeDataIndexes];
    } else {
        palindromeData = possibleSeqLength === 1 ? [1, null, [sequence[idxShift]], possibleSeqLength, palindromeDataIndexes] : [0];
    }

    palindromeMap.set(palindromeMapIdx, palindromeData)
    return palindromeData;
}

function calcMiddlePossibleSequenceLength(isOddGenerator, lowerBoundary, upperBoundary) {
    const middlePossibleSequenceLength = Math.floor(lowerBoundary + ((upperBoundary - lowerBoundary) / 2));

    if (isOddGenerator) {
        return middlePossibleSequenceLength % 2 === 0 ? middlePossibleSequenceLength + 1 : middlePossibleSequenceLength;
    } else {
        return middlePossibleSequenceLength % 2 === 0 ? middlePossibleSequenceLength : middlePossibleSequenceLength + 1;
    }
}

function *searchSequencePartGenerator(isOddGenerator, sequence, palindromeMap) {
    const sequenceLength = sequence.length;
    const isSequenceOdd = sequenceLength % 2 > 0;

    let upperBoundary = null;
    let lowerBoundary = 1;
    let middlePossibleSequenceLength = null;

    if (isOddGenerator) {
        upperBoundary = isSequenceOdd ? sequenceLength : sequenceLength - 1;
    } else {
        upperBoundary = isSequenceOdd ? sequenceLength - 1 : sequenceLength;
    }

    let maxPalindromeLength = 0;
    let maxPalindromeData = null;

    while (lowerBoundary !== upperBoundary) {
        middlePossibleSequenceLength = calcMiddlePossibleSequenceLength(isOddGenerator, lowerBoundary, upperBoundary);

        let numberOfSequences = (sequenceLength - middlePossibleSequenceLength) + 1;

        let currentMaxPalindromeLength = 0;
        let currentMaxPalindromeData = null;

        let idxShiftLeft = Math.floor(numberOfSequences / 2) - 1;
        let idxShiftRight = idxShiftLeft + 1;

        while (idxShiftLeft > -1 || idxShiftRight < numberOfSequences) {
            if (idxShiftLeft > -1) {
                const resultPalindromeData = extractPalindrome(sequence, middlePossibleSequenceLength, maxPalindromeLength, idxShiftLeft, palindromeMap);

                if (resultPalindromeData[0] === upperBoundary) {
                    return resultPalindromeData;
                }

                if (resultPalindromeData[0] > currentMaxPalindromeLength) {
                    currentMaxPalindromeLength = resultPalindromeData[0];
                    currentMaxPalindromeData = resultPalindromeData;
                }

                idxShiftLeft -= 1;
            }

            if (idxShiftRight < numberOfSequences) {
                const resultPalindromeData = extractPalindrome(sequence, middlePossibleSequenceLength, maxPalindromeLength, idxShiftRight, palindromeMap);

                if (resultPalindromeData[0] === upperBoundary) {
                    return resultPalindromeData;
                }

                if (resultPalindromeData[0] > currentMaxPalindromeLength) {
                    currentMaxPalindromeLength = resultPalindromeData[0];
                    currentMaxPalindromeData = resultPalindromeData;
                }

                idxShiftRight += 1;
            }
        }

        if (currentMaxPalindromeLength > maxPalindromeLength) {
            maxPalindromeLength = currentMaxPalindromeLength;
            maxPalindromeData = currentMaxPalindromeData;

            if (currentMaxPalindromeLength === middlePossibleSequenceLength) {
                if (upperBoundary - lowerBoundary === 2) {
                    lowerBoundary = upperBoundary;
                } else {
                    lowerBoundary = middlePossibleSequenceLength;
                }
            } else {
                upperBoundary = middlePossibleSequenceLength;
            }
        } else {
            if (upperBoundary - lowerBoundary <= 2) {
                upperBoundary = lowerBoundary;
            } else {
                upperBoundary = middlePossibleSequenceLength;
            }

            if (calcMiddlePossibleSequenceLength(isOddGenerator, lowerBoundary, upperBoundary) <= maxPalindromeLength) {
                return maxPalindromeData
            }
        }

        currentMaxPalindromeLength = 0;
        currentMaxPalindromeData = null;

        yield maxPalindromeData;
    }

    return maxPalindromeData;
}

function binarySearchLikePalindromeNaiveSolution(sequence) {
    const oddPalindromesMap = new Map();
    const evenPalindromesMap = new Map();

    const oddSearchPartGenerator = searchSequencePartGenerator(true, sequence, oddPalindromesMap);
    const evenSearchPartGenerator = searchSequencePartGenerator(false, sequence, evenPalindromesMap);

    let oddGeneratorResult;
    let evenGeneratorResult;

    const isSequenceOdd = sequence % 2 !== 0;

    if (isSequenceOdd) {
        oddGeneratorResult = oddSearchPartGenerator.next();
        evenGeneratorResult = evenSearchPartGenerator.next();
    } else {
        evenGeneratorResult = evenSearchPartGenerator.next();
        oddGeneratorResult = oddSearchPartGenerator.next();
    }

    while(!(oddGeneratorResult.done && evenGeneratorResult.done)) {
        if (isSequenceOdd) {
            oddGeneratorResult = oddGeneratorResult.done ? oddGeneratorResult : oddSearchPartGenerator.next();
            evenGeneratorResult = evenGeneratorResult.done ? evenGeneratorResult : evenSearchPartGenerator.next();
        } else {
            evenGeneratorResult = evenGeneratorResult.done ? evenGeneratorResult : evenSearchPartGenerator.next();
            oddGeneratorResult = oddGeneratorResult.done ? oddGeneratorResult : oddSearchPartGenerator.next();
        }
    }

    oddGeneratorResult.value = oddGeneratorResult.value === null ? [1, null, [sequence[0]]] : oddGeneratorResult.value;
    evenGeneratorResult.value = evenGeneratorResult.value === null ? [1, null, [sequence[0]]] : evenGeneratorResult.value;

    const palindromeData = oddGeneratorResult.value[0] > evenGeneratorResult.value[0] ? oddGeneratorResult.value : evenGeneratorResult.value;

    if (palindromeData[0] === 1) {
        return palindromeData[2][0];
    } else {
        const fullRightPartCopy = palindromeData[2].slice();
        return (fullRightPartCopy.slice().reverse().concat(palindromeData[1] ? palindromeData[1] : [], fullRightPartCopy)).join('');
    }
}

export default binarySearchLikePalindromeNaiveSolution;