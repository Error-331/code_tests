# Stop-Limit Order

- combines a stop trigger and a limit order;
- allow traders to set the **minimum** amount of profit they’re happy to take or the **maximum** they’re willing to spend or lose on a trade;
- once the user set a stop-limit order and the trigger price is reached, a limit order will be placed automatically;
- user can strategically place stop-limit orders by considering **resistance** and **support** levels and the asset’s volatility;
- in a stop-limit order, the stop price is the trigger price for the exchange to place a limit order;
- the limit price is the price at which users order will be placed;

## Differences

### Limit order

- when the user sets a limit order, he chooses a **maximum purchase** price or **minimum sale price**;
- exchange will automatically attempt to fill the limit order when the market price meets or is better than your limit price;
- traders place sell limit orders above the current market price and buy limit orders below the current market price;

### Stop-limit order

- a stop-limit order combines a stop trigger and a limit order;
- the stop order adds a trigger price for the exchange to place your limit order;
- the **stop price** acts as a trigger to place a limit order;
- when the market reaches the stop price, it automatically creates a limit order with a custom price (**limit price**);
- stop and limit prices can be the same, this isn’t a requirement;

## Examples

### Buy stop-limit

- BNB is currently at $300 (BUSD);
- user like to buy when it starts to enter a **bullish** trend;
- user don't want to pay too much for the BNB if it quickly begins to rise, so he needs to limit the price you’ll pay;
- technical analysis tells the user that an uptrend might start if the market breaks above $310;
- user decides to use a buy stop-limit order to open a position, in case the breakout happens;
- user sets his stop price at $310 and his limit price at $315;
- as soon as BNB reaches $310, a limit order to buy BNB at $315 is placed;
- users order might be filled with a price of 315 or lower;
- note that $315 is the users limit price, so if the market goes up too quickly above it, his order might not be filled completely;

### Sell stop-limit

- user bought BNB at $285 (BUSD) and it’s now at $300;
- to prevent losses, user decides to use a stop-limit order to sell BNB if the price drops back to his entry;
- user sets up a sell stop-limit order with a stop price of $289 and a limit price of $285 (the price he purchased BNB at);
- if the price reaches $289, a limit order to sell BNB at $285 will be placed;
- his order might be filled with a price of 285 or higher;

## Strategies for placing stop-limit orders

1. _Study the volatility of the asset_;
2. _Study the liquidity of the asset_ (stop-limit orders are particularly useful when trading assets with a large bid-ask spread or low liquidity);
3. _Use technical analysis to determine price levels_;