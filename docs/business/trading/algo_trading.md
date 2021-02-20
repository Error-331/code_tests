# Algorithmic trading

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

Slippage obviously causes losses that might not have been correctly factored in, in addition
to difficulty liquidating positions. As the position sizes for trading algorithms scale up,
slippage becomes a larger problem.
Fees are another issue with executing orders efficiently. Typically, there are exchange fees
and broker fees proportional to the size of the orders and the total volume traded.
Again, as the position sizes for trading algorithms scale up, trading volumes typically
increase and fees increase along with it. Oftentimes, a good trading strategy can end up
being non-profitable because it trades too much and accumulates a lot of trading fees.
Again, a good execution logic seeks to minimize the fees paid.

Position and PnL management
All algorithmic trading strategies need to track and manage their positions and PnLs
effectively. Depending on the actual trading strategy, this can often range in complexity.
For more sophisticated trading strategies, such as pairs trading (curve trading is another
similar strategy), you have to track positions and PnLs on multiple instruments and often,
these positions and PnLs offset one another and introduce complexity/uncertainty as
regards determining true positions and PnLs.

Risk management
Good risk management is one of the cornerstones of algorithmic trading. Bad risk
management practices can turn potential profitable strategies into non-profitable ones.
There is an even bigger risk of violating rules and regulations at trading exchanges that can
often lead to legal actions and huge penalties. Finally, one of the biggest risks with high-
speed automated algorithmic trading is that poorly programmed computer software is
prone to bugs and errors. There are many instances of entire firms shutting down due to
automated high-speed algorithmic trading systems that run amok. Hence, risk
management systems need to be built to be extremely robust, feature rich, and have
multiple layers of redundancy. There also needs to be a very high level of testing, stress
testing, and strict change management to minimize the possibility of risk systems failing. In
Chapter 6 , Managing the Risk of Algorithmic Strategies, of this book, we will have an entire
section dedicated to best risk management practices so as to maximize the profitability of
trading strategies as well as avoid common pitfalls resulting in losses or bankruptcy.

Backtesting
When researching an automated trading strategy for expected behavior, a key component
in a good algorithmic trading research system is a good backtester. A backtester is used to
simulate automated trading strategy behavior and retrieve statistics on expected PnLs,
expected risk exposure, and other metrics based on historically recorded market data. The
basic idea is to answer the question: given historical data, what kind of performance would
a specific trading strategy have? This is built by recording historical market data accurately,
having a framework to replay it, having a framework that can accept simulated order flow
from potential trading strategies, and mimicking how a trading exchange would match this
strategy's order flow in the presence of other market participants as specified in the
historical market data. It is also a good place to try out different trading strategies to see
what ideas work before deploying them to market.

Building and maintaining a highly accurate backtester is one of the most complicated tasks
involved in setting up an algorithmic trading research system. It has to accurately simulate
things such as software latencies, network latencies, accurate FIFO priorities for orders,
slippage, fees, and, in some cases, also the market impact caused by the order flow for the
strategy under consideration (that is, how the other market participants may react in the
presence of this strategy's order flow and trading activity). We will revisit backtesting at the
end of this chapter and then again in later chapters in this book. Finally, we explain
practical issues faced in setting up and calibrating a backtester, their impact on an
algorithmic trading strategy, and what approaches best minimize damage caused due to
inaccurate backtesting.


============



We can use trend-following, which means, buying/selling when the price changes by 10%
in 2 hours. This variable tracks our current position in the market:

```python

Current_position_ = 0;

```

This is the expected profit threshold (порог, передел)  for our positions. If a position is more profitable than
this threshold, we flatten the position and the unrealized profit to realized profit (Если позиция прибыльнее, чем
этот порог, мы выравниваем позицию и нереализованную прибыль до реализованной прибыли):


```python

PROFIT_EXIT_PRICE_PERCENT = 0.2;

```

This is the maximum loss threshold for our positions. If a position is losing more than this
threshold, we flatten the position and convert the unrealized loss to realized loss. Why
would we close a position if it's losing money? The idea is simply to not lose all of our
money on one bad position, but rather cut our losses early so that we have capital to
continue trading. More on this when we dive into risk management practices in more
detail. For now, we define a parameter that is the maximum allowed loss for a position in
terms of the price change from the entry price for our position:

```python

LOSS_EXIT_PRICE_PERCENT = -0.1;

```

Note that in the thresholds we saw, we expect to make more money on our
winning/profitable positions than we expect to lose on our losing positions. This is not
always symmetrical, but we will address the distributions of winning and losing positions
when we look into these trading strategies in greater detail later in this book. This is a
method/callback that is invoked every time the market prices change. We need to check
whether our signal causes an entry and whether one of our open positions needs to be
closed for PnL reasons:

```python

def OnMarketPriceChange( current_price, current_time ):

```

First, check whether we are flat and prices have moved up more than 10% . This is our entry
signal to go long, so we will send a buy order and update our position. Technically, we
should not update our position until the exchange confirms that our order matched, but for
the sake of simplicity in this first-pass pseudo code, we ignore that complexity and address
it later:

```python

If Current_position_ == 0 AND ( current_price - price_two_hours_ago ) /
current_price >; 10%:
SendBuyOrderAtCurrentPrice();
Current_position_ = Current_position_ + 1;

```

cur_price = 10 (???);

two_hours_ago_price = 5 (100%);

(10 - 5) / 10 = 0.5

===

10 - ???
5 -  100%

6 - ???
5 - 100%

Now, check whether we are flat and prices have moved down more than 10% . This is our
entry signal to go short, so we will send a sell order and update our position:

```python

Else If Current_position_ == 0 AND ( current_price - price_two_hours_ago )
/ current_price < -10%:
SendSellOrderAtCurrentPrice();
Current_position_ = Current_position_ - 1;

```

If we are currently long, and market prices have moved in a favorable direction, check
whether this position's profitability exceeds predetermined thresholds. In that case, we will
send a sell order to flatten our position and convert our unrealized profit to realized profit:

```python

If Current_position_ >; 0 AND current_price - position_price >;
PROFIT_EXIT_PRICE_PERCENT:
SendSellOrderAtCurrentPrice();
Current_position_ = Current_position_ - 1;

```


If we are currently long, and market prices have moved against us, check whether this
position loss exceeds predetermined thresholds. In that case, we will send a sell order to
flatten our position and convert our unrealized loss to realized loss.

```python

Else If Current_position_ >; 0 AND current_price - position_price <
LOSS_EXIT_PRICE_PERCENT::
SendSellOrderAtCurrentPrice();
Current_position_ = Current_position_ - 1;

```

If we are currently short, and market prices have moved in a favorable direction, check
whether this position profitability exceeds predetermined thresholds. In that case, we will
send a buy order to flatten our position and convert our unrealized profit to realized profit:

```python

Else If Current_position_ < 0 AND position_price - current_price >;
PROFIT_EXIT_PRICE_PERCENT:
SendBuyOrderAtCurrentPrice();
Current_position_ = Current_position_ - 1;

```

If we are currently short, and market prices have moved against us, check whether this
position loss exceeds predetermined thresholds. In that case, we will send a buy order to
flatten our position and convert our unrealized loss to realized loss:

```python

Else If Current_position_ < 0 AND position_price - current_price <
LOSS_EXIT_PRICE_PERCENT:
SendBuyOrderAtCurrentPrice();
Current_position_ = Current_position_ - 1;

```

