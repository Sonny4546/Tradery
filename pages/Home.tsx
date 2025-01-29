import '../src/main.css'
import React, { useEffect } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { useAuth } from './AuthHook';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';

const HomePage = () => {
  const { logOut } = useAuth();
  const { NoSessionCheck } = useAuth();
  
  async function logoutHandle() {
    await logOut();
  }
  useEffect(() => {
    NoSessionCheck();
  });
  return (
    <>
    <div className="body">
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
                <div className="itemcontent">
                  <div className="img-container">
                    <img src="./images/900px.png"></img>
                  </div>
                  <div className="itemName">Name</div>
                  <div className="itemAuthor">By: John Doe</div>
                </div>
              </div>
          </div>
        </div>
    </>
  );
}
export default HomePage