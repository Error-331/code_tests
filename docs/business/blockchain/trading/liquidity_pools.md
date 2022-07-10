# Liquidity Pools

A liquidity pool is basically funds thrown together in a big digital pile. 

- is a collection of funds locked in a smart contract;
- are used to facilitate decentralized trading, lending, and many more functions;
- are the backbone of many decentralized exchanges (DEX);
- in exchange for providing their funds, they earn **trading fees** from the trades that happen in their pool, proportional to their share of the total liquidity;

## Principle of operation

- each interaction with the order book requires **gas fees**, which makes it much more expensive to execute trades;
- it also makes the job of market makers (traders who provide liquidity for trading pairs), extremely costly;
- on a blockchain like Ethereum, an on-chain order book exchange is practically impossible (could be used with layer 2);
- automated market makers (AMM) allows for on-chain trading without the need for an order book;
- **traders can get in and out of positions on token pairs that likely would be highly illiquid on order book exchanges**;
- for the buyer to buy, there doesn’t need to be a seller at that particular moment, only sufficient liquidity in the pool;
- **pricing is also determined by this algorithm based on the trades that happen in the pool**;
- it’s not the same as in the case of the order book model, as you’re interacting with the contract that governs the pool;

## Use case

### Automated market makers (AMM)

- Distributing new tokens in the hands of the right people is a very difficult problem for crypto projects; 
- Liquidity mining has been one of the more successful approaches; 
- Basically, the tokens are distributed algorithmically to users who put their tokens into a liquidity pool;
- Then, the newly minted tokens are distributed proportionally to each user’s share of the pool;
- These can even be tokens from other liquidity pools called pool tokens;
- This is insurance against smart contract risk;
- tranching - involves dividing up financial products based on their risks and returns;
- these products allow LPs to select customized risk and return profiles;

**Example**:

- if user is providing liquidity to **Uniswap** or lending funds to **Compound**, he will get tokens that represent your share in the pool; 
- he may be able to deposit those tokens into another pool and earn a return; 
- these chains can become quite complicated, as protocols integrate other protocols’ pool tokens into their products, and so on;

## Risks

- impermanent loss - it’s a **loss in dollar** value compared to **holding** when you’re providing liquidity to an AMM;
- smart contract risks - while there are technically no middlemen holding your funds, the contract itself can be thought of as the **custodian** of those funds;
- if there is a bug or some kind of exploit through a **flash loan**, for example, users funds could be lost forever;
- where the developers have permission to change the rules governing the pool - enable them to potentially do something malicious, like taking control of the funds in the pool;
