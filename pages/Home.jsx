import '../src/main.css'
import React, { useEffect } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { CheckSession, account } from './appwrite'
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';

const HomePage = () => {
  useEffect(() => {
    CheckSession();
  });
  async function logoutUser() {
    try {
      await account.deleteSession('current')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
    <div class="body">
      <Navbar expand="lg" bg="danger" className="justify-content-between">
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
          <Navbar.Collapse className="justify-content-end flex-grow-1">
            <Row>
              <Nav className="me-auto">
                <Nav.Link href="#/Dashboard/Messages#view-messages">Messages</Nav.Link>
                <NavDropdown title="User" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#/Dashboard">User Dashboard</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <button onclick={logoutUser} href="#">
                  <NavDropdown.Item>
                    Logout
                  </NavDropdown.Item>
                  </button>
                </NavDropdown>
              </Nav>
            </Row>
          </Navbar.Collapse>
        </Container>
      </Navbar>
          <div class="container" id="pagewrap">
              <div class="searchinput">
                <form class="search">
                    <input name="keyword" placeholder="Search for Items..."></input>
                    <Button type="submitbtn" as="input" value="Search"/>
                </form>
              </div>
          </div>
        </div>
    </>
  );
}
export default HomePage