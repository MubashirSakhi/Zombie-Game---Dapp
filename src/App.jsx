import React, {useEffect} from 'react';
import { BrowserRouter,Routes, Route, Navigate} from 'react-router-dom';
import Home from './Home';
import Zombie from './Components/Zombie/index';
import Arena from './Components/Arena/index';
import Auth from './Components/Auth/Auth';
import Logout from './Components/Logout/Logout';
import Layout from './hoc/Layout/Layout';
import { useGlobalContext } from './context';
const App= ()=> {
  const { currentAccount,setCurrentAccount } = useGlobalContext();
  let routes;
  
  const checkIfWalletIsConnected = async () => {
    try {
      
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have MetaMask!, add a link to metamask');
        alert("Make sure you have Metamask!")
       
        return;
      } else {
        console.log('We have the ethereum object', ethereum);

        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
          
          
        } else {
          console.log('No authorized account found');
          alert("Create a account on metamask!");
          
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
  useEffect(()=>{
    checkIfWalletIsConnected();
    checkNetwork();
    window.ethereum.on("chainChanged", function (networkId) {
      console.log(networkId);
      if (networkId !== "5") {
        console.log("You have switched from Goelri to another network");
        alert("Please switch back to goelri");
      }
    });
  },[currentAccount]);
  try {
    
    console.log("current account: " + currentAccount);
    if(currentAccount != null){
      console.log("ajeeb pro")
      routes = ( 
      <Routes>
              <Route path='/' exact element={<Home/>}/>
              <Route path="/zombie/:id" element={<Zombie/>}/>
              <Route path="/arena/:arena" element={<Arena/>}/>
              <Route path="/logout" element={<Logout/>}/>
            </Routes>
      );
    }
        else {
          console.log("redirect to auth page if wallet is connected or something");
          routes = (
          <Routes>
            <Route path='/' exact element={<Auth/>}/>
            <Route
      path="*"
      element={<Navigate to="/" />}
    />
           
          </Routes>
          
  )
        }
      }
     catch (error) {
      console.log(error);
    }
  
  return  (
    <Layout>
        {routes}
    </Layout>)
}
export default App;