import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useLocation, useParams } from 'react-router-dom';
import { CONTRACT_ADDRESS, transformZombieData } from '../../constants';
import { useNavigate } from 'react-router-dom';
import zombieGame from '../../utils/ZombieGame.json';
import './Arena.css';
import LoadingIndicator from '../../Components/LoadingIndicator';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import ZombieBody from '../ZombieBody';
const Arena = () => {
  // State
  const [gameContract, setGameContract] = useState(null);
  const [zombiesToAttack, setZombiesToAttack] = useState([]);
  const [attackerZombie, setAttackerZombie] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const { id } = useParams().arena;
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // UseEffects
  useEffect(() => {
    const { ethereum } = window;
    // id = useParams().arena;
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
  // UseEffects
  useEffect(() => {
    const getZombies = async () => {
      console.log('check zombie is not null or empty');
      setIsLoading(true);
      const zombiesTxn = await gameContract.getZombiesToAttack();
      console.log('Zombies', zombiesTxn);
      if(zombiesTxn.length){
        const zombies = zombiesTxn.map((zombie, index) => {
        let tempZombieToAttack =
          transformZombieData(zombie);
        return tempZombieToAttack;
      });
        console.log("transformed zombies: " + zombies[0].name);
        console.log("zombies to Attack " + zombiesToAttack);
        setZombiesToAttack([...zombies]);
      }
      
      
      setIsLoading(false);

    };
    if (location.state !== null && location.state != undefined) {
      //location.state.id = id;
      setAttackerZombie(location.state);
    } else {
      getZombie(id);
    }
    console.log("yo get zombies called");

    if (gameContract) {
      console.log("get zombies called");
      getZombies();
    }
  }, [gameContract]);


  const getZombie = async (zombieId) => {
    let tempZombie = await gameContract.zombies(zombieId);
    tempZombie = transformZombieData(tempZombie);
    tempZombie.id = zombieId;
    setAttackerZombie(tempZombie);

  }
  // const getSingleZombie = async zombieId => {
  // 	const zombieTxn = await gameContract.getSingleZombie(zombieId);
  // 	setAttackerZombie(transformZombieData(zombieTxn));
  // };

  const attackZombie = async (targetId) => {
    //check ready time before attacking 
    try {
      setIsLoading(true);
      let d = new Date();
      d = d.setDate(d.getDate() + 1);
      if (attackerZombie.readyTime <= d) {
        const attackZombieFunc = await gameContract.attack(attackerZombie.id, 1);
        if (attackZombieFunc) {
          setIsLoading(false);
          console.log('You won, new zombie created');
          //show the modal
          navigate("/");
        } else {
          setIsLoading(false);
          console.log('Sorry you lost, you can try again after 24 ours');
        }
      }
      else {
        setIsLoading(false);
        console.log("zombie not ready yet");
      }

    }
    catch (error) {
      setIsLoading(false);
      console.log("Zombie Attack Exception: " + error);
    }

  };
  const renderZombies = () => {
    // console.log("return please: " + zombiesToAttack.length);
    if(zombiesToAttack.length > 0){
      return zombiesToAttack.map((attacker, index) => {
      return (
        <Col sm={4} key={index}>
          <div className="players-container">
            <div className="player-container">
              <div className="player">
                <div className="image-content">
                  <h2>{attacker.name}</h2>
                  <ZombieBody dna={attacker.dna} />

                  <div className="health-bar">
                    <progress value={attacker.level} max={100} />
                    <p>{`${attacker.level} / 100 HP`}</p>
                  </div>
                  <div className="stats">
                    <button
                      type="button"
                      className="character-mint-button"
                      onClick={() => attackZombie(index)}
                    >Attack</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </Col>
      )
    })
    }
    else {
      return (
        <div><h2>There are no zombies to attack</h2></div>
      )
    }
    
  }

if (isLoading) {
    return <LoadingIndicator />;
  }
  else{
    return (
    <div className="arena-container">
      {/* Add your toast HTML right here */}
      <Container>
        <Row>
          <Col sm={4}>
            {attackerZombie && (
              <div className="players-container">
                <div className="player-container">
                  <div className="player">
                    <div className="image-content">
                      <h2>{attackerZombie.name}</h2>
                      <ZombieBody dna={attackerZombie.dna} />
                      <div className="health-bar">
                        <progress value={attackerZombie.level} max={100} />
                        <p>{`${attackerZombie.level} / 100 HP`}</p>
                      </div>
                    </div>
                    <div className="stats">
                      <h4>{`⚔️ Attack Damage: ${attackerZombie.winCount}`}</h4>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Col>
          <Col sm={8}>
            <Row>
              {renderZombies()}

            </Row>

          </Col>
        </Row>
      </Container>
    </div>
  );
  }



  
};
export default Arena;
