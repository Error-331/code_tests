# Bitcoin

## Omni Layer

Omni Layer is an open source, decentralized asset infrastructure built on Bitcoin. It is the successor of the work produced by the **Mastercoin Foundation** with the funding from its ICO 
in 2013. 

- Omni Layer is an ongoing project, with its reference implementation known as **Omni Core**;
- Omni Core essentially enhances elements of Bitcoin with additional features;
- Omni Core provides smart contract capabilities, enabling developers to automate currency functions in a decentralized and transparent way;

## Principle of operation

By building a second-layer protocol on top of Bitcoin, Omni benefited from the large network effect Bitcoin already had.

- _Custom currencies_ - anyone can create currencies where the ledger is managed by the Omni Layer network;
- _Decentralized exchange_ - instead of using a centralized exchange to facilitate the exchange of two currencies between parties, the Omni Layer code executes this trade;
- _Adding custom logic_ - **bitcoin** added the _OP_RETURN_ field, which enables the attachment of additional data to a bitcoin transaction;

## Limitations of Omni Core (in terms of development)

- blockchain scaling and speed depended on Bitcoin and its core developers;
- **Omni Core** still has limited influence over the future of the blockchain it runs on;
- the **Bitcoin** blockchain is not designed for program execution;
- this blockchain optimized for store of value, and its limited scripting language means that it will never be suitable for sophisticated smart contracts built directly on top of it;

## Lightning Network

- is a network that sits on top of a blockchain to facilitate fast **peer-to-peer** transactions;
- it allows individuals to transact without having to record every transaction on the blockchain;
- is separate from the Bitcoin network - it has its own **nodes** and **software**, but it nonetheless communicates with the main chain;
- smart contract holding a private ledger with the other user;
- mini-ledger is called a **channel**;

**Example:**

- Alice and Bob put **5 BTC** each into the smart contract;
- In their **channel** - they’d now both have a balance of 5 BTC;
- Alice could then write to the ledger pay 1 BTC to Bob;
- Now, Bob has 6 BTC on his side, and Alice has 4;
- Then, Bob could send 2 BTC back to Alice at a later date, updating the balances to 6 BTC on Alice’s side and 4 BTC on Bob’s;
- They can continue to do this for a while;
- At any time, either can publish the current state of the channel to the blockchain;
- At that point, the balances on each side of the channel are allocated to their respective parties on-chain;

### Principle of operation

- multisignature addresses;
- Hash Timelock Contracts (HTLCs);
- routing payments;

### Benefits

- scalability;
- micropayments (0.00000001 BTC);
- privacy;

### Limitations

- usability (too few apps);
- liquidity (ability to transact is constrained);
- centralized hubs;