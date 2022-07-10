# Impermanent Loss

**Impermanent loss happens when the price of users tokens changes compared to when you deposited them in the pool.** The larger the change is, the bigger the loss. In this case, 
the loss means less dollar value at the time of withdrawal than at the time of deposit.

## Principle of operation

- Pools that contain assets that remain in a relatively small price range will be less exposed to impermanent loss;
- Stablecoins or different wrapped versions of a coin, for example, will stay in a relatively contained price range ( smaller risk of impermanent loss);
- Impermanent loss can still be counteracted by trading fees (торговые сборы);

**Example:**

- Alice deposits **1 ETH** and **100 DAI** in a liquidity pool;
- In this particular automated market maker (AMM), the deposited token pair needs to be of equivalent value;
- This means that the price of ETH is **100 DAI** at the time of deposit;
- This also means that the dollar value of Alice’s deposit is **200 USD** at the time of deposit;
- In addition, there’s a total of **10 ETH** and **1,000 DAI** in the pool – funded by other LPs just like Alice;
- Alice has a **10%** share of the pool, and the total liquidity is **10,000**;
- The price of ETH increases to **400 DAI**;
- While this is happening, arbitrage traders will add DAI to the pool and remove ETH from it until the ratio reflects the current price;
- Remember, AMMs don’t have order books;
- What determines the price of the assets in the pool is the ratio(соотношение) between them in the pool;
- While liquidity remains constant in the pool (**10,000**), the ratio of the assets in it changes;
- If **ETH** is now **400 DAI**, the ratio between how much ETH and how much DAI is in the pool has changed;
- There is now **5 ETH** and **2,000 DAI** in the pool, thanks to the work of arbitrage traders;
- As we know from earlier, she’s entitled to a **10% share** of the pool; 
- As a result, she can withdraw **0.5 ETH** and **200 DAI**, totaling **400 USD**;
- But what would have happened if she simply holds her **1 ETH** and **100 DAI**? - the combined dollar value of these holdings would be **500 USD** now;
- We can see that Alice would have been better off by holding rather than depositing into the **liquidity pool**;
- This is what we call **impermanent loss**; 

## Impermanent loss estimation

- impermanent loss happens when the price of the assets in the pool changes;
- impermanent loss happens no matter which direction the price changes;
- the only thing impermanent loss cares about is the price ratio relative to the time of deposit;

## Risks

- **the losses only become realized once you withdraw your coins from the liquidity pool**;
- some liquidity pools are much more exposed to impermanent loss than others;
- **the more volatile the assets are in the pool, the more likely it is that you can be exposed to impermanent loss**; 

**Notes:**

- it can also be better to start by depositing a small amount; 
- that way, you can get a rough estimation of what returns you can expect before committing a more significant amount;
- look for more tried and tested AMMs;
- if a liquidity pool promises unusually high returns, there is probably a tradeoff somewhere, and the associated risks are likely also higher;