# Yearn (YFI)

- provides yield generation, lending aggregation;
- governed by YFI holders;
- many of Yearn's vaults generate yield by using **Curve Finance** liquidity provider (LP) tokens, which are acquired through depositing into a **Curve pool**;

## YFI

- YFI is the native cryptocurrency of the Yearn.finance protocol;
- It is a governance token that allows users to vote on which direction they want the protocol to head;
- YFI has become one of the largest Ethereum-based tokens due to the protocol's focus on automated yield farming strategies;
- YFI is like a robot that always tries to find the best yields in Ethereum DeFi;
- YFI provides its users with access to the highest yields on deposits of ether, stablecoins, and altcoins;

## Key features

- Vaults - main feature of the protocol, it allows users to deposit cryptocurrency and earn yields;
- The deposited funds are managed by a strategy that attempts to maximize yields and minimize risk; 
- Vaults are focused on stablecoins, tokenized Bitcoin products, Chainlink, and other coins;
- Vaults mitigate the high cost of transacting on Ethereum, by pooling capital; 
- Only one account (the controller of each Vault) has to pay transaction fees (gas) to yield farm;

### Farming methods

- providing liquidity to Balancer (decentralized exchange); 
- depositing capital into Yearn.finance's products;

## Decentralizing Yearn.finance

- YFI coin also had another purpose: to decentralize development and control of the protocol amongst users;
- The farming mechanism allowed any user – whether they had $100 or $1,000,000 – to earn YFI at the same time and at the same cost;
- A comprehensive governance portal has launched where token holders can vote on various decisions proposed by community members;
- Decisions that have been made thus far include the hiring of a team of marketers and developers and the addition of certain strategies to Vaults;
- Holders have also made the crucial decision to provide YFI holders with access to a portion of the protocol profits;
- Fees implemented within Yearn.finance products accrue to the Treasury, which is subsequently distributed between YFI holders and the team; 
- This makes YFI a *dividend-yielding asset*, which is different from Bitcoin or Ethereum;

## Advantages

- YFI users had to participate in the protocol (instead of just buy coins); 
- every user had the same ability to influence Yearn.finance through the governance token;
- Yearn.finance has one of the most active communities in the decentralized finance space and cryptocurrencies as a whole;

## Challenges

- This was accentuated earlier this year when it was reported that Cronje said he wanted to leave the DeFi space; 
- YFI prices proceeded to crumble amid fears of the project shutting down;

## Usage

### Zapping

- 'zap' feature - automatically converts users tokens to proper ones which can be used in the vault;
- Zapping a token into a vault will require more transactions than depositing the native token(more payments in gas and potentially lose value to slippage);  
- Yearn limits slippage to 1% and the transaction will fail if slippage exceeds that, user have to swap or deposit the tokens manually;
- withdrawal tokens: ETH, WETH, DAI, USDT, USDC, WBTC;

## Vaults

- **yVaults** are like savings accounts for your crypto assets;
- **vaults** accept your deposit, then route it through a strategies which seek out the highest yield available in DeFi;
- **the token you deposit in a yVault is the token you’ll receive yield**, always automatically compounded into the yVault;
- **a yVault may have many strategies active at the same time**;

### Fee structure

- **20% Performance Fee** deducted from yield earned every time a vault harvests a strategy;
- **2% Management Fee** flat rate taken from vault deposits over a year, this is done at the time of harvest, and calculated based off of time since the previous harvest;

**Example:** 

- a vault takes about .0055% of deposits per day on average (2 (percent)/365 (days));
- it would dilute(разбавить) vault tokens by 5 * .0055% after 5 days without harvesting;
- it would dilute(разбавить) vault tokens by 7 * .0055% on the next harvest if it had not happened for 7 days;
- vaults will only harvest if it is profitable after fees so that users won't withdraw less than their deposit;

## Vaults and Strategies

- after depositing, funds of the user first go to the vault contract and then are deployed to one or more **strategy contracts**; 
- **guardians** and **strategists** monitor deposits in order ensure optimal returns and to be available during critical situations;
- there are no deposit/withdrawal fees charged to the user;
- **strategists** are people that build one or more underlying **Strategies** for yVaults;
- strategies avoid Impermanent Loss (e.g. don’t provide YFI/ETH liquidity in a liquidity pool);

### Strategists rewards

- up to 10% of the generated yield fees by a specific strategy (performance fee) goes to the strategist;
- 10% of the generated yield fees by all strategies (performance fee) goes to the Yearn DAO treasury;
- over the year 2% of the vault’s total assets are taken as fees which go to Yearn to pay for expenses like gas, developer grants, and other services;
