const testNumbersSet1 = [6, 2, 5, 1, 7, 4, 8, 3];
const testNumbersSet2 = [6, 2, 5, 7, 4, 1, 8, 3];
const testNumbersSet3 = [6, 2, 5, 7, 1, 4, 8, 3];

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

        for(let sequenceIdx = 0; sequenceIdx < sequences.length; sequenceIdx++) {
            let currentSequence = sequences[sequenceIdx];
            let lastIndex = currentSequence.length - 1;

            numberOfSteps++;

            if (currentSequence[lastIndex] < currentDigit) {
                currentSequence.push(currentDigit);
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

console.log('Brackets validation');
console.log('===================');
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
