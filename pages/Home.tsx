import '../src/main.css'
import { Col, Row, Nav, Navbar, NavDropdown, Container, Alert } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { Link } from 'wouter';

import { User } from './lib/GetUser';
import { useAuth } from './lib/AuthHook';
import { TraderyItems } from './lib/ItemsInterface';
import { getItems } from './lib/Items';
import ItemCard from './comp/ItemCard';

const HomePage = () => {
  const [items, setItems] = useState<Array<TraderyItems> | undefined>();
  const { logOut } = useAuth();
  const { NoSessionCheck } = useAuth();

  useEffect(() => {
    User();
    (async function run() {
      const { items } = await getItems();
      setItems(items)
      console.log(items);
    })();
  }, []);
  
  async function logoutHandle() {
    await logOut();
  }
  return (
    <>
    <div className="body home" >
      <Navbar expand="lg" bg="primary" sticky="top" className="justify-content-between">
        <Container>
          <Navbar.Brand href="#/Home">
            <img
              alt=""
              src="./images/favicon.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Tradery
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end flex-grow-1">
            <Row>
              <Nav className="me-auto">
                <Nav.Link href="#/Dashboard/Messages#view-messages">Messages</Nav.Link>
                <NavDropdown title="User" id="basic-nav-dropdown" align="end">
                  <NavDropdown.Item href="#/Dashboard/Profile">User Dashboard</NavDropdown.Item>
                  <NavDropdown.Divider />
                    <NavDropdown.Item href="/Tradery">
                      Logout <button onClick={logoutHandle} className="logout-btn"></button>
                    </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Row>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        <div className="container" id="pagewrap">
          <div className="searchinput">
            <form className="search">
                <input name="keyword" placeholder="Search for Items..."></input>
                <button>Search</button>
            </form>
          </div>
          <div className="items container">
          <Row>
            {Array.isArray(items) && items.length > 0 && (
              <>
                {items.map((items) => {
                  return (
                    <Col xs={12} md={3} style={{ paddingBottom: '20px' }}>
                      <Link className="itemLink" href={`/Item/${items.$id}`}>
                        <a>
                          <ItemCard
                            // image={{
                            //   alt: '',
                            //   height: items.imageHeight,
                            //   url: items.imageUrl,
                            //   width: items.imageWidth
                            // }}
                            name={items.name}
                            date={items.date}
                            author={items.author}
                          />
                        </a>
                      </Link>
                    </Col>
                  )
                })}
              </>
            )}
            {Array.isArray(items) && items.length === 0 && (
              <Container>
                <Alert key='warning' variant='warning'>
                  No Items are currently posted, 
                  <Alert.Link href="#">You can start by posting here</Alert.Link>.
                </Alert>
              </Container>
            )}
          </Row>
          </div>
        </div>
      </div>
    </>
  );
}
export default HomePage