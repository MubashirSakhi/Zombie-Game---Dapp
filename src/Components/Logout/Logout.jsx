import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTRACT_ADDRESS, transformZombieData} from '../../constants';
import { ethers } from 'ethers';
import { useGlobalContext } from '../../context';
import LoadingIndicator from '../LoadingIndicator';

const Logout = ()=> {
  let navigate = useNavigate();
  const { currentAccount,setCurrentAccount } = useGlobalContext();
 useEffect(async () => {
    setCurrentAccount(null);
    navigate('/auth');

  }, []); 
  return null;
}


export default Logout;