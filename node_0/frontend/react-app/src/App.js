import logo from './logo.svg';
import { Image, Stack } from 'react-bootstrap';
import './App.css';
import { useState, useEffect, useCallback, useRef } from 'react';
import {Transfer} from './components/Transfer';
import {NftDisplay} from './components/NftDisplay';
import army_logo from './assets/logo_usArmy_64.png';
import ucf_logo from './assets/logo_ucf_312.png';
import * as contractData from "./contractApi/chainIDs";

// todo: get the two chains that are being displayed in teh transfer component and only display the coresponding NFT components
//todo: add industry spacific NFTs to each chain
function App() {
  const [parentSender, setParentSender] = useState("");
  const [parentReceiver, setParentReceiver] = useState("");

  // wrapper function to give to transfer component
  const handleSender = useCallback((sender) => {
    setParentSender(sender);
  }, [setParentSender]);

  // wrapper function to give to transfer component
  const handleReceiver = useCallback((receiver) => {
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
      <div className='rowC'>
        <NftDisplay identifier={contractData.ethID}/>
        <NftDisplay identifier={contractData.binanceID}/>
        <NftDisplay identifier={contractData.fantomID}/>
        <NftDisplay identifier={contractData.polygonID}/>
        <NftDisplay identifier={contractData.avalancheID}/>
      </div>    
    </div>
  );
}

export default App;
