const readline = require('readline');

let inputNumbersCount = null;

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

                if (subSequence.length >= currentSequence.length) {
                    sequences[sequenceIdx] = subSequence;
                } else {
                    sequences.push(subSequence);
                }
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

    return bestLength;
}

const readlineInstance = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

readlineInstance.on('line', (input) => {
    const inputValues = input.split(' ').map(value => parseInt(value));

    if (inputNumbersCount === null) {
        inputNumbersCount = inputValues[0];
    } else {
        const outputValue = longestIncreasingSubsequenceBetterSolutionOptimized(inputValues, inputNumbersCount);
        inputNumbersCount = null;
        console.log(outputValue);
    }
});
