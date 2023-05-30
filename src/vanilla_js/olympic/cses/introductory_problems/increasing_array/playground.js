const testInput1 = [3, 2, 5, 1, 7];
const testInput2 = [3, 2, 7, 1, 5];

function increasingArrayNaiveSolution(testNumbers, numbersCount) {
    if (numbersCount === 1) {
        return 0;
    }

    let currentNumbersCount = numbersCount
    let middleIndex = null;

    let maxInteger = -Infinity;
    let maxIntegerIdx = null;

    let numberOfSteps = 0;

    do {
        maxInteger = -Infinity;
        maxIntegerIdx = null;

        middleIndex = Math.floor(currentNumbersCount / 2) - 1;

        for (let currentIndex = middleIndex; currentIndex < currentNumbersCount - 1; currentIndex++) {
            const leftIndex = middleIndex - (currentIndex - middleIndex);
            const rightIndex = currentIndex + 1;

            if (leftIndex >= 0) {
                if (testNumbers[leftIndex] > maxInteger) {
                    maxInteger = testNumbers[leftIndex];
                    maxIntegerIdx = leftIndex;
                }
            }

            if (testNumbers[rightIndex] > maxInteger) {
                maxInteger = testNumbers[rightIndex];
                maxIntegerIdx = rightIndex;
            }
        }

        for (let subIdx = maxIntegerIdx + 1; subIdx < currentNumbersCount; subIdx++) {
            numberOfSteps += maxInteger - testNumbers[subIdx];
        }

        currentNumbersCount = maxIntegerIdx;
    } while(currentNumbersCount > 1)

    return numberOfSteps;
}

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

console.log('Increasing array');
console.log('==============');
console.log('');

console.log('Naive solution');
console.log('--------------');
console.log('');

console.log('Increasing array (1) - naive solution (case 1)');
console.log('Increasing array: ', increasingArrayNaiveSolution(testInput1, testInput1.length));
console.log('');

console.log('Increasing array (1) - naive solution (case 2)');
console.log('Increasing array: ', increasingArrayNaiveSolution(testInput2, testInput2.length));
console.log('');

console.log('Increasing array (2) - naive solution (case 1)');
console.log('Increasing array: ', increasingArrayBetterNaiveSolution(testInput1, testInput1.length));
console.log('');

console.log('Increasing array (2) - naive solution (case 2)');
console.log('Increasing array: ', increasingArrayBetterNaiveSolution(testInput2, testInput2.length));
console.log('');