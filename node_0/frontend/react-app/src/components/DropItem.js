import { Container,Image, Stack } from "react-bootstrap";

import eth_image from "../assets/eth_image.png"
import fantom_image from "../assets/fantom_image.png";
import polygon_image from "../assets/polygon_image.png";
import binance_image from "../assets/Binance_Logo.png";
import avalanche_image from "../assets/avalanche_image.png";
import error from "../assets/error.png";
import {ethID, fantomID,binanceID,polygonID,avalancheID} from "../contractApi/chainIDs";

import "../scss/custom.scss"

function DropItem(props){

    var name;
    var picture;
    
    function getImage(){
        switch(props.image){
            case ethID:
                name = "Ethereum";
                return eth_image;
            case fantomID:
                name = "Fantom";
                return fantom_image;
            case binanceID:
                name = "Binance";
                return binance_image;
            case polygonID:
                name = "Polygon";
                return polygon_image;
            case avalancheID:
                name = "Avalanche";
                return avalanche_image;
            default:
                name = "Invalid Chain ID";
                return error;
        }
    }

    picture = getImage();

    return (
        <Container>
            <Stack direction="horizontal" gap={3}>
                <Container className="h5">
                    {name}
                </Container>
                
                <Image src={picture} roundedCircle width={60}/>
            </Stack>

            
        </Container>
    );
}

export default DropItem;