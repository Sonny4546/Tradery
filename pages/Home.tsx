import '../src/main.css'
import React, { useEffect, useState } from 'react'
import { useAuth } from './lib/AuthHook';
import { Col, Row, Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import ItemCard from './comp/ItemCards';
import { TraderyItems } from './lib/ItemsInterface';
import { getItems } from './lib/Items';
import ItemCard from './comp/ItemCard';
import { Link } from 'wouter';

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
          {Array.isArray(items) && items.length > 0 && (
            // <div className="items container">
            //   <Row>
            //   {items.map((items) => {
            //     return (
            //     <Col xs={12} md={3}>
            //           <Link key={items.name} href="#">
            //             <a>
            //               <ItemCard
            //                 date={items.date}
            //                 image={{
            //                   alt: '',
            //                   height: items.imageHeight,
            //                   url: items.imageUrl,
            //                   width: items.imageWidth
            //                 }}
            //                 name={items.name}
            //                 author={items.author}
            //               />
            //             </a>
            //           </Link>
            //     </Col>
            //     )
            //     })}
            //   </Row>
            // </div>
            <h1>ITEMS ACCESSED</h1>
          )}
          {Array.isArray(items) && items.length === 0 && (
            <Container>
              <Alert key='warning' variant='warning'>
                No Items are currently posted, 
                <Alert.Link href="#">You can start by posting here</Alert.Link>.
              </Alert>
            </Container>
          )}
        </div>
      </div>
    </>
  );
}
export default HomePage