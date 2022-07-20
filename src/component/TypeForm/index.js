import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Card,
  Form,
  InputGroup,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import { Trash } from 'react-feather';
import slugify from 'slugify';

import {
  handleTypeUpdate,
  handleTypeDelete,
  updateItem,
  allState,
} from '../../store/machines-slice';
import styles from './TypeForm.module.scss';
import { uid } from '../../utils';

function TypeForm({ data }) {
  const dispatch = useDispatch();
  const state = useSelector(allState);
  const [typeValue, setTypeValue] = useState('Type Title');

  function changeHandler(e) {
    let dataCopy = { ...data };
    dataCopy[e.target.name] = {
      ...dataCopy[e.target.name],
    };

    if (e.target.name === 'name') setTypeValue(e.target.value);
    dataCopy[e.target.name].value = e.target.value;
    dispatch(handleTypeUpdate(dataCopy));
  }

  const changeTypeHandler = (name, value) => {
    let dataCopy = { ...data };
    let updatedItems = [];
    if (value !== 'delete') {
      dataCopy[name] = {
        ...dataCopy[name],
      };
      dataCopy[name].type = value;
    } else {
      let items = [...state.items];
      updatedItems = items.map((item) => {
        if (item.typeId === data.id) {
          item.fieldData.map((field, i) => {
            if (field.name === name) {
              delete item.fieldData[i];
            }
            return field;
          });
        }
        return item;
      });
      delete dataCopy[name];
    }
    if (updatedItems.length) dispatch(updateItem(updatedItems));
    dispatch(handleTypeUpdate(dataCopy));
  };

  const changeNameHandler = (name, value) => {
    let dataCopy = { ...data };
    dataCopy[name] = {
      ...dataCopy[name],
    };
    let slug = slugify(`${value + uid()}`, { lower: true });
    dataCopy[name].name = slug;
    dataCopy[name].label = value;
    dispatch(handleTypeUpdate(dataCopy));
  };

  function addFieldHandler(type) {
    let dataCopy = { ...data };
    let id = uid();

    dataCopy[id] = {
      id: id,
      name: '',
      type,
      value: '',
      label: '',
      custom: true,
    };

    dispatch(handleTypeUpdate(dataCopy));
  }

  function deleteHandler() {
    dispatch(handleTypeDelete(data));
  }

  return (
    <Col md={4} lg={3}>
      <Card>
        <Card.Header>
          {typeValue}{' '}
          <Trash onClick={deleteHandler} size={18} className={styles.delete} />
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Object Type</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={data.name.value}
                onChange={changeHandler}
                placeholder="eg. Bulldozers"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Object Title</Form.Label>
              <Form.Select
                value={data.modalTitle.value}
                name="modalTitle"
                onChange={changeHandler}
                aria-label="Object Title"
              >
                <option>Select</option>
                {Object.keys(data).map((key, index) =>
                  key === 'id' ||
                  key === 'modalTitle' ||
                  key === 'title' ||
                  data[key].type !== 'text' ? null : (
                    <option value={data[key].name} key={index}>
                      {data[key].label}
                    </option>
                  )
                )}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fields</Form.Label>
              {Object.keys(data).map((key, index) =>
                data[key].custom ? (
                  <InputGroup className="mb-3" key={index}>
                    <Form.Control
                      name={key}
                      value={data[key].label}
                      onChange={(e) => changeNameHandler(key, e.target.value)}
                    />
                    <Form.Select
                      value={data[key].type}
                      onChange={(e) => changeTypeHandler(key, e.target.value)}
                    >
                      <option>Select</option>
                      <option value="text">Small Text</option>
                      <option value="number">Number</option>
                      <option value="date">Date</option>
                      <option value="checkbox">Checkbox</option>
                      {key !== 'name' ? (
                        <option value="delete">Delete</option>
                      ) : null}
                    </Form.Select>
                  </InputGroup>
                ) : null
              )}
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted d-grid">
          <DropdownButton
            className={styles.button}
            variant={'primary'}
            title="Add Field"
            id="input-group-dropdown-1"
          >
            <Dropdown.Item onClick={() => addFieldHandler('text')}>
              Small Text
            </Dropdown.Item>
            <Dropdown.Item onClick={() => addFieldHandler('date')}>
              Date
            </Dropdown.Item>
            <Dropdown.Item onClick={() => addFieldHandler('number')}>
              Number
            </Dropdown.Item>
            <Dropdown.Item onClick={() => addFieldHandler('checkbox')}>
              Checkbox
            </Dropdown.Item>
          </DropdownButton>
        </Card.Footer>
      </Card>
    </Col>
  );
}

export default TypeForm;
