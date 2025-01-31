import '../src/main.css'
import React, { useEffect, useState } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { useAuth } from './lib/AuthHook';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { TraderyItems } from './lib/ItemsInterface';
import { getItems } from './lib/Items';

const HomePage = () => {
  const [items, setItems] = useState<Array<TraderyItems> | undefined>();
  const { logOut } = useAuth();
  const { NoSessionCheck } = useAuth();
  useEffect(() => {
    (async function run() {
      const { items } = await getItems();
      setItems(items)
    })();
  }, []);
  
  async function logoutHandle() {
    await logOut();
  }
  useEffect(() => {
    NoSessionCheck();
  }, []);
  return (
    <>
    <div className="body home" >
      <Navbar expand="lg" bg="primary" className="justify-content-between">
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
              {/* <div className="itemcontent">
                <div className="img-container">
                  <img src="./images/900px.png"></img>
                </div>
                <div className="itemData">
                  <div className="itemName"><p>Name</p></div>
                  <div className="itemAuthor"><p>By: John Doe</p></div>
                  <div className="itemDate"><p>Date</p></div>
                </div>
              </div> */}
              <Card style={{ width: '18rem' }}>
                <a className="itemLink">
                <Card.Img variant="top" src="./images/900px.png" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Author
                  </Card.Text>
                </Card.Body>
                </a>
              </Card>
            </div>
          </div>
        </div>
    </>
  );
}
export default HomePage