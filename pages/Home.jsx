import '../src/main.css'
import React, { useEffect, useState } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { CheckSession, account, getUser, DeleteSession } from './appwrite'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';

const HomePage = () => {
  const [session, setSession] = useState<Models.Session>(undefined);
  useEffect(() => {
    (async function run() {
      const data = await CheckSession;
      setSession(data.session);
    })();
  }, [])
  async function logout() {
    await DeleteSession();
    setSession(undefined);
  }
  return (
    <>
    <div class="body">
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
                    <NavDropdown.Item>
                      Logout <button onclick={logout} href="#" class="logout-btn"></button>
                    </NavDropdown.Item>
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
                    <button>Search</button>
                </form>
              </div>
          </div>
        </div>
    </>
  );
}
export default HomePage