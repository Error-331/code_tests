// 1 2 - no
// 1 2 3 - no

// 2 4 1 3 - yes
// 4 2 5 3 1 - yes
// 6 4 2 5 3 1 - yes
// 6 4 2 7 5 3 1 - yes
// 8 6 4 2 7 5 3 1 - yes
// 8 6 4 2 9 7 5 3 1 - yes
// 10 8 6 4 2 9 7 5 3 1 - yes
// 10 8 6 4 2 11 9 7 5 3 1 - yes

function permutationNaiveSolution(numbersCount) {
    if (numbersCount > 1 && numbersCount < 4) {
        return null;
    } else if (numbersCount === 4) {
        return [2, 4, 1, 3];
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

        return result;
    }
}

function permutationNaiveOptimizedSolution(numbersCount) {
    if (numbersCount > 1 && numbersCount < 4) {
        return null;
    } else if (numbersCount === 4) {
        return [2, 4, 1, 3];
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

        return result;
    }
}

console.log('Permutations');
console.log('============');
console.log('');

console.log('Naive solution');
console.log('--------------');
console.log('');

console.log('Permutations (1) - naive solution (case 1)');
console.log('Permutations: ', permutationNaiveSolution(1));
console.log('');

console.log('Permutations (2) - naive solution (case 2)');
console.log('Permutations: ', permutationNaiveSolution(2));
console.log('');

console.log('Permutations (3) - naive solution (case 3)');
console.log('Permutations: ', permutationNaiveSolution(3));
console.log('');

console.log('Permutations (4) - naive solution (case 4)');
console.log('Permutations: ', permutationNaiveSolution(4));
console.log('');

console.log('Permutations (5) - naive solution (case 5)');
console.log('Permutations: ', permutationNaiveSolution(5));
console.log('');

console.log('Permutations (6) - naive solution (case 6)');
console.log('Permutations: ', permutationNaiveSolution(6));
console.log('');

console.log('Permutations (7) - naive solution (case 7)');
console.log('Permutations: ', permutationNaiveSolution(7));
console.log('');

console.log('Permutations (8) - naive solution (case 8)');
console.log('Permutations: ', permutationNaiveSolution(8));
console.log('');

console.log('Permutations (9) - naive solution (case 9)');
console.log('Permutations: ', permutationNaiveSolution(9));
console.log('');

console.log('Permutations (10) - naive solution (case 10)');
console.log('Permutations: ', permutationNaiveSolution(10));
console.log('');

console.log('Permutations (11) - naive solution (case 11)');
console.log('Permutations: ', permutationNaiveSolution(11));
console.log('');

console.log('Permutations (12) - naive solution (case 12)');
console.log('Permutations: ', permutationNaiveSolution(12));
console.log('');

console.log('Naive optimized solution');
console.log('------------------------');
console.log('');

console.log('Permutations (1) - naive optimized solution (case 1)');
console.log('Permutations: ', permutationNaiveOptimizedSolution(1));
console.log('');

console.log('Permutations (2) - naive optimized solution (case 2)');
console.log('Permutations: ', permutationNaiveOptimizedSolution(2));
console.log('');

console.log('Permutations (3) - naive optimized solution (case 3)');
console.log('Permutations: ', permutationNaiveOptimizedSolution(3));
console.log('');

console.log('Permutations (4) - naive optimized solution (case 4)');
console.log('Permutations: ', permutationNaiveOptimizedSolution(4));
console.log('');

console.log('Permutations (5) - naive optimized solution (case 5)');
console.log('Permutations: ', permutationNaiveOptimizedSolution(5));
console.log('');

console.log('Permutations (6) - naive optimized solution (case 6)');
console.log('Permutations: ', permutationNaiveOptimizedSolution(6));
console.log('');

console.log('Permutations (7) - naive optimized solution (case 7)');
console.log('Permutations: ', permutationNaiveOptimizedSolution(7));
console.log('');

console.log('Permutations (8) - naive optimized solution (case 8)');
console.log('Permutations: ', permutationNaiveOptimizedSolution(8));
console.log('');

console.log('Permutations (9) - naive optimized solution (case 9)');
console.log('Permutations: ', permutationNaiveOptimizedSolution(9));
console.log('');

console.log('Permutations (10) - naive optimized solution (case 10)');
console.log('Permutations: ', permutationNaiveOptimizedSolution(10));
console.log('');

console.log('Permutations (11) - naive optimized solution (case 11)');
console.log('Permutations: ', permutationNaiveOptimizedSolution(11));
console.log('');

console.log('Permutations (12) - naive optimized solution (case 12)');
console.log('Permutations: ', permutationNaiveOptimizedSolution(12));
console.log('');
