function weirdAlgorithmNaiveSolution(number) {
    const numbers = [];
    numbers.push(number);

    while(number !== 1) {
        number = number % 2 === 0 ? number / 2 : (number * 3) + 1;
        numbers.push(number);
    }

    return numbers;
}

console.log('Wired algorithm');
console.log('===============');
console.log('');

console.log('Naive solution');
console.log('--------------');
console.log('');


console.log('Wired algorithm (3 -> 3, 10, 5, 16, 8, 4, 2, 1) - naive solution (case 1)');
console.log('Missing number: ', weirdAlgorithmNaiveSolution(3));
console.log('');
