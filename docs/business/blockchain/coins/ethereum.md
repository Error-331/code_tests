# Ethereum

- is an incredibly popular platform for developing **decentralized applications** (DApps); 
- But in recent years, a dramatic surge in adoption has seen the network pushed to its absolute limits — sending transaction fees through the roof and leading to rampant congestion.
While some circles believe that the best way to scale Ethereum is through on-chain tweaks and upgrades, others are instead pursuing different routes, known as second layer solutions;
- Ethash - similar to Bitcoin **proof-of-work** algorithm;

## Means to offset transaction fees

- through on-chain tweaks and upgrades;
- second layer solutions;

## Ether and Gas

- the unit of account in Ethereum is **ether**;
- Ethereum behaves in a similar fashion to bitcoin, with similar transaction address nomenclature;
- Ethereum tracks the balances in the **account state** (is like having all your funds in a bank account);
- **Gas** enables developers to run applications on the Ethereum platform;
- developers can run dapps on Ethereum without encountering **halting problem** (inability to prevent code that runs indefinitely or in infinite loops) due to the usage of **Gas**;
- Ethereum requires **gas** to be used for computations of executed code within a smart contract, so that a dapp is as efficient as is possible;

### Gas

- the pricing mechanism used on the Ethereum network;
- calculates the costs (fees) for performing a transaction or executing a smart contract operation;
- is a special unit that is used to measure how much "work" (computational resources) certain task requires;
- **fees are still paid in ether (ETH)**;
- each unit of gas has a "gas price" that is defined in **ether (ETH)**;
- every transaction has a particular "gas price" for each unit of gas;
- the gas cost is the amount of work, and the gas price is the price paid for "each hour" of work;
- the gas pricing mechanism is important because it guarantees that fees are being charged in a fair and appropriate way;
- **it prevents resources from being wasted on operations that are not valuable to the Ethereum network**;

### Gas limit

- the maximum price a cryptocurrency user is willing to pay when sending a transaction, or performing a smart contract function, in the Ethereum blockchain;
- these fees are calculated in gas unit, and the gas limit defines the maximum value that the transaction or function can "charge" or take from the user;
- the gas limit works as a security mechanism that prevents high fees from being incorrectly charged due to a bug or error in a smart contract;
- if the gas limit and gas price (Gwei) are set to a higher level, the operation will occur much faster;
- what really defines the value paid for transaction fees is the gas price;
- the total cost of a transaction is the gas price (in Gwei) multiplied by the gas limit, which will result in the amount of Ether to be paid;

## ERC-20

- ERC-20 is a technical standard used to issue and implement tokens on the Ethereum blockchain;
- ERC-20 standard describes six functions that maintain some functionalities and features of Ethereum-based digital tokens;
- ERC-20 should not be considered as a piece of code or software, instead, it may be described as a **technical guideline** or **specification**;
- ERC-20 standard makes it easier for developers to predict with more accuracy the interaction between different tokens and applications;
- ERC-20 also defines how ERC-20 tokens are transferred within the **Ethereum blockchain** and how their respective supply and address balances are being consistently recorded;
- ERC-20 tokens can be used to represent various kinds of digital assets or tradable goods (such as coins, vouchers, gold certificates, loyalty points, and IOUs);
- ERC-20 tokens may be used as a mean to tokenize voting rights during elections;
- ERC-20 standard reduced significantly the efforts required to create and issue a digital token;
- ERC-20 is not compliant with Ether (ETH), because it was created before the standard;
- ERC-20 token that represents Ether at a **1:1** ratio (1 WETH = 1 ETH) is Wrapped Ether (WETH);

## Plasma

- It is an off-chain scaling technique, or a framework for building scalable applications, which can be implemented in distinct ways by different research groups or companies;
- Plasma will make it possible for businesses and companies to implement scalable solutions in various ways, according to their specific context and needs;

### Principle of operation

- establish a framework of secondary chains that will communicate and interact as sparingly as possible with the main chain;
- such a framework is being designed to operate as a blockchain tree, which is hierarchically arranged in a way that numerous smaller chains can be created on top of the main one;
- these smaller chains are also referred to as Plasma chains or child chains;
- on top of each child chain, more chains can be created and this is what builds a tree-like structure;
- each Plasma child chain is a customizable smart contract that can be designed to work in a singular way, serving different needs;
- chains can coexist and operate independently;
- chains would alleviate the overall work of the main chain;

### Fraud proofs

- the communication between the child chains and the root chain is secured by fraud proofs;
- root chain is responsible for keeping the network secure and for punishing the malicious actors;
- each child chain has its own mechanisms for validating blocks and a particular fraud-proof implementation;
- fraud proofs ensure that in case of malicious activity, users are able to report dishonest node;

### MapReduce

- is a set of functions that are very useful in organizing and computing data across multiple databases;
- these databases are blockchains;
- tree-like structure of the chains allows for MapReduce to be applied as a way to facilitate the verification of the data within the tree of chains;

### Mass Exit problem

- a scenario where many users try to exit their Plasma chain at the same time, flooding the root chain and causing network congestion (скопление);
- could be triggered by fraudulent activity, network attacks, or any other kind of critical failure that a Plasma child chain, or a group of chains;

## Stack

### Level 1 - Ethereum virtual machine

- runtime environment for smart contracts in Ethereum;
- all smart contracts and state changes on the Ethereum blockchain are executed by transaction;

### Level 2 - smart contracts

- are the executable programs that run on the Ethereum blockchain;
- smart contracts are written using specific programming languages that compile to EVM bytecode;
- smart contracts serve as **open source libraries**;
- smart contracts are essentially **open API services** that are always running and can't be taken down;
- smart contracts provide **public functions** which users and applications (**dapps**) may interact with;

### Level 3 - Ethereum nodes

- for an application to interact with the Ethereum blockchain - it must connect to an **Ethereum node**;
- **Ethereum nodes** are computers running software - an **Ethereum client**;
- a client is an implementation of **Ethereum** that verifies all transactions in each block;
- **Ethereum nodes are the Ethereum blockchain**;
- **Ethereum nodes** collectively store the state of the Ethereum blockchain and reach consensus on transactions to mutate the blockchain state;
- by connecting the application to an **Ethereum node** (via the JSON-RPC API) data can be read and write;

#### Full node

- Stores full blockchain data;
- Participates in block validation, verifies all blocks and states;
- All states can be derived from a full node;
- **Serves the network and provides data on request**;

#### Light node

- Stores the header chain and requests everything else;
- Can verify the validity of the data against the state roots in the block headers;
- Useful for low capacity devices, such as embedded devices or mobile phones, which can't afford to store gigabytes of blockchain data;

#### Archive node

- Stores everything kept in the full node and builds an archive of historical states;
- These data represent units of terabytes (can be handy for services like block explorers, wallet vendors, and chain analytics);

### Level 4 - Ethereum client APIs

- convenience libraries (built and maintained by Ethereum's open source community) allowing applications to connect to and communicate with the Ethereum blockchain;
- while these APIs are not a necessary piece of the stack, they abstract away much of the complexity of interacting directly with an Ethereum node;
- this APIs also provide utility functions (e.g. converting ETH to Gwei);

### Level 5 - end-user applications

- standard applications, regularly used by users (primarily web and mobile apps);
- often users will not need to know the application they're using is built using a blockchain;

## Use Cases

### ICOs

- a project needing to raise money to launch a concept could set up a smart contract to take in **ether**; 
- in return, it could give the donors a redeemable cryptocurrency built on top of Ethereum;
- the legality of ICOs is questionable, and many projects have been ended prematurely because of legal problems they have caused;
