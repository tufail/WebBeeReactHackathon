import React from 'react';
import { Form } from 'react-bootstrap';

function ItemFields({ onChange, typeData, fields }) {
  let allFields =
    typeof typeData === 'object'
      ? Object.keys(typeData).map((key, i) => {
          if (i > 2 && key !== 'id' && typeData[key].custom) {
            let isExist = fields.findIndex(
              (input) => input && typeData[key].name === input.name
            );
            if (isExist > -1) {
              return fields[isExist];
            } else {
              return {
                name: typeData[key].name,
                value: '',
                label: typeData[key].label,
                type: typeData[key].type,
                typeId: key,
              };
            }
          } else {
            return undefined;
          }
        })
      : [];

  if (allFields.length < 0) return <></>;

  return (
    <>
      {allFields.length > 0 &&
        allFields.map((field) =>
          typeof field !== 'undefined' ? (
            field.type === 'checkbox' ? (
              <Form.Group key={field.name} className="mb-3">
                <Form.Check
                  value={field.value}
                  type="checkbox"
                  defaultChecked={field.value ? true : false}
                  name={field.name}
                  label={field.label}
                  onChange={onChange}
                />
              </Form.Group>
            ) : (
              <Form.Group key={field.name} className="mb-3">
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  type={field.type}
                  name={field.name}
                  value={field.value}
                  onChange={onChange}
                />
              </Form.Group>
            )
          ) : null
        )}
    </>
  );
}

export default ItemFields;
