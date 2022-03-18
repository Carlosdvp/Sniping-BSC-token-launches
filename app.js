// import dependencies
const ethers = require('ethers')
const prompt = require('prompt-sync')({ sigint: true })

// WBNB: Token address
// Router: PancakeSwap router contract
// Target: your wallet address
const addresses = {
	wBNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
	router = '0x10ed43c718714eb63d5aa57b78b54704e256024e',
	target = process.env.address
}

// Here you set your setting for the swap
const BNBamount = ethers.utils.parseEther('0.1').toHexString();
let gasPrice = ethers.utils.parseUnits('10', 'gwei')
let gas = {
	gasPrice: gasPrice,
	gasLimit: 300000
}

// Wallet and WS node information
const mnemonic = process.env.mnemonic