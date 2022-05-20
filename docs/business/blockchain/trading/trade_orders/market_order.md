# Market Order

- let purchase or sell a financial asset instantly at the best price currently available;
- **market orders take prices from limit orders on the order book**;
- **user can’t be 100% sure of the price he will get**;
- **slippage** can occur when user get a price different from what he expected;
- **limit orders** differ from **market orders** in that the user can place them in advance with a set price;
- the exchange will only fill users order at the **set price** or better;

## Principle of operation

- **market orders are executed instantly at the current market price (bypassing order book)**;
- when user place a market order, he is taking the price set by someone else(an exchange will match a purchase market order to the lowest ask price on the order book);
- a sell market order will be matched with the highest bid price on the order book;
- as a market order removes **liquidity** from the exchange, user will pay higher fees as a market taker;

## Differences

### Limit order

- **market orders can only be filled with existing limit orders**;
- placing a market order in a highly volatile market can bring unexpected results;
- when an asset has **low liquidity** - using a market order may cause **slippage**;