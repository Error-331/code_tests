# Terra (LUNA)

Terra is a blockchain network built using **Cosmos SDK** specializing in stablecoin creation.

- each Terra stablecoin is convertible into the network's native token, LUNA;
- LUNA allows holders to pay network fees, participate in governance, stake in the Tendermint Delegated Proof of Stake consensus mechanism, and peg stablecoins;
- to peg a stablecoin like TerraUSD (UST), a USD value of LUNA is convertible at a 1:1 ratio with UST tokens;
- if UST's price is, for example, at $0.98, **arbitrageurs** swap 1 UST for $1 of USD and make 2 cents;
- when UST is above $1, say at $1.02, **arbitrageurs** convert $1 of LUNA into 1 UST and make 2 cents;

## Principle of operation

**Example:**

- imagine user want to mint $100 of TerraUSD (UST), which is equal to 100 UST at the peg;
- to mint the UST, user needs to convert an equivalent monetary amount of LUNA tokens;
- Terra will then burn the **LUNA** tokens you supply;
- So, if the price of LUNA is $50 per coin, the algorithm would require user to burn 2 LUNA to mint 100 UST;
- user can also mint LUNA with Terra stablecoins;
- minting $100 of LUNA (2 LUNA) would require burning 100 UST;
- even if the market price of UST isn't $1 per token, the conversion rate for minting treats 1 UST as equal to $1;

**In-deep example:**

1. The price of 1 UST falls to $0.98 (however, for all conversions between Terra stablecoins and LUNA, 1 UST is treated as being worth $1);
2. An arbitrageur sees this price difference, they proceed to buy 100 UST for $98 and then convert it to $100 of LUNA;
3. The arbitrageur can either keep their $100 of LUNA or convert it to fiat and cash out their profit;
4. The increased purchasing of UST by arbitrageurs increases UST's price;
5. Terra burns the UST during the exchange to LUNA, reducing its supply and contributing to increasing UST's price;

**In-deep example (reverse):**

1. The price of 1 UST rises $1.02, which also provides arbitrageurs a way to make a profit;
2. Arbitrageurs purchase $100 of LUNA and convert it to $102 worth of UST (Terra burns the LUNA and mints UST in the process);
3. The arbitrageurs can then sell that UST on the open market to capture the profit;

### Terra

- is a blockchain that lets users create stablecoins pegged to fiat currencies;
- these coins primarily use the network's **seigniorage** mechanism;
- uses **Tendermint Delegated-Proof-of-Stake (DPoS)** as its consensus mechanism;
- Terra provides smart contract capability for the creation of a wide range of different stablecoin types;
- the project has proved popular in the **Asian** markets for e-commerce and has a large userbase in **South Korea**;
- tokens minted on the platform are known as **Terra currencies** and exist alongside the network's native LUNA token for governance and utility;
- Terra already has stablecoins pegged to the **US Dollar**, South Korean **Won**, and **Euro**, among others;

### Terra stablecoins

- stablecoins on the Terra network use a different method to maintain price parity than collateralized fiat-backed stablecoins and crypto-backed stablecoins;
- Terra's stablecoins, use **algorithmic methods** to control their supply and maintain the peg;
- each stablecoin is, in effect, backed up and exchangeable for the governance and utility token LUNA; 
- Terra acts as a counterparty for anyone looking to swap their stablecoins for LUNA and vice versa, which affects the two tokens' supplies;

### Luna

LUNA is Terra's cryptocurrency that plays four different roles.

1. A method to pay transaction fees in its **gas system** (utility token);
2. A way to take part in the platform's **governance** system;
3. A mechanism to absorb demand fluctuations for stablecoins minted on Terra to maintain price pegs;
4. A token to stake in the DPoS consensus mechanism behind validators processing network transactions;

#### Staking

- by staking LUNA, users receive rewards taken directly from **swap fees** on the Terra protocol;
- users pay these fees any time they switch between LUNA and a Terra stablecoin;
- system should provide staking yields of around 7-9%;

## Terra's Delegated Proof of Stake consensus

- users (or delegators) stake their tokens behind a validator;
- the validator secures the network by processing transactions similar to the work of a miner on Bitcoin;
- each validator can also set a custom percentage of the rewards they will distribute to their delegatorsж
- validators must also lock up a set amount of LUNA for at least 21 days;

## Anchor Protocol (ANC)

With Anchor Protocol, user can earn interest, borrow, and lend crypto through over-collateralization.

- user can stake ANC-UST Terraswap LP tokens to receive ANC rewards;
- user can stake ANC by itself;
- user can borrow stablecoins through Anchor Protocol;