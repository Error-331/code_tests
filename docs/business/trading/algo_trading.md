# Algorithmic trading

## Financial trading motives types
 
### Beta trading

Earning market risk premia by investing in, for instance, exchange traded funds (ETFs) that replicate the performance of the S&P 500.

### Alpha generation

Earning risk premia independent of the market by, for example, selling short stocks listed in the S&P 500 or ETFs on the S&P 500.

### Static hedging

Hedging against market risks by buying, for example, out-of-the-money put
options on the S&P 500.

### Dynamic hedging

Hedging against market risks affecting options on the S&P 500 by, for example, dynamically trading futures on the S&P 500 and appropriate cash, money market, or rate instruments.

### Asset-liability management

Trading S&P 500 stocks and ETFs to be able to cover liabilities resulting from, for example, writing life insurance policies.

### Market making

Providing, for example, liquidity to options on the S&P 500 by buying and selling options at different bid and ask prices.

***

## Core infrastructure

- exchange-facing market data protocol integration;
- market data feed handler;
- internal market data format normalization;
- historical data recording;
- instrument definition recording and dissemination;
- exchange order entry protocols;
- exchange order entry gateways;
- core side risk systems;
- broker-facing applications;
- back office reconciliation applications; 
- addressing compliance requirements;
- other;

## Algorithmic trading strategy components

- normalized market data; 
- building order books;
- generating signals from incoming market data and order flow information;
- aggregation of different signals;
- efficient execution logic built on top of statistical predictive abilities (alpha);
- position and PnL management inside the strategies;
- risk management inside the strategies;
- backtesting;
- historical signal and trading research platforms;

## Market data subscription

- Interacting with the feed handler components that publish normalized data;
- Inter-Process Communication (IPC) mechanisms from the feed handlers;

## Limit order books

- build and maintain limit order books for each instrument;
- track market participant order priorities;
- track our own orders in the limit order book;

## Signals (indicators, predictors, calculators, features, alpha)

### Signal aggregators

- classical statistical learning methods(to generate linear and non-linear combinations to output classification or regression output values that represent a combination of individual signals - for ML); 

## Execution logic

- speed;
- sophistication;
- disguise our intentions/intelligence from other market participants;
- slippage and fees;

### Slippage

#### Reasons

- If the order reaches the exchange later than expected (latency), then it might end up either not executing at all, or executing at a worse price than you might expect;
- If the order is very large such that it executes at multiple prices, then the VWAP of the entire execution may be significantly different from the market price observed when the order was sent;
- There are exchange fees and broker fees proportional to the size of the orders and the total volume traded;

### Position and PnL management

- trading strategies need to track and manage their positions and PnLs effectively;
- for more sophisticated trading strategies (such as pairs trading) - need to track positions and PnLs on multiple instruments;
 
### Risk management

- cornerstones of algorithmic trading;
- risk of violating rules and regulations at trading exchanges that can often lead to legal actions and huge penalties;
- risk management systems need to be built to be extremely robust;
- there also needs to be a very high level of testing, stress testing, and strict change management to minimize the possibility of risk systems failing;

### Backtesting

- try out different trading strategies to see what ideas work before deploying them to market;
- building and maintaining a highly accurate backtester is one of the most complicated tasks involved in setting up an algorithmic trading research system;

#### Backtester

Simulate automated trading strategy behavior and retrieve statistics on expected PnLs, expected risk exposure, and other metrics based on historically recorded market data. It has to accurately 
simulate things such as software latencies, network latencies, accurate FIFO priorities for orders, slippage, fees, and, in some cases, also the market impact caused by the order flow for the
strategy under consideration. 


====


Interestingly, one of the oldest and most widely used algorithms is found in dynamic
hedging of options. Already with the publication of the seminal papers about the
pricing of European options by Black and Scholes (1973) and Merton (1973), the
algorithm, called delta hedging, was made available long before computerized and
electronic trading even started.

maximal drawdown (period),


There are other areas where trading-related algorithms play an important role. One is
the high frequency trading (HFT) space, where speed is typically the discipline in
which players compete.6
 The motives for HFT are diverse, but market making and
alpha generation probably play a prominent role. Another one is trade execution,
where algorithms are deployed to optimally execute certain nonstandard trades.
Motives in this area might include the execution (at best possible prices) of large
orders or the execution of an order with as little market and price impact as possible.
A more subtle motive might be to disguise an order by executing it on a number of
different exchanges.

In the case of macro, systematic funds outperform discretionary
funds, both on an unadjusted and risk‐adjusted basis.

The study’s results illustrate that systematic (“algorithmic”) macro hedge funds per‐
form best as a category, both in unadjusted and risk-adjusted terms. They generate an
annualized alpha of 4.85% points over the period studied. These are hedge funds
implementing strategies that are typically global, are cross-asset, and often involve
political and macroeconomic elements. Systematic equity hedge funds only beat their
discretionary counterparts on the basis of the adjusted return appraisal ratio (0.35
versus 0.25).

Compared to the S&P 500, hedge fund performance overall was quite meager for the
year 2017. While the S&P 500 index returned 21.8%, hedge funds only returned 8.5%
to investors (see this article in Investopedia). This illustrates how hard it is, even with
multimillion dollar budgets for research and technology, to generate alpha.


What Is an ETF?

An exchange traded fund (ETF) is a type of security that tracks an index, sector, commodity, or other asset, but which can be purchased or sold on a stock exchange the same as a regular stock. An ETF can be structured to track anything from the price of an individual commodity to a large and diverse collection of securities. ETFs can even be structured to track specific investment strategies.

A well-known example is the SPDR S&P 500 ETF (SPY), which tracks the S&P 500 Index.1 ETFs can contain many types of investments, including stocks, commodities, bonds, or a mixture of investment types. An exchange traded fund is a marketable security, meaning it has an associated price that allows it to be easily bought and sold.


An exchange traded fund (ETF) is a basket of securities that trade on an exchange, just like a stock.
ETF share prices fluctuate all day as the ETF is bought and sold; this is different from mutual funds that only trade once a day after the market closes.2

﻿
ETFs can contain all types of investments including stocks, commodities, or bonds; some offer U.S. only holdings, while others are international.
ETFs offer low expense ratios and fewer broker commissions than buying the stocks individually.


Investors should be aware that many inverse ETFs are exchange traded notes (ETNs) and not true ETFs. An ETN is a bond but trades like a stock and is backed by an issuer like a bank. Be sure to check with your broker to determine if an ETN is a right fit for your portfolio.
