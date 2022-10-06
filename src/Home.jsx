import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import Zombies from './Components/SelectCharacter';
import Zombie from './Components/Zombie';
import { CONTRACT_ADDRESS, transformZombieData} from './constants';
import zombieGame from './utils/ZombieGame.json';
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
import Arena from './Components/Arena';
import { ethers } from 'ethers';
import LoadingIndicator from './Components/LoadingIndicator';
import { useGlobalContext } from './context';
import classes from './Home.module.css';
const Home = () => {
  // State
  const { currentAccount,setCurrentAccount } = useGlobalContext();
  // State
const [characterNFT, setCharacterNFT] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [nameObject, setNameObject] = useState({
    name:"gh",
    valid:false,
    touched:false,
  })
const [inputName, setInputName] = useState("");
const [inputTouched,setInputTouched] = useState(false);
const [inputValid,setInputValid] = useState(false);
const [zombies,setZombies] = useState([]);
const [zombieCount, setZombieCount] = useState(0);
const [inputClasses,setInputClasses] = useState([classes.InputElement]);
const [error,setError] = useState("");

const createZombie = async() => {
  try{
    setIsLoading(true);
  if(inputName.length > 2){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const gameContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      zombieGame.abi,
      signer
    );
    const txn = await gameContract.createRandomZombie(inputName);
    setZombieCount(1);
  }
  else{
    //open up a modal showig error on input
    console.log('error in name');
  }
  setIsLoading(false);
  }
  catch(error){
    console.log(error);
    setIsLoading(false);
  }
  
    
  }
    
  useEffect(async ()=> {
    try{
      setIsLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const gameContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      zombieGame.abi,
      signer
    );
    const count = await  gameContract.checkIfUserHasZombie();
    setZombieCount(count);
    setIsLoading(false);
    }
    catch(error){
      console.log("Home Exception Error: " + error);
      setError(error);
      setIsLoading(false);
    }
   // gameContract.on('newZombie', onNewZombie);
    
  },[currentAccount])
// const onNewZombie = async(from,_id,name,dna)=>{
  
// }
const handleNameChange = (e)=>{
    //check validity
    setInputName(e.target.value);
    setInputTouched(true);
    if(e.target.value.length < 1 && inputTouched){
      setInputValid(false);
      console.log("name: " + inputName);
      setInputClasses(prev => [...prev,classes.Invalid]);
      console.log("input classes: " + inputClasses.length);
    }
    else{
      setInputClasses(prev =>[classes.InputElement]);
      setInputValid(true);
      console.log("name: " + inputName);
      console.log("input classes: " + inputClasses.length);
    }
    console.log("input: " + inputClasses);
  } 
  
  // function is to render content according to conditions
  const renderContent = () => {
  if (isLoading) {
    return <LoadingIndicator />;
  }
   
  else if (currentAccount && zombieCount == 0) {
    return (
     <div className="connect-wallet-container">
        <img
          src="src/assets/tumblr_mbia5vdmRd1r1mkubo1_500.gif"
          alt="Monty Python Gif"
        />
       {error.length>1 && <label>{error}</label>}
       <input placeholder="Type your zombie name" className={inputClasses.join(' ')} type="text" value={inputName} onChange={handleNameChange} required></input>
        <button
          className="cta-button mint-button"
          onClick={createZombie} disabled={!inputValid}
        >
          Generate A Zombie to Get Started
        </button>
      </div>
    )
    // return <Arena />;
  }
  else{
    return (<Zombies/>);
      }
     
  };
 
  return (
  <div>
    <div>
      <div>
        {renderContent()}
      </div>
      <div className="footer-container">
        <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
        <a
          className="footer-text"
          href={TWITTER_LINK}
          target="_blank"
          rel="noreferrer"
        >{`built with @${TWITTER_HANDLE}`}</a>
      </div>
    </div>
  </div>
);
};

export default Home;