/*const Web3 = require("web3");

const web3 = new Web3('https://cloudflare-eth.com'); // https://cloudflare-eth.com https://eth-mainnet.alchemyapi.io/v2/euSwyu6Yf-VQ3NJ32KHxDhHmTta7OvIe

async function getBlockNumber() {
    const latestBlockNumber = await web3.eth.getBlockNumber()
    console.log(latestBlockNumber)
    return latestBlockNumber
}

getBlockNumber()*/

/*const Web3 = require("web3");
const url = "https://eth-mainnet.alchemyapi.io/v2/UxEb3DO9K7W69h-iH2jLIrRmOetvHNIt";

const web3 = new Web3(url);

async function getBlockNumber() {
    const latestBlockNumber = await web3.eth.getBlockNumber()

    const c  = await web3.eth.getGasPrice();
    console.log(c);

    return latestBlockNumber
}

getBlockNumber()*/

const { Yearn, SubgraphService  } = require('@yfi/sdk');
const { JsonRpcProvider } = require('@ethersproject/providers');

// Ethereum mainnet
const chainId = 1;

// It is recommended to use Alchemy for your Web3 provider when using the Yearn SDK.
const rpcUrl = "https://eth-mainnet.alchemyapi.io/v2/UxEb3DO9K7W69h-iH2jLIrRmOetvHNIt";

const yearn = new Yearn(chainId, {
    provider: new JsonRpcProvider(rpcUrl)
});

const c = new SubgraphService(chainId, yearn.context)
console.log(c);
//console.log(c.fetchQuery(ASSET_HISTORIC_EARNINGS));
