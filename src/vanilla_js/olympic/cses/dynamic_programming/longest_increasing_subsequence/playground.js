const testNumbersSet1 = [6, 2, 5, 1, 7, 4, 8, 3];
const testNumbersSet2 = [6, 2, 5, 7, 4, 1, 8, 3];
const testNumbersSet3 = [6, 2, 5, 7, 1, 4, 8, 3];

const csesNumbersSet1 = [3, 8, 3, 8, 1, 5, 10, 5, 8, 10];

const csesNumbersSet1Add1 = [3, 8, 3, 8, 1, 7, 10, 5, 8, 10];
const csesNumbersSet1Add2 = [3, 8, 3, 8, 1, 9, 3, 4, 9, 8, 5, 7, 10, 5, 8, 10];

// TODO: none-working solution (see csesNumbersSet1)
function longestIncreasingSubsequenceNaiveSolution(testArray, length) {
    const sequences = [];

    length = length > testArray.length ? testArray.length : length;
    length = length < 0 ? 0 : length;

    let currentLength = 0;
    let bestLength = 0;
    let bestSequenceIdx = null;
    let numberOfSteps = 0;

    for (let startIdx = 0; startIdx < length; startIdx++) {
        let startDigit = testArray[startIdx];

        numberOfSteps++;
        currentLength = 1;
        sequences[startIdx] = [startDigit];

        for(let endIdx = startIdx + 1; endIdx < length; endIdx++) {
            numberOfSteps++;
            const endDigit = testArray[endIdx];

            if (endDigit > startDigit) {
                currentLength += 1;
                sequences[startIdx].push(endDigit);
                startDigit = endDigit;
            }
        }

        if (currentLength > bestLength) {
            bestLength = currentLength;
            bestSequenceIdx = startIdx;
        }
    }

    return {
        numberOfSteps,
        sequences,
        bestLength,
        bestSequenceIdx,
    };
}

/*

for (int k = 0; k < n; k++) {
    length[k] = 1;
    for (int i = 0; i < k; i++) {
        if (array[i] < array[k]) {
            length[k] = max(length[k],length[i]+1);
        }
    }
}

*/

//console.log(test1(testArray1, 7));

function longestIncreasingSubsequenceBetterSolution(testArray, length) {
    const sequences = [];

    let bestLength = 0;
    let bestSequenceIdx = null;
    let lowestNumber = null;

    length = length > testArray.length ? testArray.length : length;
    length = length < 0 ? 0 : length;

    let numberOfSteps = 0;

    for (let startIdx = 0; startIdx < length; startIdx++) {
        const currentDigit = testArray[startIdx];
        numberOfSteps++;

        const sequencesCount = sequences.length;

        for(let sequenceIdx = 0; sequenceIdx < sequencesCount; sequenceIdx++) {
            let currentSequence = sequences[sequenceIdx];
            let lastIndex = currentSequence.length - 1;

            numberOfSteps++;

            if (currentSequence[lastIndex] < currentDigit) {
                currentSequence.push(currentDigit);
            } else if (
                currentSequence.length > 1 &&
                currentSequence[lastIndex] > currentDigit &&
                currentSequence[0] < currentDigit
            ) {
                let subSequence = [currentSequence[0]];
                let subSequenceIdx = 1;
                let currentSequenceDigit = currentSequence[subSequenceIdx];

                while(subSequenceIdx < startIdx && currentSequenceDigit < currentDigit) {
                    numberOfSteps++;

                    subSequence.push(currentSequenceDigit);

                    subSequenceIdx++;
                    currentSequenceDigit = currentSequence[subSequenceIdx];
                }

                subSequence.push(currentDigit);
                sequences.push(subSequence);
            }

            if (currentSequence.length > bestLength) {
                bestLength = currentSequence.length;
                bestSequenceIdx = sequenceIdx;
            }
        }

        if (lowestNumber === null) {
            lowestNumber = currentDigit;
            sequences.push([currentDigit]);
        } else if (lowestNumber > currentDigit) {
            if (length - startIdx > bestLength) {
                lowestNumber = currentDigit;
                sequences.push([currentDigit]);
            }
        }
    }

    return {
        numberOfSteps,
        sequences,
        bestLength,
        bestSequenceIdx,
    }
}

