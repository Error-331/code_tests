# Consensus

_Consensus is achieved when all participants of the network agree on the order and content of the blocks in the blockchain._

- decentralized systems are composed of a multitude of distributed, independent actors with the same/similar levels of authority over the rest of the network, 
decisions are made collectively;

- Blockchain, is updated by individual miners with no central authority to provide oversight and ensure the correctness of entries;

- achieving this consensus among numerous nodes trying to cooperate remotely is a non-trivial task;

- number of nodes malfunctioning or deliberately acting against the network’s interests - **Byzantine Generals’ Problem**;

## Types

### Proof-of-Work (PoW)

- this consensus mechanism is crucial to avoiding double spending - ensuring that a coin or token isn't used more than once to facilitate a transaction;
- it is the key process behind adding new blocks to Bitcoin’s blockchain and verifying transactions;
- the network approves a block each time a cryptocurrency miner successfully completes **PoW** behind the block;
- miners are rewarded with **BTC** if they successfully solve the **PoW**;
- in the case of BTC, cryptocurrency miners are tasked with the objective of creating a **hash** matching Bitcoin’s current target;
- this consists of a hash which is frontloaded with **multiple zeros**; 
- the probability of achieving a hash that has several zeros at the front is rather low;
- the person who achieves the goal first earns BTC.
- the reason why PoW makes it so difficult to tamper with any part of the blockchain has to do with the fact that any alteration would require all blocks to be edited;

### Proof-of-Stake (PoS)

- PoS is another consensus mechanism, the method by which blockchain confirms transactions and prevents the problem of double counting;
- double counting occurs when the same coin or token is used for more than one transaction;
- while Proof-of-Work is used for Bitcoin transactions, PoS was created to work as a powerful alternative;
- many researchers believe PoS is significantly more energy efficient compared to PoW and more secure, although some critics question the integrity of these claims;
- but double counting under cryptocurrencies, which rely on decentralized systems, would be very hard to prevent if it were not for PoW or PoS;
- Proof-of-Stake involves miners validating additional blocks if they have greater amounts of money locked up in the system;
- sometimes energy costs are so high under PoW that miners need to sell coins in order to pay their energy bills;
- PoS’ structure means the mechanism can be less vulnerable to cyberattacks as its structure acts as a disincentive for a miner to attack the system due to the structural way the system
  ranks compensation;

**Example:**

- a miner who owns 10% of coins of Bitcoin will only be able to mine 10% of the blocks;

## Hash

- a hash is the output result of a hashing algorithm, which creates a **unique**, **fixed-length string** to encrypt and secure a certain selection of arbitrary data;
- data of arbitrary sizes can be easily encrypted and transformed into a **fixed length**, single hash string through **hashing**;
- hashing data is one of the most secure data transfer practices because none of the original information can be accessed without a **hash key**;
- in blockchain technology, hashing is used to enhance the processing of transactions;
- while data about transactions can be of various lengths, all transactions are transformed into a fixed-length value through hashing;
- this value is then recorded in the blockchain and can be called back at any point in time;
- because of hashing, transaction processing on the blockchain is faster and more secure;

**Example:**

- all Bitcoin transactions are processed through the **Secure Hashing Algorithm 256**, which shortens the hash length to a fixed 256 bits, or 32 bytes;
- regardless of the size of the transaction, its has is always going to have a set length of 256 bits;

### Cryptographic Hash Function

Cryptographic hash functions produce a fixed-size hash value from a variable-size transaction input.

The fact that hashes are pseudorandom and it is impossible to predict an output of any input before actually running it through the hash function ensures that miners cannot print 
new Bitcoins out of thin air and need to prove the work they have performed.

- Hash Function is a key component in the mining of proof-of-work cryptocurrencies, such as Bitcoin (BTC);
- Bitcoin (BTC) uses the **SHA-256** hash function;
- Bitcoin, miners first need to produce a hash value that is below a certain threshold, called the target;

Hash function needs to possess several characteristics:

1. It should be easy to compute an output for any given input, but nearly impossible to reverse the process and calculate the input of a known output;
2. Determinism - feeding a specific input into the algorithm should always produce the same output;
3. Collision resistance - two different inputs should be very unlikely to produce the same output;
4. Avalanche effect - changing even a single bit of data in the input should result in a wildly different output;
