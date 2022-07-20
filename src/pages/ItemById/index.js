import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';

import ItemForm from '../../component/ItemForm';
import { uid } from '../../utils';
import { allState, addItem } from '../../store/machines-slice';
import styles from './ItemById.module.scss';

function ItemById(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const state = useSelector(allState);
  const items = [...state.items];
  const category = state.machinetypes.length
    ? state.machinetypes.filter((item) => item.id === params.id)
    : '';

  if (category.length === 0) return <div>No Items</div>;

  const singleTypeData = items.length
    ? items.filter((item) => item.typeId === params.id)
    : [];

  function addItemHandler() {
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
      typeId: params.id,
      fieldData: formData,
    };
    dispatch(addItem(fields));
  }

  return (
    <Container className={styles.main} fluid>
      <Row>
        <Col>
          <h3>{category[0].name.value}</h3>
          <hr />
        </Col>
      </Row>
      <Row>
        {singleTypeData &&
          singleTypeData.map((item, i) => (
            <ItemForm
              titleField={category[0].modalTitle.value}
              data={item}
              title={category[0].name.value}
              typeData={category[0]}
              key={i}
            />
          ))}
        <Col md={4} lg={3}>
          <Button onClick={addItemHandler}>Add Item</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ItemById;
