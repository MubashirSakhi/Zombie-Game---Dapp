import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useLocation, useParams } from 'react-router-dom';
import { CONTRACT_ADDRESS, transformZombieData } from '../../constants';
import zombieGame from '../../utils/ZombieGame.json';
import LoadingIndicator from '../../Components/LoadingIndicator';
import Container from 'react-bootstrap/Container';
import { Col, Row, Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from '../UI/Modal/Modal';
import ErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useGlobalContext } from '../../context';
import classes from './Zombie.module.css';
import ZombieBody from '../ZombieBody';

const Zombie = (props) => {
  const [zombie, setZombie] = useState(null);
  const [gameContract, setGameContract] = useState(null);
  const [zombieName, setZombieName] = useState("");
  const location = useLocation();
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nameObject, setNameObject] = useState({
    name: "",
    valid: false,
    touched: false,
  })
  const [nameTouched, setNameTouched] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [inputClasses, setInputClasses] = useState([classes.InputElement]);

  //const { match: { params }, location: { search } } = props;
  // UseEffects
  const getZombie = async (zombieId) => {
    try {
      let zombieTxn = await gameContract.getSingleZombie(zombieId);
      let tempZombie = transformZombieData(zombieTxn);
      tempZombie.id = zombieId;
      setZombie(tempZombie);
      setZombieName(tempZombie.name);
      setNameObject({ ...nameObject, name: tempZombie.name });
    }
    catch (error) {
      console.log(error);
    }

  }
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
  useEffect(() => {
    if (location.state !== null && location.state != undefined) {
      console.log("aj: " + location.state);
      setZombie(location.state);
      setZombieName(location.state.name);
      setNameObject({ ...nameObject, name: location.state.name });
      console.log("zombie: " + zombie);
    }
    else if (id) {
      getZombie(id);
      console.log("something");
    }
  }, [gameContract]);

  const levelUp = async () => {
    try {
      setIsLoading(true);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const levelUpFunc = await gameContract
        .levelUp(zombie.id, { value: ethers.utils.parseEther("0.001") });
      let zombieLevel = parseInt(zombie.level) + 1;
      setZombie({ ...zombie, level: zombieLevel })
      setIsLoading(false);
      console.log("something must happened");
    }
    catch (error) {
      setIsLoading(false);
      console.log("Increase level Exception: " + error);
    }

  }
  const changeDna = async () => {
    setModalShow(true);
  }
  const modalClosed = () => {
    setModalShow(false);
  }
  const errorModalClosed = () => {
    console.log("fucker");
    setHasError(false);
  }
  const transferZombie = async () => {

  }
  const changeName = async () => {
    try {
      setIsLoading(true);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      if (zombieName.length > 2 && zombieName.length < 50 && id !== undefined) {
        const changeNameFunc = await gameContract
          .changeName(id, zombieName);
        setZombie({ ...zombie, name: zombieName })
        setIsLoading(false);
      }
      else {
        setIsLoading(false);
        console.log("Name does not support required length")
      }
    }
    catch (err) {
      setIsLoading(false);
      if(err.message){
        setError(err);
      }
      else{
        setError({message:"Unknow", code:0});
      }
      
      setHasError(true);
      
      console.log("Name Exception Error: " + err.code);
    }


  }
  const handleNameChange = (e) => {
    //check validity
    console.log("wtf " + e.target.value);
    setZombieName(e.target.value);
    setNameTouched(true);
    setNameObject({
      ...nameObject,
      name: e.target.value,
    });
    setNameObject({
      ...nameObject,
      touched: true,
    });
    if (e.target.value.length < 1 && nameTouched) {
      setNameObject({
        ...nameObject,
        valid: true,
      });
      setNameValid(true);
      setInputClasses(prev => [...prev, classes.Invalid]);
      console.log("input classes: " + inputClasses.length);
    }
    else {
      setInputClasses(prev => [classes.InputElement]);
      setNameValid(false);
      setNameObject({
        ...nameObject,
        valid: false,
      })
      console.log("input classes: " + inputClasses.length);
    }
    console.log("input: " + inputClasses);
  }
  if (isLoading) {
    return <LoadingIndicator />
  }
  else if (zombie == null) {
    return (<div></div>);
  }
  else {
    return (
      <div>
        <Container>
          <Row className="align-items-start">
            <Col xs={4}>
              <ZombieBody dna={zombie.dna} />
            </Col>
            <Col xs={8} className={classes.zombieDetails}>
              <div>
                <p><label>Name: </label> {zombie.name}</p>
                <input className={inputClasses.join(' ')} type="text" value={zombieName} onChange={handleNameChange} maxLength={50} required></input>
                <Button onClick={changeName} disabled={nameValid}>Change Name</Button>
              </div>
              <div>
                <p><label>DNA: </label> {zombie.dna}</p>
                <Button onClick={changeDna}>Change DNA</Button>
              </div>
              <div>
                <p><label>Level: </label> {zombie.level}</p>
                <Button onClick={levelUp}>Increase Level</Button>


              </div>
              <div>
                <p><label>Ready Time</label> {zombie.readyTime}</p>
                <p><label>Win Count</label> {zombie.winCount}</p>
                <p><label>Loss Count</label> {zombie.lossCount}</p>
                <Button onClick={transferZombie}>Transfer</Button>
              </div>
            </Col>
          </Row>
          <Modal show={modalShow} modalClosed={modalClosed}>
            <div>
              <Row>
                <Col xs={4}>
                  <div className={[classes.zombieLoading, classes.zombieParts].join(" ")}></div>
                </Col>
                <Col xs={8} className={classes.ErrorMessage}>
                  <p>Error is here bro</p>
                </Col>
              </Row>
            </div>
          </Modal>
          {hasError && <ErrorHandler error={error} errorModalClosed={errorModalClosed}/>}
        </Container>
      </div>
    )
  }

}
export default Zombie;