const ETHEREUM = {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    rpcUrls: ["https://rpc.ankr.com/eth"],
    nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
    },
    blockExplorerUrls: ["https://etherscan.io/"],
}

const RINKEBY = {
    chainId: "0x4",
    chainName: "Rinkeby Test Network",
    rpcUrls: ["https://eth-rinkeby.alchemyapi.io/v2/7EtsXLjdrJS4D9BPa_7bm5dxVQYVWgv3"],
    nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
    },
    blockExplorerUrls: ["https://rinkeby.etherscan.io/"],
}

export { ETHEREUM, RINKEBY };