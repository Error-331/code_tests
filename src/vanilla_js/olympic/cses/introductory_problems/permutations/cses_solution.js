const readline = require('readline');

function permutationNaiveOptimizedSolution(numbersCount) {
    if (numbersCount > 1 && numbersCount < 4) {
        return 'NO SOLUTION';
    } else if (numbersCount === 4) {
        return [2, 4, 1, 3].join(' ');
    } else {
        const result = new Array(numbersCount);

        const isNoMiddleValue = numbersCount % 2 === 0;
        const limit = isNoMiddleValue ? numbersCount / 2 : (numbersCount - 1) / 2;
        const offset = isNoMiddleValue ? limit : limit + 1

        let leftNum = isNoMiddleValue ? numbersCount : numbersCount - 1;
        let rightNum = isNoMiddleValue ? numbersCount - 1 : numbersCount - 2;

        if (!isNoMiddleValue) {
            result[limit] = numbersCount;
        }

        for(let counter1 = 0; counter1 < limit; counter1++) {
            result[counter1] = leftNum;
            result[counter1 + offset] = rightNum;

            leftNum -= 2;
            rightNum -= 2;
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
    console.log(permutationNaiveOptimizedSolution(inputValue));
});
