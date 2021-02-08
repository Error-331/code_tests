'use strict';

export default async () => {
    // mock data
    const denominations1 = [50, 25, 10, 5, 1];
    const denominations2 = [4, 3, 1];

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
            return {
                bestNumOfCoins: Infinity,
                coinMemo,
            };
        }

        if (money === 0) {
            return {
                bestNumOfCoins: 0,
                coinMemo,
            };
        }

        if (numOfCoinsMemo[money]) {
            return numOfCoinsMemo[money];
        }

        let bestNumOfCoins = Infinity;
        let bestCoin = null;

        for (let coinCnt = 0; coinCnt < denominations.length; coinCnt++) {
            const foundSolution = findAmountOfChangeDynamicProgrammingMemoSolution(money - denominations[coinCnt], denominations, numOfCoinsMemo, coinMemo);

            if (bestNumOfCoins > foundSolution.bestNumOfCoins + 1) {
                bestCoin = denominations[coinCnt];
                bestNumOfCoins = foundSolution.bestNumOfCoins + 1
            }
        }

        numOfCoinsMemo[money] = bestNumOfCoins;
        coinMemo[money] = bestCoin;

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
    console.log('');

    console.log('Slowest solution');
    console.log('----------------');
    console.log('');

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

    change = findAmountOfChangeSlowestSolution(6, denominations2);

    console.log('Amount of change (6) - slowest solution (case 6, coin pack 2)');
    console.log('Change: ', change);

    console.log('');
    console.log('------------------------------------------------------');
    console.log('');

    console.log('Better solution');
    console.log('---------------');
    console.log('');

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

    change = findAmountOfChangeBetterSolution(6, denominations2);

    console.log('Amount of change (6) - better solution (case 6, coin pack 2)');
    console.log('Change: ', change);

    console.log('');
    console.log('------------------------------------------------------');
    console.log('');

    console.log('Dynamic programming (with memo) solution');
    console.log('----------------------------------------');
    console.log('');

    change = findAmountOfChangeDynamicProgrammingMemoSolution(105, denominations1);

    console.log('Amount of change (105) - dynamic programming (with memo) solution (case 1, coin pack 1)');
    console.log('Change: ', visualizeAmountOfChangeDynamicProgrammingMemoUtil(105, change.bestNumOfCoins, change.coinMemo));

    change = findAmountOfChangeDynamicProgrammingMemoSolution(106, denominations1);

    console.log('Amount of change (106) - dynamic programming (with memo) solution (case 2, coin pack 1)');
    console.log('Change: ', visualizeAmountOfChangeDynamicProgrammingMemoUtil(106, change.bestNumOfCoins, change.coinMemo));

    change = findAmountOfChangeDynamicProgrammingMemoSolution(54, denominations1);

    console.log('Amount of change (54) - dynamic programming (with memo) solution (case 3, coin pack 1)');
    console.log('Change: ', visualizeAmountOfChangeDynamicProgrammingMemoUtil(54, change.bestNumOfCoins, change.coinMemo));

    change = findAmountOfChangeDynamicProgrammingMemoSolution(55, denominations1);

    console.log('Amount of change (55) - dynamic programming (with memo) solution (case 4, coin pack 1)');
    console.log('Change: ', visualizeAmountOfChangeDynamicProgrammingMemoUtil(55, change.bestNumOfCoins, change.coinMemo));

    change = findAmountOfChangeDynamicProgrammingMemoSolution(4, denominations1);

    console.log('Amount of change (4) - dynamic programming (with memo) solution (case 5, coin pack 1)');
    console.log('Change: ', visualizeAmountOfChangeDynamicProgrammingMemoUtil(4, change.bestNumOfCoins, change.coinMemo));

    change = findAmountOfChangeDynamicProgrammingMemoSolution(6, denominations2);

    console.log('Amount of change (6) - dynamic programming (with memo) solution (case 6, coin pack 2)');
    console.log('Change: ', visualizeAmountOfChangeDynamicProgrammingMemoUtil(6, change.bestNumOfCoins, change.coinMemo));


    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
