import { Dropdown, Container, Button, Stack,Form,InputGroup} from "react-bootstrap";
import "../scss/custom.scss";

import DropItem from "./DropItem";
import {ethers,BigNumber, Contract} from "ethers";

import * as contractContact from "../contractApi/chainIDs";
import {useState} from 'react';
import { callSender } from "../contractApi/executionCall";

//test soldier data
var testSoldier = {
    "FirstName": "John",
    "LastName": "Doe",
    "TokenID": "0x3564352556725436",
    "Rank" : "Lance Corporal",
    "Skills": "Marksman, Combat Medic",
  } 

  testSoldier = JSON.stringify(testSoldier);
  

 export function Transfer() {

  const [reciever,setReciever] = useState(0);
  const [sender,setSender] = useState(0); 

  
  //utility function to put messagers in the logs section of the Sender
  function senderLogs(message){
    let sender = document.getElementById("senderLog");

    sender.insertAdjacentHTML("beforeend",message + " <br>");
    
  }

    //utility function to put messagers in the logs section of the Reciever
  function recieverLogs(message){
    let reciever = document.getElementById("recieverLog");
    reciever.insertAdjacentHTML("beforeend",message + "<br>")
  }


  //pull test soldier data from the metadat of the NFTs
  // pick a random number from 1-10 and use that number to pull random soldier metadata from the contract
  
  // get the soldier data from the contract
  var [NFTContractAddress, NFTContractABI] = contractContact.getNFTContract(contractContact.binanceID);
  var NFTRPC = contractContact.binanceRPC;
  var NFTContract = new ethers.Contract(NFTContractAddress, NFTContractABI, new ethers.providers.JsonRpcProvider(NFTRPC));

  //get the soldier data from the contract
  NFTContract.getMetaData(Math.floor(Math.random()*10)+1).then(function(result){
    console.log(result);
    testSoldier = result;
  }); 


   async function clickHandler(){

    //call again to change the pulled NFT
    NFTContract.getMetaData(Math.floor(Math.random()*10)+1).then(function(result){
      console.log(result);
      testSoldier = result;
    }); 
    
    // sett up listeners for the sender and the reciever

    var [senderContractAddress, senderContractABI] = contractContact.getSenderContract(sender);
    var [recieverContractAddress, recieverContractABI] = contractContact.getRecieverContract(reciever);
    var senderRPC = new ethers.providers.JsonRpcProvider(getRPC(sender));
    var recieverRPC = new ethers.providers.JsonRpcProvider(getRPC(reciever));

    var senderContract = new ethers.Contract(senderContractAddress,senderContractABI,senderRPC);
    var recieverContract = new ethers.Contract(recieverContractAddress,recieverContractABI,recieverRPC);
    /*
    // listen for messages form sender 
    senderContract.on("NewMsg", (msg) => {
      senderLogs("New Message Sent: " + msg);
    });
    */
   senderLogs("New Message Sent: " + testSoldier);

    //listen for messages from reciever
    recieverContract.on("NewMsg", (msg) => {
      recieverLogs("New Message Recieved: " + msg);
    });

    var result = await callSender(testSoldier,reciever,recieverContractAddress);
    


  }
  function getRPC(chain) {
    switch (chain) {
      case contractContact.ethID:
        return contractContact.ethRPC;
      case contractContact.fantomID:
        return contractContact.fantomRPC;
      case contractContact.binanceID:
        return contractContact.binanceRPC;
      default:
        console.log("Invalid Chain ID");
        break;
  }
  }
  
  return (
    <Container
      fluid
      className="border container-fluid d-flex justify-content-center m-3 p-5 "
    >
      <Stack direction="horizontal" gap={3}>
        <Container className="p-1">
          <Container>
           
          </Container>
          <Stack className="d-flex justify-content-left m-1" gap={5}>
            <Container className="display-1 d-flex text-nowrap justify-content-center">
              Sender A
            </Container>

            <Container className="d-flex justify-content-center">
              <Dropdown>
                <Dropdown.Toggle variant="secondary">
                 <DropItem image={sender}></DropItem>                
                 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                   <Dropdown.Item onClick={e => setSender(contractContact.ethID)}>Ethereum</Dropdown.Item> 
                   {/* Zero right now since we dont have polygon set up */}
                  <Dropdown.Item onClick={e => setSender(0)}>Polygon</Dropdown.Item>
                  <Dropdown.Item onClick={e => setSender(contractContact.fantomID)}>Fantom</Dropdown.Item> 
                  <Dropdown.Item onClick={e => setSender(contractContact.binanceID)}>Binance</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Container>

            <Container className=" d-flex justify-content-center">
              <Stack>
                <Container className="display-1">
                  Logs
                </Container>
                <Container>
                  <Container className="" id="senderLog" >
                    
                  </Container>
                </Container>
              </Stack>             
              
            </Container>
          </Stack>
        </Container>

        <Container className="d-flex justify-content-center p-5 m-5 ">
          <Button variant="primary" className="d-flex justify-content-center" size="lg" onClick={e => clickHandler()}>
            Transfer
          </Button>

          
        </Container>

        <Container className="p-1">
          <Stack className="d-flex justify-content-left m-1" gap={5}>
            <Container className="display-1 d-flex text-nowrap">
              Reciever B
            </Container>

            <Container className="d-flex justify-content-center">
              <Dropdown>
                <Dropdown.Toggle variant="secondary">
                  
                  <DropItem image={reciever}></DropItem>

                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={e => setReciever(contractContact.ethID)}>Ethereum</Dropdown.Item>
                  {/* look at above set sender for why this is zero */}
                  <Dropdown.Item onClick={e => setReciever(0)}>Polygon</Dropdown.Item>
                  <Dropdown.Item onClick={e => setReciever(contractContact.fantomID)}>Fantom</Dropdown.Item> 
                  <Dropdown.Item onClick={e => setReciever(contractContact.binanceID)}>Binance</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Container>

            <Container className="">
            <Stack>
                <Container className="display-1">
                  Logs
                </Container>


                <Container>
                  <Container className="" id="recieverLog" >
                    
                  </Container>
                </Container>
              </Stack>
            </Container>
          </Stack>
        </Container>
      </Stack>


      
    </Container>
  );
}

export default Transfer;