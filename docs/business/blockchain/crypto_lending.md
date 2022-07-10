# Crypto Lending

- crypto lending works by taking crypto from one user and providing it to another for a fee;
- lets users borrow and lend cryptocurrencies for a fee or interest (процент);
- this could be through a DeFi lending **DApp** or a **cryptocurrency exchange**;
- when users collateral(залог) falls below a certain value, user need to top it up to the required level to avoid liquidation;
- it's an easy way to earn APY on crypto assets they HODL or access cheap credit;
- if the user uses a volatile coin as collateral(залог), his deal can be liquidated overnight;
- user can also quickly gain access to borrowed digital assets at low-interest rates;

## Key points

- crypto lending works by taking crypto from one user and providing it to another for a fee;
- the exact method of managing the loan changes from platform to platform;
- user can find crypto lending services on both centralized and decentralized platforms, but the core principles remain the same;
- user can passively earn an income and gain interest by **locking** up your **crypto** in a pool that manages your funds;
- there is usually little risk of losing your funds because the borrower(заемщик) put up collateral, or a CeFi (centralized finance) platform like Binance manages the loan;

## Principle of operation

- crypto lending typically involves three parties: the lender, the borrower, and a DeFi (Decentralized Finance) platform or crypto exchange;
- in most cases, the loan taker must put up some collateral(залог) before borrowing any crypto;
- on the other side of the loan, you may have a smart contract that mints stablecoins or a platform lending out funds from another user;
- lenders add their crypto to a pool that then manages the whole process and forwards them a cut of the interest;

## Types of crypto loan

### Flash loans

- their name is due to the loan being given and repaid within a single block;
- user can also get collateral-free loans known as flash loans, which user must pay back within the same transaction;
- if the loan amount cannot be returned plus interest, the transaction is canceled before it can be validated in a block;
- this essentially means that the loan never happened, as it was never confirmed and added to the chain;
- a smart contract controls the whole process, so no human interaction is needed;
- with smart contract logic, user can create a top-level transaction containing sub-transactions;
- if any sub-transactions fail, the top-level transaction will not go through;

**Example:**

- a token trading for _$1.00 (USD)_ in liquidity pool A and _$1.10_ in liquidity pool B;
- however, user have no funds to purchase tokens from the first pool to sell in the second;
- user could try to use a flash loan to complete this arbitrage opportunity within one block;
- our primary transaction will take out a _1,000 BUSD_ flash loan from a DeFi platform and repay it;

**Explanation:**

- the borrowed funds are transferred to users wallet;
- user purchase _$1,000_ of crypto from liquidity pool A _(1,000 tokens)_;
- user sell the _1,000_ tokens for _$1.10_, giving user _$1,100_;
- user transfer the loan plus borrowing fee into the flash loan smart contract;

#### Notes

- if any of these sub-transactions cannot execute, the lender will cancel the loan before it takes place;
- using this method, user can make profits with flash loans without any risk to him or collateral;
- classic opportunities for flash loans include **collateral swaps** and **price arbitrage**;
- however, user can only use flash loan on-chain, as moving funds to a different chain would break the **one transaction** rule;

### Collateralized loans

A collateralized loan gives a borrower more time to use their funds in return for providing collateral.

**Example:**

- a 50% LTV loan of _$10,000 BUSD_ will require the user to deposit _$20,000 (USD)_ of _ether (ETH)_ as collateral;
- if the value drops below _$20,000_, user needs to add more funds;
- if it falls below _$12,000_, the user will be **liquidated**, and the lender will receive their funds back;

**Explanation:**

- when the user takes out a loan, he mostly receives newly minted stablecoins (such as DAI) or crypto someone has lent;
- lenders will deposit their assets in a smart contract that may also **lock up** their funds for a **specific time**;
- once the user have the funds, he is free to do with them as he wish;
- however, he will still need to top up his collateral with its price change to ensure it's not liquidated;
- if his **LTV** ratio becomes too high, he might also have to pay fines;
- a smart contract will manage the process, making it transparent and efficient;
- at the repayment of the users loan plus any interest he owe, he regain his collateral;

## Advantages and disadvantages of crypto loans

### Advantages

- easily accessible capital - crypto loans are given to anyone who can provide collateral or return the funds in a flash loan;
- **smart contracts** manage loans - a smart contract automates the whole process, making lending and borrowing more efficient and scalable;
- simple to earn passive income with little work - **HODLers** can drop their crypto in a vault and begin earning **APY** without having to manage the loan themselves;

### Disadvantages

- high risk of liquidation depends on users collateral - even with highly over-collateralized loans, crypto prices can drop suddenly and lead to liquidation;
- smart contracts can be vulnerable to attack - иadly written code and back-door exploits can lead to the loss of the users loaned funds or collateral;
- borrowing and lending can increase the risk of the user **portfolio**;

## Notes before taking a loan

- before borrowing or lending, understand that you will lose custody of your coins, this removes them from your control and reduces your **liquidity**;
- think about market conditions before lending your crypto - your coins may be locked up for a certain period, making it impossible to react to crypto market downturns;
- read the loan terms and conditions - you should look for better interest rates and favorable terms and conditions;
- take note of all the terms and conditions of the loan to understand when you can access your funds and any fees involved;
