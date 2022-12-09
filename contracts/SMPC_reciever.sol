pragma solidity ^0.8.10;

contract SMPC_reciever {
    event NewMsg(string msg);

    function executeCall(string memory _data) external payable {
        string memory  _msg = _data;
        emit NewMsg(_msg);
    }
    
    fallback() external payable {
        //blank
    }

}