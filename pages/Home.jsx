import '../src/main.css'
import React from 'react'
import { Account } from "appwrite";
import { getUsername, client } from './GetUser';
import { CheckSession } from './Authenticate'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const HomePage = () => {
  // useEffect(() => {
  //     CheckSession();
  //     getUsername();
  // });
  const account = new Account(client);
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
      <Navbar expand="lg" bg="danger" data-bs-theme="dark">
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
            <Nav className="me-auto">
              <Nav.Link href="#/Dashboard/Messages">Messages</Nav.Link>
              <NavDropdown title="User" id="basic-nav-dropdown">
                <NavDropdown.Item href="#/Dashboard">User Dashboard</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#" onclick={logoutUser}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
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