function longestIncreasingSubsequenceBetterSolutionOptimized(testArray, length) {
    const sequences = [];

    let bestLength = 0;
    let bestSequenceIdx = null;
    let lowestNumber = null;

    length = length > testArray.length ? testArray.length : length;
    length = length < 0 ? 0 : length;

    let numberOfSteps = 0;

    for (let startIdx = 0; startIdx < length; startIdx++) {
        const currentDigit = testArray[startIdx];
        numberOfSteps++;

        const sequencesCount = sequences.length;

        for(let sequenceIdx = 0; sequenceIdx < sequencesCount; sequenceIdx++) {
            let currentSequence = sequences[sequenceIdx];
            numberOfSteps++;

            if (testArray[currentSequence.endIdx] < currentDigit) {
                currentSequence.endIdx = startIdx;
                currentSequence.length++;
            } else if (
                currentSequence.length > 1 &&
                testArray[currentSequence.endIdx] > currentDigit &&
                testArray[currentSequence.startIdx] < currentDigit
            ) {
                let subSequence = {
                    startIdx: currentSequence.startIdx,
                    endIdx: startIdx,
                    length: 1,
                };

                let currentSequenceDigit = null;

                const startDigit = testArray[currentSequence.startIdx];

                let prevSubSequenceDigitIndex = currentSequence.endIdx;
                let prevSubSequenceDigit = testArray[prevSubSequenceDigitIndex];


                while(
                    prevSubSequenceDigitIndex > currentSequence.startIdx + 1
                    ) {
                    if (
                        prevSubSequenceDigit > testArray[prevSubSequenceDigitIndex--] &&
                        testArray[prevSubSequenceDigitIndex--] >= startDigit
                    ) {
                        prevSubSequenceDigitIndex--;
                        prevSubSequenceDigit = testArray[prevSubSequenceDigitIndex];
                        subSequence.length++;
                    } else {
                        prevSubSequenceDigitIndex--;
                    }
                }

                console.log('^^', currentSequence.startIdx, currentSequence.endIdx, currentSequence.length);
                console.log('##', testArray[currentSequence.startIdx], testArray[currentSequence.endIdx], currentSequence.length);
console.log('**', testArray[currentSequence.endIdx],'>', currentDigit);
console.log('--', testArray[currentSequence.startIdx], prevSubSequenceDigit, `(${prevSubSequenceDigitIndex})`);

             //   currentSequenceDigit = nextSubSequenceDigit;
             //   subSequence.endIdx = nextSubSequenceDigitIndex;
console.log('%%', subSequence);
               /* while(nextSubSequenceDigitIndex < startIdx && currentSequenceDigit < currentDigit) {
                    numberOfSteps++;

                    subSequence.length += 1;
                    nextSubSequenceDigitIndex++;
                    currentSequenceDigit = currentSequence[subSequenceIdx];
                }


                if (subSequence.length >= currentSequence.length) {
                    sequences[sequenceIdx] = subSequence;
                } else {
                    sequences.push(subSequence);
                }*/
            }

            if (currentSequence.length > bestLength) {
                bestLength = currentSequence.length;
                bestSequenceIdx = sequenceIdx;
            }
        }

        if (lowestNumber === null) {
            lowestNumber = currentDigit;
            sequences.push({
                startIdx,
                endIdx: startIdx,
                length: 1,
            });
        } else if (lowestNumber > currentDigit) {
            if (length - startIdx > bestLength) {
                lowestNumber = currentDigit;
                sequences.push({
                    startIdx,
                    endIdx: startIdx,
                    length: 1,
                });
            }
        }
    }

    return {
        numberOfSteps,
        sequences,
        bestLength,
        bestSequenceIdx,
    }
}

