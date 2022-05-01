# Arbitrage Trading

Arbitrage trading is a relatively low-risk trading strategy that takes advantage of **price differences** across markets. Most of the time, this involves buying and selling the same 
asset (like Bitcoin) on different exchanges.

## Principle of operation

- commonly done between identical assets traded on different exchanges;
- arbitrage trader has to not only finding these pricing differences, but also being able to trade them quickly;
- the returns are generally low and low-risk;

## Types

### Exchange arbitrage

- when a trader buys the same cryptoasset in one exchange and sells it in another;
- the prices are almost never exactly the same at exactly the same time on different exchanges judging by **order books**;
- this, in turn, makes the underlying market more efficient since price stays in a relatively contained range on different trading venues;
- in this sense, **market inefficiencies** can mean opportunity;

### Funding rate arbitrage

- when a trader buys a cryptocurrency and **hedges** it’s price movement with a futures contract in the same crypto that has a funding rate lower than the cost of purchasing the crypto;
- the cost, in this case, means any fees that the position may incur;

**Example:**

- user owns Ethereum;
- the price of Ethereum is going to fluctuate a lotж
- user decides to hedge his price exposure by selling a futures contract (shorting) for the same value as your Ethereum investment;
- the funding rate for that contract pays you 2%;
- that would mean he will get 2% for owning Ethereum without any price risk, resulting in a profitable arbitrage opportunity;

### Triangular arbitrage

- when a trader notices a price discrepancy between three different cryptocurrencies and exchanges them for one another in a kind of loop;
- the idea behind triangular arbitrage comes from trying to take advantage of a cross-currency price difference (like BTC/ETH);

Example: 

- user could buy Bitcoin with your BNB, then buy Ethereum with his Bitcoin, and finally buy back BNB with Ethereum;
- if the relative value between Ethereum and Bitcoin doesn’t match the value each of those currencies has with BNB, an arbitrage opportunity exists;

## Risks

- the biggest risk associated with arbitrage trading is **execution risk**;
- this happens when the spread between prices closes before user is able to finalize the trade, resulting in zero or negative returns;
- this could be due to **slippage**, slow execution, abnormally high transaction costs, a sudden spike in volatility, etc.
- **liquidity risk** - when there isn’t enough liquidity for the user to get in and out of the markets he needs to trade to complete his arbitrage;
- it’s also possible that the user could get hit with a **margin call** if the trade goes against him;