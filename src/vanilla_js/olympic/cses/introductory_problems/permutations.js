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
    if (numbersCount < 4) {
        return null;
    } else if (numbersCount === 4) {
        return [2, 4, 1, 3];
    } else {
       // let result = new Array(numbersCount);
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
       /* for (let counter1 = 0; counter1 < limit; counter1++) {
            result[counter1] = (limit - counter1) * 2;
            result[counter1 + limit] = ((limit - counter1) * 2) - 1;
        }*/

        return result;
    }
}

const c = permutationNaiveSolution(12);
console.log(c);
