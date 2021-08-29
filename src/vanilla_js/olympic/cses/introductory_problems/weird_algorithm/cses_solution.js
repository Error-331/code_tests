const readline = require('readline');

function weirdAlgorithmNaiveSolution(number) {
    const numbers = [];
    numbers.push(number);

    while(number !== 1) {
        number = number % 2 === 0 ? number / 2 : (number * 3) + 1;
        numbers.push(number);
    }

    return numbers;
}

const readlineInstance = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

readlineInstance.on('line', (input) => {
    const inputValues = input.split(' ').map(value => parseInt(value));
    const outputValue = weirdAlgorithmNaiveSolution(inputValues[0]).join(' ');

    console.log(outputValue);
});
