# Wrapped Ether (WETH)

Wrapped Ether (WETH) refers to the **ERC-20** compatible version of ether (wrapping ether with other ERC standards is also possible).

- WETH can be created by sending ether to a smart contract where the ether is placed on hold, in turn receiving the WETH **ERC-20** token at a **1:1** ratio;
- this WETH can afterward be sent back into the same smart contract to be "unwrapped" or redeemed back for the original ether at a 1:1 ratio;
- **ether** itself is not ERC-20 compatible and cannot be exchanged directly for other **ERC-20** tokens in a decentralized manner without the mediation of a trusted third party;
- wrapping **ether** allows the direct, seamless exchange between ether and **ERC-20** tokens without the need for a trusted third-party;
- recent developments are trying to have a canonical WETH standard that could be used by all Ethereum-based dApps;