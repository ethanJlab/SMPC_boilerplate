pragma solidity ^0.8.10;

// TODO add security and admin privilages, add stroage array for public keys
// will be deployed on fantom/binance for testing

import "./Ownable.sol";


contract SMPC_proxy is Ownable {

    address[] private publicKeys;

    // The SMPC listens to this event for the request to execute a transaction
    event ProxyCall(address _to, string _data, uint256 _toChainID);

    // This is a log event for all tractions involving the proxy
    event ProxyLog(string functionCalled);

    // this function is called by the sender contract to request an action through the SMPC
    function proxyCall(
        address _to,
        string calldata _data,
        uint256 _toChainID
    ) payable external {        
        emit ProxyCall(_to, _data, _toChainID);
        emit ProxyLog("proxyCall");
    }

    function addPublicKey(address _publicKey) external onlyOwner {
        publicKeys.push(_publicKey);
        emit ProxyLog("addPublicKey");
    }

}

