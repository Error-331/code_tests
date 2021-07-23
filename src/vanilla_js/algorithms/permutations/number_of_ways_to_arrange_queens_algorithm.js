function numberOfWaysToArrangeQueensNaive1(numberOfGrids = 0, yPos = 0, occupiedColumns = [], occupiedDiagonals1 = [], occupiedDiagonals2 = [], numberOfWays = 0) {
    if (yPos === numberOfGrids) {
        numberOfWays++;
        return numberOfWays;
    }

    for (let xPos = 0; xPos < numberOfGrids; xPos++) {
        const diag1Pos = xPos + yPos;
        const diag2Pos = xPos - yPos + (numberOfGrids - 1);

        if (occupiedColumns[xPos] || occupiedDiagonals1[diag1Pos] || occupiedDiagonals2[diag2Pos]) {
            continue;
        }

        occupiedColumns[xPos] = occupiedDiagonals1[diag1Pos] = occupiedDiagonals2[diag2Pos] = true;
        numberOfWays = numberOfWaysToArrangeQueensNaive1(numberOfGrids, yPos + 1, occupiedColumns, occupiedDiagonals1, occupiedDiagonals2, numberOfWays);

        occupiedColumns[xPos] = occupiedDiagonals1[diag1Pos] = occupiedDiagonals2[diag2Pos] = false;
    }

    return numberOfWays;
}

console.log('"Number of ways to arrange queens" algorithm');
console.log('============================================');

console.log('');

console.log(`Number of ways (grid size: 4, naive implementation 1): ${numberOfWaysToArrangeQueensNaive1(4)}`);
console.log(`Number of ways (grid size: 8, naive implementation 1): ${numberOfWaysToArrangeQueensNaive1(8)}`);
