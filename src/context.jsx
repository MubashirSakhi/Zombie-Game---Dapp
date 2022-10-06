import React, { useContext, useEffect, useReducer } from 'react'
const SET_ACCOUNT = 'SET_ACCOUNT';
const SET_NETWORK = 'SET_NETWORK';
import reducer from './reducer';

const initialState = {
  currentAccount:null,
  zombieContract:null
}
const AppContext = React.createContext();

const AppProvider = ({children})=> {
  const [state,dispatch] = useReducer(reducer, initialState);
  const setCurrentAccount = (currentAccount)=> {
    console.log("dispatch: "+ currentAccount);  
    dispatch({
        type:SET_ACCOUNT,
        currentAccount:currentAccount
      })
  }
  const setNetwork = (network) => {
    console.log("network" + network);
    dispatch({
      type:SET_NETWORK,
      network:network
    })
  }
  const setZombieContract = (zombieContract)=> {
      dispatch({
        type:SET_ZOMBIE_CONTRACT,
        zombieContract:zombieContract
      })
  }
  return (
    <AppContext.Provider
      value={{ ...state, setCurrentAccount, setZombieContract,setNetwork }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }