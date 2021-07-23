function simpleNumericSubsetGeneratorAlgorithmNaive1(numberOfElements, currentNumber = 1, subset = [], subsets = []) {
    if (currentNumber === numberOfElements + 1) {
        if (subset.length === 0) {
            subset.push(0);
        }

        subsets.push(subset.slice());
    } else {
        subset.push(currentNumber);
        simpleNumericSubsetGeneratorAlgorithmNaive1(numberOfElements, currentNumber + 1, subset.slice(), subsets);

        subset.pop();
        simpleNumericSubsetGeneratorAlgorithmNaive1(numberOfElements, currentNumber + 1, subset.slice(), subsets);
    }

    return subsets;
}

console.log('Simple numeric subset generator algorithm');
console.log('=========================================');

console.log('');

let generatedSubset = simpleNumericSubsetGeneratorAlgorithmNaive1(3);
console.log('Generated subset (number of elements - 3, naive implementation 1): ');
console.log('');
console.log(generatedSubset);

console.log('');

generatedSubset = simpleNumericSubsetGeneratorAlgorithmNaive1(6);
console.log('Generated subset (number of elements - 6, naive implementation 1): ');
console.log('');
console.log(generatedSubset);
