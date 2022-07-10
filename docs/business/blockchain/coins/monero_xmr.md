# Monero (XMR)

Monero (the Esperanto word for "money") is a cryptocurrency built on the principles of unlinkability (несвязываемость) and untraceability (неотслеживаемость). User should not be able to 
make a connection between two Monero transactions, nor should he be able to determine the source or destination of funds. It is a fork of **Bytecoin**.

## Principle of operation

### Ring signatures and Confidential Transactions

- a ring signature is a **digital signature** created by someone in a specified group;
- given the signature and the group members' public keys, anyone can verify that one of the participants provided the signature;
- this technique is used every time user create a transaction;
- while constructing the transaction, Monero wallet pulls other users' keys from the blockchain to form a ring;
- ring keys effectively act as decoys;
- transaction amounts are obfuscated;

**Example:**

- Bob - member of a government cabinet;
- Bob - has some incriminating evidence about the Prime Minister;
- Bob wants to prove to a journalist that he is indeed a member of the cabinet, but he wants to remain anonymous;
- Bob wouldn't be able to do this with a regular digital signature;
- if the other cabinet members' keys were used in a ring signature scheme, others cannot determine which one sent the message;

### Stealth addresses

- this is done by having the sender generate a one-time address based on a public address used solely for that transaction;
- when someone sends XMR to the address, they send it to a new address on the blockchain;
- each created address will be different from the previous one, and they cannot be linked together;
- **private view key** - allows user to see all of the transactions associated with your address;
- private spend key - like a normal private key, allows user to spend coins;

## Fungibility (взаимозаменяемость)

- XMR from questionable transactions can be exchanged without issue;
- because of strong fungibility, XMR becomes the money of choice for cybercriminals;

## Blocks and mining

- Monero uses Proof-of-Work to add blocks of transactions to the blockchain;
- it's designed to be ASIC-resistant;
- Monero's Proof-of-Work algorithm aims to make the system fairer by favoring CPU mining and weakening GPUs' effectiveness;
- it has a dynamic block size, meaning that blocks can expand to accommodate increased demand;
- Miners can produce blocks that exceed the limit, but they'll be penalized with a reduced reward;

## Hard forks

- frequent hard forks are very much a part of the roadmap;
- this ensures that the software can quickly adapt to changes and roll out security upgrades;
- frequent hard forks increase the **risk** of a vulnerability going unnoticed, and can push non-upgraded users off the network;