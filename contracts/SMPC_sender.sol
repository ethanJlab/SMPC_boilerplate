pragma solidity ^0.8.10;

interface CallProxy {
    function proxyCall(
        address _to,
        string calldata _data,
        uint256 _toChainID
    ) payable external;
}

contract SMPC_sender {

    
    address private proxyAddress=0x8E2e407479D5B3E5e79FEc5d44c20e61Ed89C9Ea;

    event NewMsg(string msg);

    function sendMsg(string calldata _msg, uint256 _chainId, address _reciever_address) external payable {
        emit NewMsg(_msg);

        CallProxy(proxyAddress).proxyCall{value: msg.value}(_reciever_address, _msg, _chainId);
    }

    fallback() external payable {
        //blank
    }
    

    function recieve() external payable {
        // can be blank
    }
}

