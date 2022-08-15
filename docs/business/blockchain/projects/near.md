# NEAR

NEAR Protocol is a layer-1 blockchain that uses **Nightshade**, a unique **sharding** technology, to achieve scalability.

- uses smart contracts and adopts the Proof of Stake (PoS);
- offers cross-chain interoperability through the **Rainbow Bridge**;
- offers cross-chain interoperability through the layer-2 solution called **Aurora**;
- users can bridge ERC-20 tokens and assets from the Ethereum blockchain to the NEAR Protocol network;
- NEAR is the native token of the NEAR Protocol (used for paying transaction, data storage fees, staking);
- platform contains a wide range of programming tools and languages, as well as smart contracts;

## Principle of operation

### Nightshade Sharding

- is the core technology of the NEAR blockchain;
- sharding technology (splitting the work of processing transactions across many validator nodes - each node will handle only a fraction of the network’s transactions);
- **Nightshade** utilizes block producers and validators to process transaction data in parallel across multiple shards;
- **Nightshade** may allow NEAR to handle millions of transactions per second without affecting its performance;
- validators do not compete for the next block based on the size of their stake;
- uses an election mechanism called the **Thresholded Proof of Stake (TPoS)** to select **validators** (determine the minimum threshold for becoming a validator by the number of stacked coins);

### Rainbow Bridge

- **is an application** on NEAR that allows users to transfer ERC-20 tokens, stablecoins, wrapped tokens, and even NFTs between the Ethereum and NEAR blockchains;
- is fully permissionless and decentralized;
- users can send ERC-20 assets directly from MetaMask or other Web3 wallets to the NEAR Wallet and vice-versa;
- **they need to deposit the token in an Ethereum smart contract**;

### Aurora

- is a **layer-2** solution on the NEAR Protocol blockchain;
- aims to help developers expand their apps on an Ethereum-compatible platform (offers **low transaction costs** for their users);
- able to host thousands of transactions per second;
- is composed of the **Aurora Engine** and the **Aurora Bridge**;
- **Aurora Engine** is an Ethereum Virtual Machine (EVM) on the NEAR Protocol (compatible with Ethereum and supports all tools available in the Ethereum ecosystem);
- **Aurora Bridge** (same as Rainbow Bridge) - bridge users smart contracts and ERC-20 tokens between the **Ethereum** and **NEAR Protocol** blockchains;
- users can also pay transaction fees with ETH on Aurora;

## NEAR token

- ERC-20 token with a max supply of 1 billion;
- can be used for paying transaction and storage fees on the network;
- smart contract developers can receive a portion of the transaction fees their contract generates (the remaining transaction fees will be burned);
- the remaining transaction fees will be burned (run validating nodes for rewards that amount to 4.5% of the total NEAR supply);