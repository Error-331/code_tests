# MakerDAO (DAI)

MakerDAO is a Decentralized Finance (DeFi) project with a crypto-collateralized, stablecoin DAI pegged to the US dollar.

- famous crypto-backed stablecoins that tracks USD on Ethereum;
- the coin is managed by the **MakerDAO community** that holds the governance token **MKR**;
- user can use MKR to create and vote on proposals to change the project;
- DAI is over-collateralized to deal with the volatility of crypto, and users enter into Collateralized Debt Positions (CDPs) that manage their collateral;
- the whole process is run via smart contracts;
- **user can also use DAI as leverage and invest it in the DAI Savings Rate contract for interest**;

### DAI

- is MakerDAO's stablecoin tied to the US dollar;
- the **ERC-20** token has an unlimited supply so long as users keep supplying collateral to generate more DAI;
- it's more suitable for expenditures that require stability;
- DAI benefits from all the advantages of the blockchain;
- user can use it to lock in profits or losses and hedge risk - helpful to enter or exit positions without going off-chain;

## Principle of operation

### DAI

- its community manages the coin via a Decentralized Autonomous Organization (DAO); 
- users generate DAI by locking cryptocurrency in a **Maker Vault** at a certain Liquidation Ratio;
- the stablecoin is **overcollateralized** to account for crypto's volatile prices, and a Stability Fee is also charged;
- user's crypto is liquidated and used to recover any losses if user's collateral drops below the Liquidation Ratio;
- DAI remains stable as its DAO controls the Stability Fee and Dai Savings Rate; 
- the Stability Fee affects DAI's supply by changing the cost of minting DAI; 
- the DAI Savings Rate affects the coin's demand, changing investors' returns on staking DAI; 
- when DAI moves from its peg, the DAO uses these two mechanisms to bring it back;

Example: a 125% Liquidation Ratio requires $1.25 of crypto collateral value for each $1 of DAI.

### MakerDAO

- MakerDAO is an Ethereum (ETH) project;
- MakerDAO ecosystem uses the governance token MKR for project proposals and decisions;
- users access MakerDAO via the Oasis DApp;
- users can create collateral loans, take part in governance, and manage their existing Maker Vaults;
- these interactions rely on smart contracts and game theory, allowing DAI to maintain a relatively stable value;

### Collateralized debt positions (CDP)

- when the user want to borrow DAI stablecoin, user lock up crypto in a **CDP** smart contract;
- this CDP will set a **Liquidation Ratio** (for example, 1.5x), meaning that user need to provide $150 of ETH for $100 of DAI;
- a user can add more if they want and reduce their risk;
- if the collateral amount falls below 150% (1.5x), user incur a penalty fee;
- eventually, the user risks liquidation if they fail to repay their DAI with the added interest rate;

### Maker Vaults

- are where users put up their collateral and generate DAI;
- these allow user to use multiple, different cryptocurrencies as collateral simultaneously;
- the Maker Vault also burns DAI once a user returns it;

#### Steps

1. User deposits supported cryptocurrencies to the Maker Protocol;
2. The deposit opens a Maker Vault position;
3. User can withdraw Dai determined by his collateral amount (user also need to pay the **Stability Fee**);
4. To get his crypto collateral back, user need to repay the withdrawn DAI;

### Peg mechanism

#### DAI falls below the peg

- the system makes it attractive for users to repay their debts, retrieve their collateral, and burn their DAI; 
- this can be achieved by raising the Stability Fee, which makes borrowing more expensive;
- the DAO could also increase the DAI Savings Rate, increasing demand for investment in the token;

#### DAI rises above the peg

- the DAO creates incentives to generate DAI if the Stability Fee is lowered;
- this creates new DAI and increases the total supply, lowering the price;
- **MakerDAO could also decrease DAI's demand by reducing the DAI Savings Rate, meaning investors look elsewhere to earn interest**;

## Use cases

#### Leverage

**Example**:

- user have $1000 of ETH, and he thinks the price will **rise**; 
- however, he does not currently have extra funds to buy ETH;
- user can use his ETH as collateral, generate DAI, and then use that to buy more ETH; 
- if the price of ETH rises and he wants to cash out, he can sell some of it for DAI tokens and retrieve his collateral;

#### DAI Savings Rate

- user can earn interest by depositing DAI into the DAI Savings Rate smart contract; 
- this rate varies as the DAO tries to control DAI’s price;
