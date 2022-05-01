# Stablecoin

Is a cryptocurrency that mimics the value of a fiat currency. Stablecoins removes the extra costs and delays of converting between crypto and 
fiat currencies.

## Distribution

- stablecoins uses pegging (привязка) mechanism; 
- there are multiple ways to do this, and most rely on another asset acting as collateral; 
- some methods have proved more successful than others, but there is still no such thing as a guaranteed peg;

## Types

### Fiat-backed stablecoins

- a fiat-backed stablecoin keeps a fiat currency, such as USD or GBP, in reserves; 
- each BUSD is backed up by a real US dollar held as collateral;
- users can then convert from fiat into a stablecoin and vice versa at the pegged rate; 
- if the price of the token drifts from the underlying fiat, arbitrageurs will quickly bring the price back to the fixed rate;

Example:

- a BUSD is trading above one dollar; 
- arbitrageurs turn US dollars into BUSD and sell it for more on the market; 
- this increases the supply of BUSD for sale and lowers the price to one dollar again; 
- if BUSD trades below one dollar, traders purchase BUSD and convert it to USD; 
- this increases demand for BUSD, raising its price back to one;

### Crypto-backed stablecoins

- work in a similar way as fiat-backed stablecoins; 
- but instead of fiat currency as reserves, they have cryptocurrencies acting as collateral;
- as the crypto market is highly volatile, crypto-backed stablecoins usually over-collateralize the reserves as a measure against price swings;
- such stablecoins use smart contracts to manage minting and burning; 
- this makes the process more reliable as users can independently audit the contracts; 
- however, some crypto-backed stablecoins are run DAOs, where the community can vote for changes in the project;
- when the stablecoin is below $1, incentives are created for holders to return their stablecoin for the collateral; 
- this decreases the supply of the coin, causing the price to rise back to $1; 
- when it’s above $1, users are incentivized to create the token, increasing its supply and lowering the price;
- all crypto-backed stablecoins rely on a mix of game theory and on-chain algorithms to incentivize price stability;

Example:

- to mint $100 of a DAI pegged to USD, user will need to provide $150 of crypto working at 1.5x collateral; 
- once the user have his DAI, he can use it how he want; 
- he can transfer it, invest with it, or simply keep it; 
- if the user wants his collateral back, he need to pay back the 100 DAI; 
- however, if his collateral drops below a certain collateral ratio or the loan’s value, it will be liquidated;

### Algorithmic stablecoins

- algorithmic stablecoins removes the need for reserves; 
- instead, algorithms and smart contracts manage the supply of the tokens issued, similar to the monetary policy of a central bank; 
- this model is much rarer than crypto or fiat-backed stablecoins and more challenging to run successfully;
- an algorithmic stablecoin system will reduce the token supply if the price falls below the fiat currency it tracks; 
- this could be done via locked staking, burning, or buy-backs;
- if the price surpasses the value of the fiat currency, new tokens enter into circulation to reduce the stablecoin’s value;

## Advantages

- can be used for day-to-day payments;
- have the benefits of being blockchain-based;
- can be used by traders and investors to **hedge** their portfolios;

## Disadvantages

- aren’t guaranteed to maintain their peg;
- lack of transparency;
- fiat-collateralized stablecoins are usually more centralized than other cryptocurrencies;
- crypto-collateralized and uncollateralized coins rely heavily on their community to function;
