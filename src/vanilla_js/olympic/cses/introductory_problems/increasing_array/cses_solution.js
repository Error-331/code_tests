const readline = require('readline');

let inputNumbersCount = null;

function increasingArrayBetterNaiveSolution(testNumbers, numbersCount) {
    if (numbersCount === 1) {
        return 0;
    }

    let numberOfSteps = 0;

    for (let numberIdx = 0; numberIdx < numbersCount; numberIdx++) {
        if (numberIdx + 1 > numbersCount) {
            return numberOfSteps;
        }

        const leftNumber = testNumbers[numberIdx];
        const rightNumber = testNumbers[numberIdx + 1];

        if (rightNumber < leftNumber) {
            numberOfSteps += leftNumber - rightNumber;
            testNumbers[numberIdx + 1] = leftNumber;
        }
    }

    return numberOfSteps;
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
        const outputValue = increasingArrayBetterNaiveSolution(inputValues, inputNumbersCount);
        inputNumbersCount = null;
        console.log(outputValue);
    }
});
