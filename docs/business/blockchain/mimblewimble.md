# Mimblewimble

Mimblewimble (MW) is a blockchain design that employs a novel way of structuring and storing transactions. It’s a different implementation of a **Proof of Work (PoW)** 
blockchain that allows for increased privacy and better network scalability.

## Principle of operation

- It allows for a blockchain to have a more compact history;
- In a MW blockchain, there are no identifiable or reusable addresses, meaning that all transactions look like random data to an outsider;
- The transaction data is only visible to their respective participants;
- There is no way to link individual inputs with their respective outputs;
- To move the coins on a Mimblewimble blockchain, the sender and receiver must exchange verifying information;
- Employs a feature called cut-through, which reduces the block data by removing redundant transaction information;

## Mimblewimble vs. Bitcoin

- The **Bitcoin** blockchain has maintained the data of every transaction since the genesis block;
- **Mimblewimble** blockchain only keeps the essential information - while also providing more privacy;
- **Mimblewimble** removes the Bitcoin scripting system - list of instructions that defines how transactions are structured (blockchains becomes more private and scalable);

## Advantages

### Blockchain size

- Mimblewimble allows for data compression, reducing the overall blockchain size;
- reduced costs to join the network and run a node may;

### Scalability

Mimblewimble may be used as a sidechain solution that could be attached to Bitcoin or another parent chain.

### Privacy

- high level of user privacy;
- obfuscation of the transaction details;
- coins can be considered fungible;

## Limitations

### Transaction throughput

Confidential Transactions tend to reduce transaction throughput significantly due to the larger data size.

### Not quantum-resistant

Mimblewimble protocol is not resistant to quantum computers as it relies on relatively simple properties of digital signatures.