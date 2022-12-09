// based on the chainID, this component will be used to display the NFTs from that blockchain
// you can either display all NFTs, display a random NFT with index 1-10, or display a specific NFT by ID

import { Container,Image, Stack, Form } from "react-bootstrap";
import {ethers} from "ethers"; 
import {ethID, fantomID,binanceID,polygonID,avalancheID} from "../contractApi/chainIDs";
import * as contractData from "../contractApi/chainIDs";
import eth_image from "../assets/eth_image.png"
import fantom_image from "../assets/fantom_image.png";
import polygon_image from "../assets/polygon_image.png";
import binance_image from "../assets/Binance_Logo.png";
import avalanche_image from "../assets/avalanche_image.png";
import error from "../assets/error.png";

export function NftDisplay(props){
    // the props idntifier will contain the chainID

    // get the blockchain logo based on chainID
    var blockchainLogo = getImage(props);
    function getImage(props){
        switch(props.identifier){
            case contractData.ethID:
                return eth_image;
            case contractData.fantomID:
                return fantom_image;
            case contractData.binanceID:
                return binance_image;
            case contractData.polygonID:
                return polygon_image;
            case contractData.avalancheID:
                return avalanche_image;
            default:
                return error;
        }
    }
    // get the NFT address based on chainID
    var [NFTAddress,NFTContractABI] = getNftAddress(props);
    function getNftAddress(props){
        switch (props.identifier){
            case contractData.ethID:
                return contractData.getNFTContract(contractData.ethID);
            case contractData.fantomID:
                return contractData.getNFTContract(contractData.fantomID);
            case contractData.binanceID:
                return contractData.getNFTContract(contractData.binanceID);
            case contractData.polygonID:
                return contractData.getNFTContract(contractData.polygonID);
            case contractData.avalancheID:
                return contractData.getNFTContract(contractData.avalancheID);
            default:
                return contractData.getNFTContract(contractData.binanceID);
        }
    }
    // set up contract instance using ethers
    var provider = new ethers.providers.JsonRpcProvider(contractData.getRPC(props.identifier));
    var contract = new ethers.Contract(NFTAddress,NFTContractABI,provider);

    // function that takes in the NFT ID and returns the NFT URI
    async function getNFTURI(NFTID){
        var NFTURI = await contract.tokenURI(NFTID);
        return NFTURI;
    };

    //function that returns a random NFT ID from index 1-10
    async function getRandomNFTID(){
        var NFTID = Math.floor(Math.random() * 10) + 1;
        return NFTID;
    };

    return (
        // simple hello world text
        <Container>
                <Container className="h5">
                <Image src={blockchainLogo} roundedCircle width={60}/>
                   <Container></Container>
                </Container>            
        </Container>
    )
}
export default NftDisplay;
