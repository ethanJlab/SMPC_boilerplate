// based on the chainID, this component will be used to display the NFTs from that blockchain
// you can either display all NFTs, display a random NFT with index 1-10, or display a specific NFT by ID

import { useState, onClick} from "react";
import { Container,Image, Stack, Form, Button} from "react-bootstrap";
import {ethers} from "ethers"; 
import {ethID, fantomID,binanceID,polygonID,avalancheID} from "../contractApi/chainIDs";
import * as contractData from "../contractApi/chainIDs";
import eth_image from "../assets/eth_image.png"
import fantom_image from "../assets/fantom_image.png";
import polygon_image from "../assets/polygon_image.png";
import binance_image from "../assets/Binance_Logo.png";
import avalanche_image from "../assets/avalanche_image.png";
import error from "../assets/error.png";
import healthCareGif from "../assets/cerAnim_AdultPediatric.gif";
import militaryGif from "../assets/certAnim_Operator.gif";
import financeGif from "../assets/cerAnim_DefenseFinancial.gif";
import energyGif from "../assets/certAnim_UnitRangerTactics.gif";
import airforceGif from "../assets/cerAnim_Airborne.gif";

export function NftDisplay(props){

    const [NFTID, setNFTID] = useState("");
    const [NFTURI, setNFTURI] = useState("");
    

    // handel the NFT ID input
    function handleNFTID(event){
        setNFTID(event.target.value);

        displaySpecificNFT(NFTID).then((NFTURI) => {
            setNFTURI(NFTURI);
        });
    };

    // function that will read in the NFT ID and return the type of industry that is associated with the blockchain
    var industry = getIndustry(props);
    function getIndustry(props){
        var industry;
        switch (props.identifier){
            case contractData.ethID:
                industry = "Military";
                break;
            case contractData.fantomID:
                industry = "Finance";
                break;
            case contractData.binanceID:
                industry = "Healthcare";
                break;
            case contractData.polygonID:
                industry = "Energy";
                break;
            case contractData.avalancheID:
                industry = "Airforce";
                break;
            default:
                industry = "Invalid Chain ID"; 
                break;  
        }             
        return industry;        
    };
    

    //function that will return the image associated with the Industry
    var industryImage = getIndustryImage(props);
    function getIndustryImage(props){
        var industryImage;
        switch (props.identifier){
            case contractData.ethID:
                industryImage = militaryGif;
                break;
            case contractData.fantomID:
                industryImage = financeGif;
                break;
            case contractData.binanceID:
                industryImage = healthCareGif;
                break;
            case contractData.polygonID:
                industryImage = energyGif;
                break;
            case contractData.avalancheID:
                industryImage = airforceGif;
                break;
            default:
                industryImage = error;
                break;
        }
        return industryImage;
    };
                
    // the props identifier will contain the chainID

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
    };
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
    var provider = contractData.getProvider(props.identifier);
    var contract = new ethers.Contract(NFTAddress,NFTContractABI,provider);

    // function that takes in the NFT ID and returns the NFT URI
    async function getNFTURI(NFTID){
        var NFTURI = await contract.tokenURI(NFTID);
        return NFTURI;
    };

    //function that returns a random NFT ID from index 1-10
    function getRandomNFTID(){
        var NFTID = Math.floor(Math.random() * 10) + 1;
        return NFTID;
    };

    // button that displays a random NFT
    async function displayRandomNFT(){
        var NFTID = getRandomNFTID();
        var NFTURI = await getNFTURI(NFTID);
        return NFTURI;
    };

    // button that displays a specific NFT based on ID
    async function displaySpecificNFT(NFTID){
        var NFTURI = await getNFTURI(NFTID);
        return NFTURI;
    };

/*
    displayRandomNFT().then((result) => {
        console.log(result);
    });
*/
    // function for parsing the NFT URI
    function parseNFTURI(NFTURI){
        //replace all ' in the uri with "
        NFTURI = NFTURI.replace(/'/g, '"');
        NFTURI = NFTURI.replace(/TokenID:/g, '');
        NFTURI = NFTURI.slice(2);
        // if the string starts with 0 slice 1 more character off here
        // used to get rid of extra 0 in the beginning of the string for token 10 ID
        if (NFTURI.charAt(0) == '0'){
            NFTURI = NFTURI.slice(1);
        }
        NFTURI = JSON.stringify(JSON.parse(NFTURI),null,1);
        return NFTURI;
    };


    return (
        // simple hello world text
        <Container>
                <Container className="h5">
                <h1>{industry} <Image style={{width: 50, height: 50}}src={industryImage}/></h1>
                <Image src={blockchainLogo} roundedCircle width={60}/>
                <Button onClick={() => displayRandomNFT().then((NFTURI) => {
                    setNFTURI(parseNFTURI(NFTURI));
                })}>Display Random NFT</Button>
                <Form>
                    <input type="text" value={NFTID} placeholder="NFT ID" onChange={(e) => setNFTID(e.target.value)}/>
                </Form>
                <Button type="button" onClick={() => displaySpecificNFT(NFTID).then((NFTURI) => {
                    setNFTURI(parseNFTURI(NFTURI));
                })}>Display NFT</Button>
                <br/>
                
                <div class="text" >
                    <pre>
                    {NFTURI}
                    </pre>
                </div>
                </Container>         
        </Container>
    )
}
export default NftDisplay;
