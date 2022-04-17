# DApps

A type of application that runs on a decentralized network, avoiding a single point of failure.

## Overall

- DApps are any computer applications whose operation is maintained by a **distributed network** of computer-nodes, as opposed to a **single server**;
- The concept of a decentralized application was enabled by blockchain platforms that support smart contracts;
- DApps can provide the same quality of service that regular apps are capable of, while at the same time enjoying full advantages of decentralization;
- DApps supports almost constant uptime and resistance to censorship and corruption;
- Dapps are typically architected with a **backend** using a smart contract running on a blockchain and a thin **frontend UI**;
- It’s similar to a client/server architecture, where the server is the smart contract;
- To interact with a smart contract, user needs an Ethereum wallet;

## Platforms

- Ethereum(ETH);
- Neo (NEO);
- NEM (XEM);

## Challenges in Developing Dapps

- code should not contain critical flaws (it is basically needs to be perfect and fully tested);
- it is not easy to update contracts;
- most smart contract platforms, including Ethereum, do not permit redeploying to the same address; 
- in addition, upgrading usually entails difficult data migration of the state that the smart contract manages;
- dapp should by professional security auditors (Quantstamp, OpenZeppelin), who then publish their reports to the public;
- dapp should also be audited by people on GitHub;
- deploying new smart contract code could cause a break in the user experience;
- the speed of dapps relies on the speed of the blockchain and its confirmation times;
- dapp developers need to spend **ether** in the form of gas to deploy and change the state of a contract; 
- all **Ethereum** testnets have faucets where you can get testnet ETH (tETH) for free; 
- these testnets make for an ideal staging environment for smart contracts;

## Smart contract deployment

- publishing is done by sending a smart contract transaction to the Ethereum network; 
- the easiest way to generate this transaction is by using the Ethereum Remix tool;
- after the transaction is authorized, MetaMask pushes a smart contract creation transaction to the network; 
- when a smart contract is created, it is given an Ethereum address; 
- this **Ethereum** address can hold an ETH balance and send/receive ETH just like a normal Ethereum address can;

## Interacting with a smart contract

- to read data from the contract you just ping the network directly, like making a call to a public API; 
- however, to write data to the contract, user must send a transaction to the contract address;
- all read/write interactions with a smart contract require a reference to the contract’s application binary interface (ABI); 
- the ABI is like an API for a smart contract; 
- ABIs are machine-readable, meaning they are easy to parse by client software to understand how to interact with the contract code; 
- an ABI documents all the functions and their attributes;

## Examples

- Augur (REP) prediction market platform;
- The Golem (GNT) market for **idle computer power** and the **Basic Attention Token (BAT)** blockchain-based digital advertising platform;
