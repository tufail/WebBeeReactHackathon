import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';

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
      <Row>
        {state &&
          state.items &&
          state.items.map((item, i) => <ItemForm data={item} key={i} />)}
        <Col md={4} lg={3}>
          <DropdownButton
            variant={'primary'}
            title="Add Item"
            id="input-group-dropdown-1"
          >
            {machinetypes.map((type) => (
              <Dropdown.Item
                key={type.id}
                onClick={() => addItemHandler(type.id)}
              >
                {type.name.value}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
