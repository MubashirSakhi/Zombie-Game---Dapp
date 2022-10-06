import React, { useEffect, useState } from 'react';

import Modal from '../../Components/UI/Modal/Modal';
import classes from './withErrorHandler.module.css';
import Aux from '../Aux/Aux';
import { Col, Row, Form } from "react-bootstrap";
const withErrorHandler = (props) => {
  const [error, setError] = useState(null);
  useEffect(() => {
    if (props.error) {
      //call function to check for error codes
      setError(props.error);
    }

  },[]);
  const errorConfirmedHandler = () => {
      setError(null);
      props.errorModalClosed();
  }
  return (
    <Aux>
      <Modal show={error !== null}
        modalClosed={errorConfirmedHandler}>
        <div>
          <Row>
            <Col xs={4}>
              <div className={[classes.zombieLoading, classes.zombieParts].join(" ")}></div>
            </Col>
            <Col xs={8} className={classes.ErrorMessage}>
              <p>{error}</p>
            </Col>
          </Row>
        </div>
      </Modal>
    </Aux>
  )
}
export default withErrorHandler;