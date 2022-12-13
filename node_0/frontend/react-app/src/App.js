import logo from './logo.svg';
import { Image, Stack, Container } from 'react-bootstrap';
import './App.css';
import { useState, useEffect, useCallback, useRef } from 'react';
import {Transfer} from './components/Transfer';
import {NftDisplay} from './components/NftDisplay';
import army_logo from './assets/logo_usArmy_64.png';
import ucf_logo from './assets/logo_ucf_312.png';
import * as contractData from "./contractApi/chainIDs";


//todo: add industry spacific NFTs to each chain
function App() {
  const [parentSender, setParentSender] = useState("");
  const [parentReceiver, setParentReceiver] = useState("");

  // wrapper function to give to transfer component
  const handleSender = useCallback((sender) => {
    console.log("parent Sender: " + sender);
    setParentSender(sender);
  }, [setParentSender]);

  // wrapper function to give to transfer component
  const handleReceiver = useCallback((receiver) => {
    console.log("parent Receiver: " + receiver);
    setParentReceiver(receiver);
  }, [setParentReceiver]);

  return (
    // army logo at the top
    <div>
      <Image src = {army_logo}/>
      <Image src = {ucf_logo}/>
      <Transfer
        parentSender={parentSender}
        setParentSender={handleSender}
        parentReceiver={parentReceiver}
        setParentReceiver={handleReceiver}/>
      <Container>
        <div className='rowC'>
          <NftDisplay identifier={parentSender}/>
          <NftDisplay identifier={parentReceiver}/>
        </div>   
      </Container> 
    </div>
  );
}

export default App;
