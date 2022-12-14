// Contents of this file
// 1. Contract Addresses
// 2. Contract Abis
// 3. Contract Data helper functions


//address exports and IDs
export const ethID = 5;
export const binanceID = 97;
export const fantomID = 4002;

export const fantomProxyAddress = '0x4a2369CcAd099f64802fb3e07b1107efa0F65Dca';
export const fantomSenderAddress = '0x0397B1329267f80fbC28Fe7d902D74170d3E93D8';
export const fantomRecieverAddress = '0x0966d9b13A69438F13106F37d2784428349577d3';
export const fantomRPC = "https://rpc.testnet.fantom.network/";
export const fantomNFTAddress = '0x4659ed40Fd2025eB1357A0B96ff0D7088F42B570';

export const binanceProxyAddress = '0x8187E7e848d95565BdC67F4ACd2A17B14692a616';
export const binanceSenderAddress = '0x4a6c406995E6256065f481961F035B97942aCd5A';
export const binanceRecieverAddress = '0x7FEB0e620fb77A1748A46709eDa61C1DB83DAAf2';
export const binanceRPC = "https://data-seed-prebsc-1-s3.binance.org:8545";
export const binanceNFTAddress = '0xd59c3D341411d20CC716dDfC7A7c5282795D79C2';

export const ethProxyAddress = '0x018caC4Fc42E620042a3394f7976511DF03e6A04';
export const ethSenderAddress = '0x6CAf2E5aB3878473bbfb6A72D1a621B7E5a1F4E8';
export const ethRecieverAddress = '0x275888cE5c24C33D61382063486b9bEe60A5D104';
export const ethRPC = "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

//ABI exports
//List: senderContractABI, recieverContractABI, proxyContractABI

export const NFTContractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "reciever",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenURI",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "metaData",
				"type": "string"
			}
		],
		"name": "mint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenID",
				"type": "uint256"
			}
		],
		"name": "getMetaData",
		"outputs": [
			{
				"internalType": "string",
				"name": "data",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "listAll",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "metaData",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "proxyContract",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tokenIDs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "URItoMetaData",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export const senderContractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "msg",
				"type": "string"
			}
		],
		"name": "NewMsg",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "recieve",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_msg",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_chainId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_reciever_address",
				"type": "address"
			}
		],
		"name": "sendMsg",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	}
]

export const recieverContractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "msg",
				"type": "string"
			}
		],
		"name": "NewMsg",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_data",
				"type": "string"
			}
		],
		"name": "executeCall",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]

export const proxyContractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_data",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_toChainID",
				"type": "uint256"
			}
		],
		"name": "ProxyCall",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "functionCalled",
				"type": "string"
			}
		],
		"name": "ProxyLog",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_publicKey",
				"type": "address"
			}
		],
		"name": "addPublicKey",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_data",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_toChainID",
				"type": "uint256"
			}
		],
		"name": "proxyCall",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

// helper functions

// fantom helper functions
// getfantomProxy,getfantomSender,getfantomReceiver

export function getFantomProxy(){
	return [fantomProxyAddress, proxyContractABI];
}

export function getFantomSender(){
	return [fantomSenderAddress, senderContractABI];
}

export function getFantomReciever(){
	return [fantomRecieverAddress, recieverContractABI];
}
export function getFantomNFT(){
	return [fantomNFTAddress, NFTContractABI];
}

// binance helper functions
// getbinanceProxy, getbinanceSender,getbinanceReceiver

export function getBinanceProxy(){
	return [binanceProxyAddress, proxyContractABI];
}

export function getBinanceSender(){
	return [binanceSenderAddress, senderContractABI];
}

export function getBinanceReciever(){
	return [binanceRecieverAddress, recieverContractABI];
}
export function getBinanceNFT(){
	return [binanceNFTAddress, NFTContractABI];
}
//Eth helper functions
// getEthProxy, getEthSender,getEthReceiver

export function getEthProxy(){
	return [ethProxyAddress, proxyContractABI];
}

export function getEthSender(){
	return [ethSenderAddress, senderContractABI];
}

export function getEthReciever(){
	return [ethRecieverAddress, recieverContractABI];
}

// all getContract functions return the format of [address,abi]
// gets the proxy contract address and ABI based on the chain ID passed in
export function getProxyContract(chainID){
    switch (chainID) {
        case fantomID:
            return getFantomProxy();
        case binanceID:
            return getBinanceProxy();
        case ethID:
            return getEthProxy();
        default:
            console.log("Invalid Chain ID");
            break;
    }
}

// gets the sender contract address and ABI based on the chain ID passed in
export function getSenderContract(chainID){
    switch (chainID) {
        case fantomID:
            return getFantomSender();
        case binanceID:
            return getBinanceSender();
        case ethID:
            return getEthSender();
        default:
            console.log("Invalid Chain ID");
            break;;
    }
    
}

//gets the reciever contract address and ABI based on the chain ID passed in
export function getRecieverContract(chainID){
    switch (chainID) {
        case fantomID:
            return getFantomReciever();
        case binanceID:
            return getBinanceReciever();
        case ethID:
            return getEthReciever();
        default:
            console.log("Invalid Chain ID");
            break;
    }
}

export function getNFTContract(chainID){
	switch (chainID) {
		case fantomID:
			return getFantomNFT();
		case binanceID:
			return getBinanceNFT();
		default:
			console.log("Invalid Chain ID");
			break;
	}
}

