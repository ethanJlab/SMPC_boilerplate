import { Dropdown, Container, Button, Stack,Form,InputGroup} from "react-bootstrap";
import "../scss/custom.scss";

import DropItem from "./DropItem";
import {ethers,BigNumber, Contract} from "ethers";

import * as contractContact from "../contractApi/chainIDs";
import {useState, useEffect, useCallback, useRef} from 'react';
import { callSender, callReciever } from "../contractApi/executionCall";
//import {setParentReceiver, setParentSender} from "../App";

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
 export function Transfer() {

  const [reciever,setReciever] = useState(0);
  const [sender,setSender] = useState(0); 
  const childRef = useRef();
/*
  // use passed in function from parent to set the sender
  useEffect(() => {
    setParentSender(sender);
  }, [sender, setParentSender]);

  // use passed in function from parent to set the reciever
  useEffect(() => {
    setParentReceiver(reciever);
  }, [reciever, setParentReceiver]);
*/
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
    var NFTRPC = getRPC(sender);
    var NFTContract = new ethers.Contract(NFTContractAddress, NFTContractABI, new ethers.providers.JsonRpcProvider(NFTRPC));

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
    // currently only works for fantom and only listening to fantom

    // fantom proxy setup
    var [proxyAddress,proxyAbi] = contractContact.getProxyContract(contractContact.fantomID);
    console.log("listening too proxy address: " + proxyAddress)
    var proxyContractFantom = new ethers.Contract(proxyAddress,proxyAbi,new ethers.providers.JsonRpcProvider(contractContact.fantomRPC));

    //listen for proxyCall sent from proxy

    proxyContractFantom.on("ProxyCall", (to, data, chain) => {
        console.log("Sent Message: " + to + " "+ data + " "+ chain);
        chain = contractContact.fantomID;
        callReciever(chain,data);
        
    });

    // binance proxy setup
    [proxyAddress,proxyAbi] = contractContact.getProxyContract(contractContact.binanceID);
    console.log("listening too proxy address: " + proxyAddress)
    var proxyContractBinance = new ethers.Contract(proxyAddress,proxyAbi,new ethers.providers.JsonRpcProvider(contractContact.binanceRPC));

    //listen for proxyCall sent from proxy

    proxyContractBinance.on("ProxyCall", (to, data, chain) => {
        console.log("Sent Message: " + to + " "+ data + " "+ chain);
        chain = contractContact.binanceID;
        callReciever(chain,data);
        
    });


    // eth proxy setup
    [proxyAddress,proxyAbi] = contractContact.getProxyContract(contractContact.ethID);
    console.log("listening too proxy address: " + proxyAddress)
    var proxyContractEth = new ethers.Contract(proxyAddress,proxyAbi,new ethers.providers.JsonRpcProvider(contractContact.ethRPC));

    //listen for proxyCall sent from proxy

    proxyContractEth.on("ProxyCall", (to, data, chain) => {
        console.log("Sent Message: " + to + " "+ data + " "+ chain);
        chain = contractContact.ethID;
        callReciever(chain,data);
        
    });   

    // polygon proxy setup
    [proxyAddress,proxyAbi] = contractContact.getProxyContract(contractContact.polygonID);
    console.log("listening too proxy address: " + proxyAddress);
    var proxyContractPolygon = new ethers.Contract(proxyAddress,proxyAbi,new ethers.providers.JsonRpcProvider(contractContact.polygonRPC));

    //listen for proxyCall sent from proxy

    proxyContractPolygon.on("ProxyCall", (to, data, chain) => {
        console.log("Sent Message: " + to + " "+ data + " "+ chain);
        chain = contractContact.polygonID;
        callReciever(chain,data);   
    });

    // avalanche proxy setup
    [proxyAddress,proxyAbi] = contractContact.getProxyContract(contractContact.avalancheID);
    console.log("listening too proxy address: " + proxyAddress);
    var proxyContractAvalanche = new ethers.Contract(proxyAddress,proxyAbi,new ethers.providers.JsonRpcProvider(contractContact.avalancheRPC));

    //listen for proxyCall sent from proxy

    proxyContractAvalanche.on("ProxyCall", (to, data, chain) => {
        console.log("Sent Message: " + to + " "+ data + " "+ chain);
        chain = contractContact.avalancheID;
        callReciever(chain,data);   
    });

    

    
};

// useEffect function that changes the parent state of the sender and reciever when the dropdown is changed
/*
  useEffect(() => {
    setParentSender(sender);
    setParentReciever(reciever);
  }, [sender, reciever]);
*/
  
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