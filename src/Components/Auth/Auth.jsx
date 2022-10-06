import React, {useState,useEffect} from 'react';
import { CONTRACT_ADDRESS, transformZombieData} from '../../constants';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useGlobalContext } from '../../context';
import LoadingIndicator from '../LoadingIndicator';

const Auth = () => {
  let navigate = useNavigate();
  const { currentAccount,setCurrentAccount } = useGlobalContext();
  const checkIfWalletIsConnected = async () => {
    try {
      
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have MetaMask!');
        setIsLoading(false);
        return;
      } else {
        console.log('We have the ethereum object', ethereum);

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
          navigate("/");
          
        } else {
          console.log('No authorized account found');
        }
      }
    } catch (error) {
      console.log(error);
    }
    
  };
  const checkNetwork = async () => {
  try { 
    if (window.ethereum.networkVersion !== '5') {
      alert("Please connect to Goerli!")
    }
  } catch(error) {
    console.log(error)
  }
}
  
  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
      navigate("/");
      
      
    } catch (error) {
      console.log(error);
    }
  };
   useEffect(async () => {
    checkNetwork();
    checkIfWalletIsConnected();  
  }, []);
  useEffect(()=>{
    //redirect here
  },currentAccount)
  const renderContent = () => {
   
    if (currentAccount == null) {
    return (
      <div className="connect-wallet-container">
        <img
          src="src/assets/tumblr_mbia5vdmRd1r1mkubo1_500.gif"
          alt="Monty Python Gif"
        />
        <button
          className="cta-button connect-wallet-button"
          onClick={connectWalletAction}
        >
          Connect Wallet To Get Started
        </button>
      </div>
    );
    /*
     * Scenario #2
     */
    } 
  }
  return (
    renderContent()
  )
}
export default Auth;