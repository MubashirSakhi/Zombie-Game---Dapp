import React from 'react';
import Aux from '../Aux/Aux';
import './Layout.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';

const Layout = (props)=>{
  return (
    <Aux>
      <div className="App">
        <div className="container">
          <Toolbar/>
          <div className="header-container">
              <p className="header gradient-text">⚔️ Metaverse Slayer ⚔️</p>
              <p className="sub-text">Team up to protect the Metaverse!</p>
              <div>
                {props.children}
              </div>
            </div>
        </div>
      </div>
      
       
    </Aux>
  )
}
export default Layout;