pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


interface CallProxy {
    function proxyCall(
        address _to,
        string calldata _data,
        uint256 _toChainID
    ) payable external;
}

contract SMPC_NFT is ERC721 {
    address public proxyContract;
    mapping(uint=>string) public URItoMetaData;
    uint[] public tokenIDs;



    constructor() ERC721("TRACR NFT", "TRCR") public { }

    

    function mint(address reciever, uint256 _tokenURI,string memory metaData)
    external
    returns (uint256) {
        uint newItemId = _tokenURI;
        _safeMint(reciever, newItemId);
        URItoMetaData[newItemId] = metaData;
        tokenIDs.push(newItemId);

        return newItemId;
    }

    function toString(uint256 value) internal pure returns (string memory) {
        // Inspired by OraclizeAPI's implementation - MIT licence
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function tokenURI(uint tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ER721MetaData; URI query for nonexistant token");
        // metadata for token
        string memory result = string.concat("TokenID: ", toString(tokenId));
        result = string.concat(result, URItoMetaData[tokenId]);
        return result;
    }

    function listAll() public view returns(string[] memory metaData) {
        string[] memory ret = new string[](tokenIDs.length);
        for (uint i = 0; i < tokenIDs.length; i++) {
            ret[i] = URItoMetaData[tokenIDs[i]];
        }
        return ret;
    }

    function getMetaData(uint tokenID) public view returns (string memory data){
        string memory res = URItoMetaData[tokenID];
        return res; 
    }

    function burn(uint256 tokenId) external {
        _burn(tokenId);
    }

    function _burn(uint256 tokenId) internal override {
        return super._burn(tokenId);
    }

}