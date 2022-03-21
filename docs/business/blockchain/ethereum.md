# Ethereum

- is an incredibly popular platform for developing **decentralized applications** (DApps); 
- But in recent years, a dramatic surge in adoption has seen the network pushed to its absolute limits — sending transaction fees through the roof and leading to rampant congestion.
While some circles believe that the best way to scale Ethereum is through on-chain tweaks and upgrades, others are instead pursuing different routes, known as second layer solutions. 

## Means to offset transaction fees

- through on-chain tweaks and upgrades;
- second layer solutions;

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