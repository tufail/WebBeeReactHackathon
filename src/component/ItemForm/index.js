import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Card, Form } from 'react-bootstrap';
import { Trash } from 'react-feather';

import { allState, removeItem, updateItem } from '../../store/machines-slice';
import styles from './ItemForm.module.scss';

function ItemForm({ data, titleField, title, typeData }) {
  const dispatch = useDispatch();
  const state = useSelector(allState);
  let fieldTitleText = '';

  const category = state.machinetypes.length
    ? state.machinetypes.filter((item) => item.id === data.typeId)
    : '';

  data.fieldData.forEach((item) => {
    if (item && item.name === (titleField || category[0]?.modalTitle?.value)) {
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
    dispatch(updateItem(dataUpdate));
  }

  return (
    <Col md={4} lg={3}>
      <Card>
        <Card.Header>
          {title || category[0]?.name?.value} -{' '}
          {fieldTitleText ? fieldTitleText : 'Untitled'}
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
            {/* {data &&
              data.fieldData.map((field) =>
                field ? (
                  field.type === 'checkbox' ? (
                    <Form.Group key={field.name} className="mb-3">
                      <Form.Check
                        value={field.value}
                        type="checkbox"
                        defaultChecked={field.value ? true : false}
                        name={field.name}
                        label={field.label}
                        onChange={handleChangeItemField}
                      />
                    </Form.Group>
                  ) : (
                    <Form.Group key={field.name} className="mb-3">
                      <Form.Label>{field.label}</Form.Label>
                      <Form.Control
                        type={field.type}
                        name={field.name}
                        value={field.value}
                        onChange={handleChangeItemField}
                      />
                    </Form.Group>
                  )
                ) : null
              )} */}
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ItemForm;
