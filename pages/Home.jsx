import '../src/main.css'
import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { CheckSession, account } from './appwrite'
import Navbar from 'react-bootstrap/Navbar';
import { getUsername } from './GetUser';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';

const HomePage = () => {
  async function logoutUser() {
    try {
      await account.deleteSession('current')
      await useNavigate("#")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
    <div class="body">
      <Navbar expand="xxl" bg="danger" className="justify-content-between">
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
                  <button onclick={logoutUser}>
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
          <div class="Main" id="pagewrap">
              <div class="searchinput">
                  <form>
                      <input name="keyword" placeholder="Search for Items..."></input>
                      <button type="submitbtn">Search</button>
                  </form>
              </div>
          </div>
        </div>
    </>
  );
}
export default HomePage