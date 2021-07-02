const readline = require('readline');

let inputNumbersCount = null;

function permutationNaiveSolution(numbersCount) {
    if (numbersCount > 1 && numbersCount < 4) {
        return 'NO SOLUTION';
    }
    else if (numbersCount === 4) {
        return [2, 4, 1, 3].join(' ');
    } else {
        const result = [];

        const isNoMiddleValue = numbersCount % 2 === 0;
        const limit = isNoMiddleValue ? numbersCount / 2 : (numbersCount - 1) / 2;

        for (let counter1 = limit; counter1 > 0; counter1 -= 1) {
            result.push(counter1 * 2);
        }

        if (!isNoMiddleValue) {
            result.push(numbersCount);
        }

        for (let counter1 = limit; counter1 > 0; counter1 -= 1) {
            result.push((counter1 * 2) - 1);
        }

        return result.join(' ');
    }
}

const readlineInstance = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

readlineInstance.on('line', (input) => {
    const inputValue = parseInt(input);
    console.log(permutationNaiveSolution(inputValue));
});
