# Technical Analysis Basics

## Long position

- means buying an asset with the expectation that its value will rise;
- long-term trading strategies like buy and hold are based on the assumption that the underlying asset will increase in value;
- being long doesn’t necessarily mean that the trader expects to gain from an upward movement in price

## Shorting

- means selling an asset with the intention of rebuying it later at a lower price;
- is closely related to **margin trading**, as it may happen with borrowed assets;

## Order book

- is a collection of the currently open orders for an asset, organized by price;
- orders in the order book are matched by a system called the matching engine;
- the **depth** of the **order book** may also refer to the amount of liquidity that the order book can absorb;
- the **"deeper"** the market is, the more liquidity there is in the order book;
- a market with more **liquidity** can absorb larger orders without a considerable effect on the price;

## Market order

- is an order to buy or sell at the best currently available market price;
- users market order will keep filling orders from the order book until the entire order is fully filled;
- a large market order can effectively siphon liquidity from the order book;

## Slippage

There could be a big difference between the price that user expect his order to fill and the price that it fills at (due to lack of liquidity).

**Example:**

- user would like to open a long position worth 10 BTC in an **altcoin**;
- this altcoin has a relatively small **market cap** and is being traded on a **low-liquidity** market;
- if the user uses a market order, it will keep filling orders from the order book until the entire 10 BTC order is filled;
- on a liquid market, user would be able to fill his 10 BTC order without impacting the price significantly;
- in this case, the lack of **liquidity** means that there may not be enough sell orders in the **order book** for the current price range;
- by the time the entire 10 BTC order is filled, user may find out that the average price paid was much higher than expected;
- **the lack of sell orders caused users market order to move up the order book, matching orders that were significantly more expensive than the initial price**;

