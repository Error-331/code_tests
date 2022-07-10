# Limit Order

- is an order that user place on the order book with a specific limit price;
- the trade will only be executed if the market price reaches users limit price (or better);
- user may use limit orders to buy at a lower price or to sell at a higher price than the current market price;
- to place a limit order, user needs to set a maximum or minimum price he is willing to buy or sell an asset;
- order will only be executed if the market price reaches the limit price (or better);

## Principle of operation

- when a limit order is submitted, it will be placed on the **order book** immediately;
- it won’t be filled unless the coin price reaches the specified limit price (or better);
- limit orders can last up to 90 days

**Example:**

- user wants to sell 10 BNB at $600, and the current price is $500;
- user can place a BNB sell limit order of $600;
- when the BNB price reaches the target price or above, users order will be executed depending on market liquidity;
- if there are other BNB sell orders placed ahead of users, the system will execute those orders first; 
- users limit order will be filled afterward with the remaining liquidity;

## Differences

### Stop-loss

- a stop-loss order is a market order that triggers when the market reaches users stop price;
- it’s an order to buy or sell a coin at the market price once the coin price hits the stop price user have set;
- when triggered, a stop-loss order turns into a market order and executes at the **current market price**;
- **if the stop price isn’t reached, users order will not be executed**;
- sell stop orders can be used to **minimize potential losses** in case the market moves against your position;
- they can also be used as a **"take-profit"** order to exit a position and protect unrealized profits;
- buy stop orders can also be used to enter the market at a lower price;
- **the limit order will execute at the limit price you set (or better)**;
- **the stop-loss will execute (as a market order) at the current market price**;
- **if the market price changes too fast, users order might be filled at a price that differs significantly from the trigger price**;

### Stop-limit

- stop-limit order combines the features of a stop order and a limit order;
- once the stop price is reached, it will automatically trigger a limit order;
- the order will then execute if the market price matches the limit price or better;
- **the stop-limit order will only place a limit order if the stop price is reached;**
- **the limit order will be placed instantly on the order book;**