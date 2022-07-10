# Slippage

- is a common occurrence in markets with high volatility or low liquidity;
- occurs when a trade settles for a different price than expected or requested;
- when the user creates a **market order**, an exchange matches his purchase or sale automatically to limit orders on the **order book**;
- the order book will match users price with the best price, but he will start going further up the order chain if there’s an insufficient volume for your desired price;
- this process results in the market filling order of the user at **unexpected**, **different** prices;

**Example:**

- suppose user wants to place a large market buy order at $100;
- the market doesn't have the necessary liquidity to fill his order at that price;
- user have to take the following orders (above $100) until his order is filled entirely;
- this will cause the average price of his purchase to be higher than $100;

## Positive slippage

Positive slippage can occur if the price decreases while the user makes his **buy order** or increases if he makes a sell order.

## Slippage tolerance

- some exchanges allow user to set a slippage tolerance level manually to limit any slippage he might experience;
- the amount of slippage user can set can have a knock-on effect on the time it takes his order to clear;
- if the user sets the slippage low, his order may take a long time to fill or not fill at all;
- if the user sets it too high, another trader or bot may see his pending order and **front-run** him;
- front running happens when another trader sets a higher gas fee than the user to purchase the asset first;
- the front runner then inputs another trade to sell it to the user at the highest price user are willing to take based on his **slippage tolerance**;

### Minimizing negative slippage

- instead of making a large order, it should be broken into smaller ones;
- keep a close eye on the order book to spread out orders, making sure not to place orders that are larger than the available volume;
- in case of **decentralized exchange** - don't forget to factor in **transaction fees**;
- if you're dealing with assets with low liquidity, like a **small liquidity pool**, your trading activity could significantly affect the **asset’s price**;
- use **limit orders**, these orders make sure you get the price you want or **better** when trading;