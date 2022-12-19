import { Dropdown, Container, Button, Stack,Form,Image} from "react-bootstrap";
import "../scss/custom.scss";

import DropItem from "./DropItem";
import {ethers,BigNumber, Contract} from "ethers";
import { BaseContract } from "essential-eth";

import * as contractContact from "../contractApi/chainIDs";
import {useState, useEffect, useCallback, useRef} from 'react';
import { callSender, callReciever } from "../contractApi/executionCall";
import * as once from "async-once";
import transfer_gif from '../assets/logo_blockchainConnection_Seq_64.gif';
//import {setParentReceiver, setParentSender} from "../App";

//TODO: Use ethers fallback provider to set fallback rpc links

//test soldier data
var testSoldier = {
    "FirstName": "John",
    "LastName": "Doe",
    "TokenID": "0x3564352556725436",
    "Rank" : "Lance Corporal",
    "Skills": "Marksman, Combat Medic",
  } 
  testSoldier = JSON.stringify(testSoldier);
  
// possibly use props for solution
 export function Transfer(props) {

  const [reciever,setCurrentReciever] = useState(0);
  const [sender,setCurrentSender] = useState(0); 
  const childRef = useRef();

  function setSender(sender){
    props.setParentSender(sender);
    setCurrentSender(sender);
  };

  function setReciever(reciever){
    props.setParentReceiver(reciever);
    setCurrentReciever(reciever);
  };


  //set up listners for proxy contracts
  getproxyData();
  
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

  async function clickHandler(){

    //get the soldier data from the contract
    var [NFTContractAddress, NFTContractABI] = contractContact.getNFTContract(sender);
    //var NFTRPC = getRPC(sender);
    var NFTContract = new BaseContract(NFTContractAddress, NFTContractABI, contractContact.getProvider(sender));

    //call again to change the pulled NFT
    NFTContract.getMetaData(Math.floor(Math.random()*10)+1).then(function(result){
      console.log(result);
      testSoldier = result;
    }); 
    
    // sett up listeners for the sender and the reciever

    var [senderContractAddress, senderContractABI] = contractContact.getSenderContract(sender);
    var [recieverContractAddress, recieverContractABI] = contractContact.getRecieverContract(reciever);
    var senderRPC = contractContact.getProvider(sender);
    var recieverRPC = contractContact.getProvider(reciever);

    var senderContract = new BaseContract(senderContractAddress,senderContractABI,senderRPC);
    var recieverContract = new BaseContract(recieverContractAddress,recieverContractABI,recieverRPC);
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
      recieverContract.removeAllListeners();
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

      case contractContact.polygonID:
        return contractContact.polygonRPC;

      case contractContact.avalancheID:
        return contractContact.avalancheRPC;

      default:
        console.log("Invalid Chain ID");
        break;
  }
  }

  async function getproxyData(){
    console.log("proxy listners started");

    // fetch the proxy contract

    // fantom proxy setup
    var [proxyAddress,proxyAbi] = contractContact.getProxyContract(contractContact.fantomID);
    console.log("listening too proxy address: " + proxyAddress)
    var proxyContractFantom = new BaseContract(proxyAddress,proxyAbi,contractContact.getProvider(contractContact.fantomID));

    //listen for proxyCall sent from proxy

    proxyContractFantom.on("ProxyCall", (to, data, chain) => {
        console.log("Sent Message: " + to + " "+ data + " "+ chain);
        chain = contractContact.fantomID;
        callReciever(chain,data);
        
    });

    // binance proxy setup
    [proxyAddress,proxyAbi] = contractContact.getProxyContract(contractContact.binanceID);
    console.log("listening too proxy address: " + proxyAddress)
    var proxyContractBinance = new BaseContract(proxyAddress,proxyAbi,contractContact.getProvider(contractContact.binanceID));

    //listen for proxyCall sent from proxy

    proxyContractBinance.on("ProxyCall", (to, data, chain) => {
        console.log("Sent Message: " + to + " "+ data + " "+ chain);
        chain = contractContact.binanceID;
        callReciever(chain,data);
        
    });


    // eth proxy setup
    [proxyAddress,proxyAbi] = contractContact.getProxyContract(contractContact.ethID);
    console.log("listening too proxy address: " + proxyAddress)
    var proxyContractEth = new BaseContract(proxyAddress,proxyAbi,contractContact.getProvider(contractContact.ethID));

    //listen for proxyCall sent from proxy

    proxyContractEth.on("ProxyCall", (to, data, chain) => {
        console.log("Sent Message: " + to + " "+ data + " "+ chain);
        chain = contractContact.ethID;
        callReciever(chain,data);
        
    });   

    // polygon proxy setup
    [proxyAddress,proxyAbi] = contractContact.getProxyContract(contractContact.polygonID);
    console.log("listening too proxy address: " + proxyAddress);
    console.log(contractContact.getProvider(contractContact.polygonID));
    var proxyContractPolygon = new BaseContract(proxyAddress,proxyAbi,contractContact.getProvider(contractContact.polygonID));

    //listen for proxyCall sent from proxy

    proxyContractPolygon.on("ProxyCall", (to, data, chain) => {
        console.log("Sent Message: " + to + " "+ data + " "+ chain);
        chain = contractContact.polygonID;
        callReciever(chain,data);   
    });

    // avalanche proxy setup
    [proxyAddress,proxyAbi] = contractContact.getProxyContract(contractContact.avalancheID);
    console.log("listening too proxy address: " + proxyAddress);
    var proxyContractAvalanche = new BaseContract(proxyAddress,proxyAbi,contractContact.getProvider(contractContact.avalancheID));

    //listen for proxyCall sent from proxy

    proxyContractAvalanche.on("ProxyCall", (to, data, chain) => {
        console.log("Sent Message: " + to + " "+ data + " "+ chain);
        chain = contractContact.avalancheID;
        callReciever(chain,data);   
    });
    
};
  
  return (
    <Container
      fluid
      className="border container-fluid d-flex justify-content-center m-3 p-5 ">
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
                  <Dropdown.Item onClick={e => setSender(contractContact.polygonID)}>Polygon</Dropdown.Item>
                  <Dropdown.Item onClick={e => setSender(contractContact.fantomID)}>Fantom</Dropdown.Item> 
                  <Dropdown.Item onClick={e => setSender(contractContact.binanceID)}>Binance</Dropdown.Item>
                  <Dropdown.Item onClick={e => setSender(contractContact.avalancheID)}>Avalanche</Dropdown.Item>
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
          <Image src={transfer_gif}  style={{position:'absolute', top: "370px"}}/>

          
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
                  <Dropdown.Item onClick={e => setReciever(contractContact.polygonID)}>Polygon</Dropdown.Item>
                  <Dropdown.Item onClick={e => setReciever(contractContact.fantomID)}>Fantom</Dropdown.Item> 
                  <Dropdown.Item onClick={e => setReciever(contractContact.binanceID)}>Binance</Dropdown.Item>
                  <Dropdown.Item onClick={e => setReciever(contractContact.avalancheID)}>Avalanche</Dropdown.Item>
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