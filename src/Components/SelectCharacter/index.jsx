import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectCharacter.css';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS,transformZombieData} from '../../constants';
import zombieGame from '../../utils/ZombieGame.json';
import LoadingIndicator from '../../Components/LoadingIndicator';
import Container from 'react-bootstrap/Container';
import { Col, Row, Form } from "react-bootstrap";
import { useGlobalContext } from '../../context';
import ZombieBody from '../ZombieBody';
/*
 * Don't worry about setCharacterNFT just yet, we will talk about it soon!
 */
const Zombies = ({ }) => {
   const { currentAccount,setCurrentAccount } = useGlobalContext();
  let navigate = useNavigate();
  const [zombies, setZombies] = useState([]);
  const [gameContract, setGameContract] = useState(null);
  // Actions
  useEffect(() => {
  const { ethereum } = window;

  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const gameContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      zombieGame.abi,
      signer
    );
    setGameContract(gameContract);
  } else {
    console.log('Ethereum object not found');
  }
}, []);
  const profilePage = (zombie)=> {
    console.log("DNA: " + zombie.id);
    navigate("/zombie/" + zombie.id,{
      state:{
        name:zombie.name,
        dna:zombie.dna,
        level:zombie.level,
        readyTime:zombie.readyTime,
        winCount:zombie.winCount,
        lossCount:zombie.lossCount,
        id:zombie.id
    }
    });
  }
  const arenaPage = (zombie)=> {
    console.log("DNA: " + zombie.id);
    navigate("/arena/" + zombie.id,{
      state:{
        name:zombie.name,
        dna:zombie.dna,
        level:zombie.level,
        readyTime:zombie.readyTime,
        winCount:zombie.winCount,
        lossCount:zombie.lossCount,
        id:zombie.id
    }
    });
  }
  const getZombies = async ()=>{
    try{
      const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
      console.log("signer: " + signer);
      const zombieIds = await gameContract.getZombiesByOwner(currentAccount);
      
    zombieIds.forEach((zombieId)=>{
     gameContract.zombies(zombieId)
      .then(zombieDetails=>{
        let tempZombie = transformZombieData(zombieDetails);
        tempZombie.id= zombieId.toString();
        setZombies((state) => [...state, tempZombie])
      })
      
      })
    }
    catch(error){
      console.log(error);
    }
    }
  
useEffect(() => {
  if (gameContract) {
    getZombies();
  }
  return () => {

  };
}, [gameContract]);

  
// Actions
  const handleNameChange = (e) =>{
    
  }
const renderCharacters = () =>
  zombies.map((zombie, index) => (
    <Col sm={3} className="zombie-column" key={index}>
      <div className="character-item" >
        <div className="name-container">
          <p>Name: {zombie.name}</p>
          <p>Level: {zombie.level}</p>
        </div>
        <ZombieBody dna={zombie.dna}/>
        <div className="character-button-div">
            <button
            type="button" className="character-mint-button" onClick={()=>profilePage(zombie)}
          >Profile</button>
          <button onClick={()=>arenaPage(zombie)}
            type="button"className="character-mint-button"
           
          >Attack</button>
        </div>
        
      </div>
    </Col>
    
  ));
  return (
    <div className="select-character-container">
      <h2>Choose Your Hero. Choose wisely.</h2>
      <Container>
          <Row>
            {renderCharacters()}
            
          </Row>
        </Container>
    </div>
  
  );
};

export default Zombies;