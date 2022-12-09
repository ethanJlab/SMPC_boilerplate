import logo from './logo.svg';
import { Image } from 'react-bootstrap';
import './App.css';
import { useState } from 'react';
import {Transfer} from './components/Transfer';
import {NftDisplay} from './components/NftDisplay';
import army_logo from './assets/logo_usArmy_64.png';
import ucf_logo from './assets/logo_ucf_312.png';

function App() {
  return (
    // army logo at the top
    <div>
    <Image src = {army_logo}/>
    <Image src = {ucf_logo}/>
    <Transfer/>
    <NftDisplay identifier={5}/>
    <NftDisplay identifier={97}/>
    <NftDisplay identifier={4002}/>
    <NftDisplay identifier={80001}/>
    <NftDisplay identifier={43113}/>
    </div>
  );
}

export default App;
