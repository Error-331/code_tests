# Uniswap

Uniswap is a set of computer programs that run on the Ethereum blockchain and allow for decentralized token swaps. 

- is a decentralized exchange protocol built on Ethereum (automated liquidity protocol);
- traders can exchange Ethereum tokens on Uniswap without having to trust anyone with their funds;
- anyone can lend their crypto to special reserves called liquidity pools. In exchange for providing money to these pools, they earn fees;
- allows users to trade without intermediaries;
- Uniswap works with a model that involves liquidity providers creating **liquidity pools**;
- system provides a decentralized pricing mechanism that essentially smooths out **order book** depth;
- Uniswap doesn’t charge any listing fees;

## Principle of operation

### General

- it has no order book;
- hold liquidity reserves (or liquidity pools) that traders can trade against;
- these reserves are funded by liquidity providers;
- anyone can be a liquidity provider who deposits an equivalent value of **two tokens** in the pool;
- traders pay a fee to the pool that is then distributed to liquidity providers according to their share of the pool;

### In deep

- **Liquidity providers create a market by depositing an equivalent value of two tokens**;
- These can either be **ETH** and an **ERC-20** token or two **ERC-20** tokens;
- These pools are commonly made up of stablecoins such as DAI, USDC, or USDT, but this isn’t a requirement;
- In return, liquidity providers get “liquidity tokens,” which represent their share of the entire liquidity pool;
- These liquidity tokens can be redeemed for the share they represent in the pool;

#### Example

##### Setup

- let’s consider the ETH/USDT liquidity pool;
- the ETH portion of the pool **x** and the USDT portion **y**;
- Uniswap takes these two quantities and multiplies them to calculate the total liquidity in the pool - **k**;
- **k** must remain constant, meaning the total liquidity in the pool is constant;
- the formula for total liquidity in the pool is: x * y = k;

##### Trade

- Alice buys 1 **ETH** for 300 **USDT** using the **ETH/USDT** liquidity pool;
- by doing that, she increases the **USDT** portion of the pool and decreases the ETH portion of the pool;
- the price of **ETH** goes up;
- there is less ETH in the pool after the transaction, and we know that the total liquidity (**k**) must remain constant;
- the price paid for this **ETH** is based on how much a given trade shifts the ratio between **x** and **y**;
- this model does not scale linearly;
- the larger the order is, the more it shifts the balance between x and y;
- the larger orders become exponentially more expensive compared to smaller orders, leading to larger and larger amounts of **slippage**;
- the larger a liquidity pool is, the easier it is to process large orders;

## Uniswap v3

### Capital efficiency

- most AMMs are very capital inefficient - most of the funds sitting in them at any given moment are not being used;
- the more liquidity there is in the pool, the bigger orders the system can support in a larger price range;
- liquidity providers (LPs) in these pools essentially provide liquidity for a price curve (range) between 0 and infinity;
- all that capital is sitting there reserved for the scenario when one of the assets in the pool 5x-s, 10x-s, 100x-s;
- this means that only a small portion of the liquidity in the pool is sitting where most of the trading happens;

**Example**: Uniswap currently has about 5B dollars of liquidity locked, while it does only about 1B of volume per day.

#### Solution

- liquidity providers can now set custom price ranges for which they want to provide liquidity for;
- this should lead to more concentrated liquidity in the price range that most trading activity happens in;
- Uniswap v3 is a rudimentary way of creating an on-chain order book on Ethereum, where market makers can decide to provide liquidity in the price ranges they set;
- this change favors professional market makers over retail participants;
- **"lazy" LPs are going to earn much less in trading fees than professional players who can constantly keep optimizing their strategy**;
- aggregators like **yearn.finance** offering retail LPs a way to remain somewhat competitive in this environment;

### Uniswap LP tokens as NFTs

- Uniswap LP positions are not fungible anymore;
- each LP position is now represented by a non-fungible token (NFT);

## Uniswap on layer 2

- Uniswap v3 will also be deployed on a layer 2 scaling solution called an Optimistic rollup;
- It’s a neat way to scale smart contracts while still getting security from the Ethereum network;
- This deployment should lead to a massive increase in the transaction throughput and much lower fees for users;

## UNI token

- it entitles its holders to governance rights;
- UNI holders can vote on changes to the protocol;
- 1 billion UNI tokens have been minted at genesis;
- 60% of those are distributed to existing Uniswap community members;
- 40% will be made available to team members, investors and advisors;