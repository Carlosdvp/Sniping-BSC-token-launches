// import dependencies
const ethers = require('ethers')
const prompt = require('prompt-sync')({ sigint: true })

// API info
const apiKey = process.env.API_KEY

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
const provider = new ethers.providers.WebSocketProvider(`wss://bsc.getblock.io/testnet/?api_key=${apiKey}`)
const wallet = ethers.Wallet.fromMnemonic(mnemonic)
const account = wallet.connect(provider)

//
// Connect to the Router Contract
const router = new ethers.Contract(addresses.router, 
	[    
		'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'
	],
	account)

//
// Sniper Function
const sniper = async (token) => {
	let tx = await router.swapExactETHForTokens(
		0, 														// 0 here means Market price, edit for specific slippage
		[addresses.wBNB, token],
		addresses.target,
		Math.floor(Date.now() / 1000) + 60 * 10,  // 10 minutes from now
		{
			...gas, 
			value: BNBamount
		})
	console.log('Swapping BNB for tokens ...')

	const receipt = await tx.wait()

	console.log(`Transaction hash: ${receipt.transactionHash}`)
}


//
// Our Simple UI - prompt for the token address we wish to snipe
let token = prompt('Input Token Address:')

//
// Activate the Sniper
(async () => {
	await sniper(token)
})();