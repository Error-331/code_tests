function simpleNumericPermutationsGeneratorAlgorithmNaive1(numberOfElements, isChosenNumberArray = [], subset = [], subsets = []) {
    if (subset.length === numberOfElements) {
        subsets.push(subset.slice());
    } else {
        for (let currentNumber = 1; currentNumber <= numberOfElements; currentNumber++) {
            if (isChosenNumberArray[currentNumber]) {
                continue;
            }

            isChosenNumberArray[currentNumber] = true;
            subset.push(currentNumber);

            simpleNumericPermutationsGeneratorAlgorithmNaive1(numberOfElements, isChosenNumberArray,  subset, subsets);

            isChosenNumberArray[currentNumber] = false;
            subset.pop();
        }
    }

    return subsets;
}

console.log('Simple numeric permutations generator algorithm');
console.log('===============================================');

console.log('');

let generatedSubset = simpleNumericPermutationsGeneratorAlgorithmNaive1(3);
console.log('Generated subset (number of elements - 3, naive implementation 1): ');
console.log('');
console.log(generatedSubset);

console.log('');

generatedSubset = simpleNumericPermutationsGeneratorAlgorithmNaive1(6);
console.log('Generated subset (number of elements - 6, naive implementation 1): ');
console.log('');
console.log(generatedSubset);
