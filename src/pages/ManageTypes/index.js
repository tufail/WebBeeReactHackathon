import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';

import TypeForm from '../../component/TypeForm';
import { allState, handleTypes } from '../../store/machines-slice';

import styles from './ManageTypes.module.scss';

function ManageTypes() {
  const state = useSelector(allState);
  const dispatch = useDispatch();

  function addTypeHandler() {
    dispatch(handleTypes());
  }

  const { machinetypes } = state;

  return (
    <Container className={styles.main} fluid>
      <Row>
        {machinetypes &&
          machinetypes.map((mtype) => <TypeForm data={mtype} key={mtype.id} />)}

        <Col md={4} lg={3}>
          <Button onClick={addTypeHandler}>Add Type</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ManageTypes;
