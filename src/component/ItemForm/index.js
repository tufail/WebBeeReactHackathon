import React from 'react';
import { useDispatch } from 'react-redux';
import { Col, Card, Form } from 'react-bootstrap';
import { Trash } from 'react-feather';

import { removeItem, updateItem } from '../../store/machines-slice';
import ItemFields from '../ItemFields';
import styles from './ItemForm.module.scss';

function ItemForm({ data, titleField, title, typeData }) {
  const dispatch = useDispatch();
  let fieldTitleText = '';

  data.fieldData.forEach((item) => {
    if (item && item.name === titleField) {
      fieldTitleText = item.value;
    }
  });

  function deleteHandler() {
    dispatch(removeItem(data));
  }

  function handleChangeItemField(e) {
    let name = e.target.name;
    let valueItem =
      e.target.type === 'checkbox'
        ? e.target.checked
          ? 'checked'
          : 'unchecked'
        : e.target.value;
    let dataUpdate = { ...data };
    let isExist = dataUpdate.fieldData.findIndex(
      (item) => item && item.name === name
    );
    if (isExist > -1) {
      let updateValue = dataUpdate.fieldData.map((item) => {
        let updateData = { ...item };
        if (item) {
          if (updateData && updateData.name === name) {
            updateData.value = valueItem;
          }
          return updateData;
        } else {
          return null;
        }
      });
      dataUpdate.fieldData = [...updateValue];
    } else {
      let allFields = [...dataUpdate.fieldData];
      let objType = Object.keys(typeData).find(
        (key) => typeData[key].name === name
      );
      dataUpdate.fieldData = [
        ...allFields,
        {
          name: name,
          value: valueItem,
          label: typeData[objType].label,
          type: typeData[objType].type,
          typeId: typeData.id,
        },
      ];
    }

    dispatch(updateItem(dataUpdate));
  }

  return (
    <Col md={4} lg={3}>
      <Card>
        <Card.Header>
          {title} - {fieldTitleText ? fieldTitleText : 'Untitled'}
          <Trash onClick={deleteHandler} size={18} className={styles.delete} />
        </Card.Header>
        <Card.Body>
          <Form>
            <ItemFields
              onChange={handleChangeItemField}
              fields={data.fieldData}
              typeData={typeData}
            />
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ItemForm;
