'use strict';

// https://www.interviewcake.com/question/javascript/stock-price
//
// Algorithm that finds the best possible profit made by selling apples (based on data for previous week) - no shorting

export default async () => {
    // mock data
    let stockPricesYesterday = [10, 7, 5, 8, 11, 9];
    let stockPricesYesterdayDescending = [10, 8, 6, 4];
    let stockPricesYesterdayAscending = [2, 4, 6, 8, 10];

    // not best solution
    const findBestBuySellProfitNotBestSolution = (stocks) => {
        let stocksProfits = [];

        stocks.forEach((stockValue, stockMinute) => {
            // no shorting
            if (stockMinute + 1 >= stocks.length) {
                return;
            }

            let profit = stocks
                .slice(stockMinute + 1, stocks.length)
                .reduce((profitAccumulator, subStockValue) => {
                    let profit = subStockValue - stockValue;

                    return profit > profitAccumulator ? profit : profitAccumulator;
                }, -Infinity);

            stocksProfits.push(profit);
        });

        let maximumProfit = Math.max(...stocksProfits);

        return Number.isFinite(maximumProfit) ? maximumProfit : 0;
    };

    // best solution
    const findBestBuySellProfitBestSolution = (stocks) => {
        let minBuyValue = stocks[0];
        let maxProfit = -Infinity;

        stocks.forEach((stockValue, stockMinute) => {
            if (stockMinute === 0) {
                return;
            }

            let profit = stockValue - minBuyValue;
            maxProfit = Math.max(maxProfit, profit);

            minBuyValue = Math.min(minBuyValue, stockValue);
        });

        return maxProfit;
    };

    console.log('Apples selling');
    console.log('==============');

    let maximumProfit = findBestBuySellProfitNotBestSolution(stockPricesYesterday);

    console.log('Apples - not the best solution');
    console.log('Maximum profit: ' + maximumProfit);

    maximumProfit = findBestBuySellProfitNotBestSolution(stockPricesYesterdayDescending);

    console.log('Apples - not the best solution');
    console.log('Maximum profit (descending): ' + maximumProfit);

    maximumProfit = findBestBuySellProfitNotBestSolution(stockPricesYesterdayAscending);

    console.log('Apples - not the best solution');
    console.log('Maximum profit (ascending): ' + maximumProfit);

    console.log('------------------------------------------------------');

    maximumProfit = findBestBuySellProfitBestSolution(stockPricesYesterday);

    console.log('Apples - the best solution');
    console.log('Maximum profit: ' + maximumProfit);

    maximumProfit = findBestBuySellProfitNotBestSolution(stockPricesYesterdayDescending);

    console.log('Apples - the best solution');
    console.log('Maximum profit (descending): ' + maximumProfit);

    maximumProfit = findBestBuySellProfitNotBestSolution(stockPricesYesterdayAscending);

    console.log('Apples - the best solution');
    console.log('Maximum profit (ascending): ' + maximumProfit);

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
