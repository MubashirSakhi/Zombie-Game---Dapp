import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import classes from './Toolbar.module.css';
import { ethers } from 'ethers';
import { useGlobalContext } from '../../../context';
import {Link} from 'react-router-dom';
const Toolbar = ()=> {
 const { currentAccount,setCurrentAccount } = useGlobalContext();
  const renderContent = ()=> {
   const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  let navItems = (<div></div>);
  
    if(currentAccount!=null){
      navItems = (
     <Aux>
      <header className={classes.Toolbar}>
        
      </header>
    </Aux>
  )  
   
  }
     return navItems;
 }
  
  return (
    renderContent()
  )
}
export default Toolbar;