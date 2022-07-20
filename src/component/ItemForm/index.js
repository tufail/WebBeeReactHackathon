import React from 'react';
import { useDispatch } from 'react-redux';
import { Col, Card, Form } from 'react-bootstrap';
import { Trash } from 'react-feather';

import { removeItem, updateItem } from '../../store/machines-slice';
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
    debugger;
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
      dataUpdate.fieldData = [
        ...allFields,
        {
          name: name,
          value: valueItem,
          label: typeData.label,
          type: typeData.type,
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
            {typeof typeData === 'object' &&
              Object.keys(typeData).map((field, i) =>
                i > 2 ? (
                  typeData[field].type === 'checkbox' ? (
                    <Form.Group key={i} className="mb-3">
                      <Form.Check
                        type="checkbox"
                        checked={
                          typeof data.fieldData[i] === 'object' &&
                          data.fieldData[i].value === 'checked'
                            ? true
                            : false
                        }
                        name={typeData[field].name}
                        label={typeData[field].label}
                        onChange={handleChangeItemField}
                      />
                    </Form.Group>
                  ) : (
                    <Form.Group key={i} className="mb-3">
                      <Form.Label>{typeData[field].label}</Form.Label>
                      <Form.Control
                        type={typeData[field].type}
                        name={typeData[field].name}
                        value={data.fieldData[i]?.value}
                        onChange={handleChangeItemField}
                      />
                    </Form.Group>
                  )
                ) : (
                  ''
                )
              )}
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ItemForm;
