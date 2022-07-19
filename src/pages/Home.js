import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';

import ItemForm from '../component/ItemForm';
import { uid } from '../utils';
import { allState, addItem } from '../store/machines-slice';
import styles from './ItemById/ItemById.module.scss';

function Home() {
  const dispatch = useDispatch();
  const state = useSelector(allState);
  const { machinetypes } = state;

  function addItemHandler(typeId) {
    const category = state.machinetypes.length
      ? state.machinetypes.filter((item) => item.id === typeId)
      : '';
    let id = uid();
    let formData = Object.keys(category[0]).map((key) => {
      let data = null;
      if (category[0][key].custom) {
        data = {
          name: category[0][key].name,
          value: '',
          label: category[0][key].label || category[0][key].name,
          type: category[0][key].type,
          typeId: key,
        };
      }
      return data;
    });

    let fields = {
      id: id,
      typeId: typeId,
      fieldData: formData,
    };
    dispatch(addItem(fields));
  }

  return (
    <Container className={styles.main} fluid>
      {machinetypes && machinetypes.length
        ? machinetypes.map((category) => (
            <div className={styles.categorySection}>
              <Row>
                <Col>
                  <h4>{category.name.value}</h4>
                  <hr />
                </Col>
              </Row>
              <Row>
                {state &&
                  state.items &&
                  state.items.map((item, i) =>
                    item.typeId === category.id ? (
                      <ItemForm
                        data={item}
                        titleField={category.modalTitle.value}
                        title={category.name.value}
                        typeData={category}
                        key={item.id}
                      />
                    ) : null
                  )}
                <Col md={4} lg={3}>
                  <Button onClick={() => addItemHandler(category.id)}>
                    Add Item
                  </Button>
                </Col>
              </Row>
            </div>
          ))
        : null}
    </Container>
  );
}

export default Home;