console.log('Longest increasing subsequence');
console.log('==============================');
console.log('');

console.log('Naive solution');
console.log('--------------');
console.log('');

let result = longestIncreasingSubsequenceNaiveSolution(testNumbersSet1, 8);

console.log('Longest increasing subsequence - naive solution (case 1, length 8)');
console.log('Best length:' , result.bestLength, '; Number of steps:', result.numberOfSteps);
console.log('');

result = longestIncreasingSubsequenceNaiveSolution(testNumbersSet2, 8);

console.log('Longest increasing subsequence - naive solution (case 2, length 8)');
console.log('Best length:' , result.bestLength, '; Number of steps:', result.numberOfSteps);
console.log('');

result = longestIncreasingSubsequenceNaiveSolution(testNumbersSet3, 8);

console.log('Longest increasing subsequence - naive solution (case 3, length 8)');
console.log('Best length:' , result.bestLength, '; Number of steps:', result.numberOfSteps);
console.log('');

console.log('Better solution');
console.log('---------------');
console.log('');

result = longestIncreasingSubsequenceBetterSolution(testNumbersSet1, 8);

console.log('Longest increasing subsequence - better solution (case 1, length 8)');
console.log('Best length:' , result.bestLength, '; Number of steps:', result.numberOfSteps);
console.log('');

result = longestIncreasingSubsequenceBetterSolution(testNumbersSet2, 8);

console.log('Longest increasing subsequence - better solution (case 2, length 8)');
console.log('Best length:' , result.bestLength, '; Number of steps:', result.numberOfSteps);
console.log('');

result = longestIncreasingSubsequenceBetterSolution(testNumbersSet3, 8);

console.log('Longest increasing subsequence - better solution (case 3, length 8)');
console.log('Best length:' , result.bestLength, '; Number of steps:', result.numberOfSteps);
console.log('');

result = longestIncreasingSubsequenceBetterSolution(csesNumbersSet1, 10);

console.log('Longest increasing subsequence - better solution (case 1, length 10, cses 1)');
console.log('Best length:' , result.bestLength, '; Number of steps:', result.numberOfSteps);
console.log('');

result = longestIncreasingSubsequenceBetterSolution(csesNumbersSet1Add1, 10);

console.log('Longest increasing subsequence - better solution (case 2, length 10, cses 1 add1)');
console.log('Best length:' , result.bestLength, '; Number of steps:', result.numberOfSteps);
console.log('');

console.log('Better solution (optimized)');
console.log('---------------------------');
console.log('');

result = longestIncreasingSubsequenceBetterSolutionOptimized(testNumbersSet1, 8);

console.log('Longest increasing subsequence - better solution (case 1, length 8)');
console.log('Best length:' , result.bestLength, '; Number of steps:', result.numberOfSteps);
console.log('');

result = longestIncreasingSubsequenceBetterSolutionOptimized(testNumbersSet2, 8);

console.log('Longest increasing subsequence - better solution (case 2, length 8)');
console.log('Best length:' , result.bestLength, '; Number of steps:', result.numberOfSteps);
console.log('');

result = longestIncreasingSubsequenceBetterSolutionOptimized(testNumbersSet3, 8);

console.log('Longest increasing subsequence - better solution (case 3, length 8)');
console.log('Best length:' , result.bestLength, '; Number of steps:', result.numberOfSteps);
console.log('');

result = longestIncreasingSubsequenceBetterSolutionOptimized(csesNumbersSet1, 10);

console.log('Longest increasing subsequence - better solution (case 1, length 10, cses 1)');
console.log('Best length:' , result.bestLength, '; Number of steps:', result.numberOfSteps);
console.log('');

result = longestIncreasingSubsequenceBetterSolutionOptimized(csesNumbersSet1Add1, 10);

console.log('Longest increasing subsequence - better solution (case 2, length 10, cses 1 add1)');
console.log('Best length:' , result.bestLength, '; Number of steps:', result.numberOfSteps);
console.log('');

console.log(result);
