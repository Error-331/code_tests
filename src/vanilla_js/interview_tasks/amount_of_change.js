'use strict';

export default async () => {
    // mock data
    const denominations1 = [50, 25, 10, 5, 1];
    const denominations2 = [1, 3, 4];

    // slowest solution
    const findAmountOfChangeSlowestSolution = (money, denominations) => {
        let currentMoney = money;
        const coins = [];

        for (let denominationIndex = 0; denominationIndex < denominations.length; denominationIndex++) {
            const denomination = denominations[denominationIndex];

            if (denomination <= currentMoney) {
                currentMoney = currentMoney - denomination;
                coins.push(denomination);

                denominationIndex = -1;
            }

            if (currentMoney <= 0) {
                return coins;
            }
        }

        return coins;
    };



    // better solution
    const findAmountOfChangeBetterSolution = (money, denominations) => {
        let currentMoney = money;
        const denominationAmountPairs = [];

        for (let denominationIndex = 0; denominationIndex < denominations.length; denominationIndex++) {
            const currentDenomination = denominations[denominationIndex];
            const quotient = Math.floor(currentMoney / currentDenomination);

            if (quotient !== 0) {
                denominationAmountPairs.push([currentDenomination, quotient])
            }

            currentMoney = currentMoney - (currentDenomination * quotient);
        }

        return denominationAmountPairs;
    };

    // dynamic programming recursive solution (with memo)
    const findAmountOfChangeDynamicProgrammingMemoSolution = (money, denominations, numOfCoinsMemo = {}, coinMemo = {}) => {
        if (money < 0) {
            return Infinity
        }

        if (money === 0) {
            return 0;
        }

        if (numOfCoinsMemo[money]) {
            return numOfCoinsMemo[money];
        }

        let bestNumOfCoins = Infinity;
        let d = null;

        for (let coinCnt = 0; coinCnt < denominations.length; coinCnt++) {
            if (bestNumOfCoins > findAmountOfChangeDynamicProgrammingMemoSolution(money - denominations[coinCnt], denominations, numOfCoinsMemo, coinMemo) + 1) {
                d = denominations[coinCnt];
                bestNumOfCoins = findAmountOfChangeDynamicProgrammingMemoSolution(money - denominations[coinCnt], denominations, numOfCoinsMemo, coinMemo) + 1
            }
        }

        numOfCoinsMemo[money] = bestNumOfCoins;
        coinMemo[money] = d;

        return {
            bestNumOfCoins,
            coinMemo,
        };
    };

    // for `findAmountOfChangeDynamicProgrammingMemoSolution`
    const visualizeAmountOfChangeDynamicProgrammingMemoUtil = (money, bestNumOfCoins, coinMemo) => {
        let coinDifference = bestNumOfCoins;
        let coins = [];

        while (coinDifference > 0) {
            coins.push(coinMemo[money]);

            money -= coinMemo[money];
            coinDifference--;
        }

        return coins;
    };

    console.log('Amount of change');
    console.log('================');

    let change = findAmountOfChangeSlowestSolution(105, denominations1);

    console.log('Amount of change (105) - slowest solution (case 1, coin pack 1)');
    console.log('Change: ', change);

    change = findAmountOfChangeSlowestSolution(106, denominations1);

    console.log('Amount of change (106) - slowest solution (case 2, coin pack 1)');
    console.log('Change: ', change);

    change = findAmountOfChangeSlowestSolution(54, denominations1);

    console.log('Amount of change (54) - slowest solution (case 3, coin pack 1)');
    console.log('Change: ', change);

    change = findAmountOfChangeSlowestSolution(55, denominations1);

    console.log('Amount of change (55) - slowest solution (case 4, coin pack 1)');
    console.log('Change: ', change);

    change = findAmountOfChangeSlowestSolution(4, denominations1);

    console.log('Amount of change (4) - slowest solution (case 5, coin pack 1)');
    console.log('Change: ', change);

    console.log('------------------------------------------------------');

    change = findAmountOfChangeBetterSolution(105, denominations1);

    console.log('Amount of change (105) - better solution (case 1, coin pack 1)');
    console.log('Change: ', change);

    change = findAmountOfChangeBetterSolution(106, denominations1);

    console.log('Amount of change (106) - better solution (case 2, coin pack 1)');
    console.log('Change: ', change);

    change = findAmountOfChangeBetterSolution(54, denominations1);

    console.log('Amount of change (54) - better solution (case 3, coin pack 1)');
    console.log('Change: ', change);

    change = findAmountOfChangeBetterSolution(55, denominations1);

    console.log('Amount of change (55) - better solution (case 4, coin pack 1)');
    console.log('Change: ', change);

    change = findAmountOfChangeBetterSolution(4, denominations1);

    console.log('Amount of change (4) - better solution (case 5, coin pack 1)');
    console.log('Change: ', change);

    console.log('------------------------------------------------------');

    change = findAmountOfChangeDynamicProgrammingMemoSolution(105, denominations1);

    console.log('Amount of change (105) - better solution (case 1, coin pack 1)');
    console.log('Change: ', visualizeAmountOfChangeDynamicProgrammingMemoUtil(6, change.bestNumOfCoins, change.coinMemo));

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
