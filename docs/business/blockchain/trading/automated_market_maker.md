# Automated Market Maker (AMM)

Is a type of decentralized exchange (DEX) protocol that relies on a mathematical formula to price assets instead of using an **order book** like a traditional exchange. Ome use a simple 
formula like **Uniswap**, while **Curve**, **Balancer** and others use more complicated ones.

**Example:**

- Uniswap uses x * y = k, where x is the amount of one token in the liquidity pool, and y is the amount of the other;
- in this formula, k is a fixed constant, meaning the pool’s total liquidity always has to remain the same;
- traditional market making usually works with firms with vast resources and complex strategies;
- market makers help you get a good price and tight bid-ask spread on an order book exchange like Binance;
- automated market makers decentralize this process and let essentially anyone create a market on a blockchain;

## Principle of operation

- an AMM works similarly to an **order book** exchange in that there are **trading pairs**;
- however, you don’t need to have a counterparty (another trader) on the other side to make a trade;
- instead, you interact with a smart contract that **"makes"** the market for you;
- **what price you get for an asset you want to buy or sell is determined by a formula instead**;
- there’s no need for counterparties;
- the liquidity in the smart contract still has to be provided by users called liquidity providers;

## Liquidity pool

- a liquidity pool is a big pile of funds that traders can trade against;
- in return for providing liquidity to the protocol, LPs earn fees from the trades that happen in their pool;
- anyone can become a market maker, it is quite easy to add funds to a liquidity pool;
- the rewards are determined by the **protocol**;

**Example:**

- Uniswap v2 charges traders 0.3% that goes directly to LPs;
- Other platforms or forks may charge less to attract more liquidity providers to their pool;
- The more liquidity there is in the pool, the less **slippage** large orders may incur;
- The slippage issues will vary with different AMM designs;
- In a simplified way, it’s determined by how much the ratio between the tokens in the liquidity pool changes after a trade
- **If the ratio changes by a wide margin, there’s going to be a large amount of slippage.**

**Example:**

- User wants to buy all the ETH in the ETH/DAI pool on Uniswap; 
- He could not do that - he had to pay an exponentially higher and higher premium for each additional ether, but still he could never could buy all of it from the pool; 
- It’s because of the formula **x * y = k**; 
- If either x or y is zero, meaning there is zero ETH or DAI in the pool, the equation doesn’t make sense anymore;

## Risks

### Impermanent loss

- happens when the price ratio of deposited tokens changes after you deposited them in the poolж
- the larger the change is, the bigger the impermanent loss;
- this is why AMMs work best with token pairs that have a similar value, such as **stablecoins** or wrapped tokens;
- if the price ratio between the pair remains in a relatively small range, impermanent loss is also negligible;
- on the other hand, if the ratio changes a lot, liquidity providers may be better off simply holding the tokens instead of adding funds to a pool;
- even so, Uniswap pools like ETH/DAI that are quite exposed to impermanent loss have been profitable thanks to the trading fees they accrue;
- **if you withdraw your funds at a different price ratio than when you deposited them, the losses are very much permanent**;

### Rug pull

- If the project team is providing a good portion of the liquidity for the market pair on the AMM, they can just as well remove it and dump the tokens on the market;
- this typically results in the token price essentially going to zero; 
- as there basically isn’t a market left to sell in, this is often called a rug pull.