const readline = require('readline');

let inputNumbersCount = null;

function missingNumberNaiveSolution(testNumbers, countNumbers) {
    let realSum = 0;
    let notFullSum = 0;

    for (let numIdx = 0; numIdx < testNumbers.length; numIdx++) {
        realSum += numIdx + 1;
        notFullSum += testNumbers[numIdx];
    }

    realSum += countNumbers;

    return realSum - notFullSum;
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
        const outputValue = missingNumberNaiveSolution(inputValues, inputNumbersCount);
        inputNumbersCount = null;
        console.log(outputValue);
    }
});
