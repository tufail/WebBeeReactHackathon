import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

import { allState } from '../../store/machines-slice';

function Header() {
  const state = useSelector(allState);
  const { machinetypes } = state;

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Machine Management Inc.
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item as="li">
              <Nav.Link as={Link} to={`/`}>
                All
              </Nav.Link>
            </Nav.Item>
            {machinetypes &&
              machinetypes.map(
                (item) =>
                  item.name.value && (
                    <Nav.Item as="li" key={item.id}>
                      <Nav.Link as={Link} to={`/type/${item.id}`}>
                        {item.name.value}
                      </Nav.Link>
                    </Nav.Item>
                  )
              )}
            <Nav.Item as="li" key={'/types'}>
              <Nav.Link as={Link} to={`/types`}>
                Manage Types
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
