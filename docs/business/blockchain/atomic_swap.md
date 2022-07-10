# Atomic Swaps

Atomic swaps consist of a technique that allows the quick exchange of two different cryptocurrencies, running on distinct blockchain networks. 

## Principle of operation

- atomic swap protocols are designed in a way that prevents any of the involved parties from cheating;
- the term **'atomic'** relates to the fact that these transactions either happen entirely or not at all;
- if any of the parties give up or fails to do what they are supposed to, the contract is canceled, and the funds are automatically returned to their owners;
- on-chain atomic swaps happen on either of the currency’s networks;
- off-chain atomic swaps, on the other hand, take place on a secondary layer ( based on bidirectional payment channels, similar to the ones used in the **Lightning Network**);
- most of these trustless trading systems are based on smart contracts that use multi-signatures and Hash Timelock Contracts (HTLC);

**Example:**

- let’s imagine that Alice wants to trade her **Litecoins** (LTC) for Bob’s **Bitcoins** (BTC);
- alice deposits her LTC into a contract address that acts like a safe;
- when this safe is created, Alice also generates a key to access it;
- she then shares a cryptographic hash of this key with Bob;
- note that Bob can’t access the LTC yet because he only has the hash of the key and not the key itself;
- next, Bob uses the hash provided by Alice to create another safe contract address, in which he deposits his BTC;
- to claim the BTC, Alice is required to use that same key and, by doing so, she reveals it to Bob (thanks to a special function called hashlock);
- this means that as soon as Alice claims the **BTC**, Bob is able to claim the **LTC** and the swap is complete;

## Advantages

- cross-chain swaps can be executed by two (or more) parties without requiring them to trust each other;
- there is also an increased level of security because users don’t need to give their funds to a centralized exchange or third party;
- this form of peer to peer trading has much lower operational costs as trading fees are either very low or absent;
- atomic swaps make it possible for trades to happen very quickly, with higher degrees of interoperability;

### Disadvantages of conventional exchanges

- _Greater vulnerability_ - keeping many valuable resources in one location makes them more vulnerable to hacking;
- _Funds mismanagement and human error_ - centralized exchanges are run by people (mistakes and poor choices regarding exchange operation);
- _Higher operational costs_ - centralized exchanges have higher withdrawal and trading fees;
- _Inefficiency in regards to volume demands_ - when the market activity gets too intense, centralized exchanges often fail to deal with the increased trading demand;
- _Regulation_ - in most countries, cryptocurrency regulation is far from ideal;

## Limitations

- to perform an atomic swap, the two cryptocurrencies need to be based on blockchains that share the same hashing algorithm;
- on-chain swaps and transactions can be quickly tracked on a blockchain explorer;
- a short-term answer to this problem is to use privacy-focused cryptocurrencies as a way to reduce exposure;