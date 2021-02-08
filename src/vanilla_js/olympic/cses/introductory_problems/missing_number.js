const numbersCount = 5;

const testNumbersSet1 = [2, 3, 1, 5];
const testNumbersSet2 = [4, 3, 1, 5];
const testNumbersSet3 = [2, 3, 4, 5];

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

console.log('Missing number');
console.log('==============');
console.log('');

console.log('Naive solution');
console.log('--------------');
console.log('');

console.log('Missing number (4) - naive solution (case 1)');
console.log('Missing number: ', missingNumberNaiveSolution(testNumbersSet1, numbersCount));
console.log('');

console.log('Missing number (2) - naive solution (case 2)');
console.log('Missing number: ', missingNumberNaiveSolution(testNumbersSet2, numbersCount));
console.log('');

console.log('Missing number (1) - naive solution (case 3)');
console.log('Missing number: ', missingNumberNaiveSolution(testNumbersSet3, numbersCount));
console.log('');
