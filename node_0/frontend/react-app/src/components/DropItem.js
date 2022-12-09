import { Container,Image, Stack } from "react-bootstrap";

import eth_image from "../assets/eth_image.png"
import fantom_image from "../assets/fantom_image.png";
import polygon_image from "../assets/polygon_image.png";
import binance_image from "../assets/Binance_Logo.png";
import {ethID, fantomID,binanceID} from "../contractApi/chainIDs";

import "../scss/custom.scss"

function DropItem(props){

    var name;
    var picture;
    
    function getImage(){
        if(props.image === ethID){
            name = "Ethereum";
           return eth_image;
        }else if(props.image === fantomID){
            name = "Fantom";
           return fantom_image;
        }else if(props.image === binanceID){
            name = "Binance";
           return binance_image;
        }else{
            name = "Polygon"
            return polygon_image;
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