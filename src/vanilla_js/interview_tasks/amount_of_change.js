'use strict';

export default async () => {
    // mock data
    const denominations1 = [50, 25, 10, 5, 1];

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

    console.log('Amount of change');
    console.log('================');

    let change = findAmountOfChangeSlowestSolution(105, denominations1);

    console.log('Amount of change - slowest solution (case 1)');
    console.log('Change: ', change);

    change = findAmountOfChangeSlowestSolution(106, denominations1);

    console.log('Amount of change - slowest solution (case 2)');
    console.log('Change: ', change);

    change = findAmountOfChangeSlowestSolution(54, denominations1);

    console.log('Amount of change - slowest solution (case 3)');
    console.log('Change: ', change);

    change = findAmountOfChangeSlowestSolution(55, denominations1);

    console.log('Amount of change - slowest solution (case 4)');
    console.log('Change: ', change);

    change = findAmountOfChangeSlowestSolution(4, denominations1);

    console.log('Amount of change - slowest solution (case 5)');
    console.log('Change: ', change);

    console.log('------------------------------------------------------');

    change = findAmountOfChangeBetterSolution(105, denominations1);

    console.log('Amount of change - better solution (case 1)');
    console.log('Change: ', change);

    change = findAmountOfChangeBetterSolution(106, denominations1);

    console.log('Amount of change - better solution (case 2)');
    console.log('Change: ', change);

    change = findAmountOfChangeBetterSolution(54, denominations1);

    console.log('Amount of change - better solution (case 3)');
    console.log('Change: ', change);

    change = findAmountOfChangeBetterSolution(55, denominations1);

    console.log('Amount of change - better solution (case 4)');
    console.log('Change: ', change);

    change = findAmountOfChangeBetterSolution(4, denominations1);

    console.log('Amount of change - better solution (case 5)');
    console.log('Change: ', change);

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
