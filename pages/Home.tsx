import '../src/main.css'
import React, { useEffect, useState } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { CheckSession, account, getUser, DeleteSession } from './appwrite'
import { Models } from 'appwrite';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';

const HomePage = () => {
  const [session, setSession] = useState<Models.Session>();
  useEffect(() => {
    (async function run() {
      const data = await CheckSession();
      setSession(data.session);
    })();
  }, [])

  async function logout() {
    await DeleteSession();
    setSession(undefined);
  }
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
                  {session && (
                    <NavDropdown.Item href="https://sonny4546.github.io/Tradery/">
                      Logout <button onClick={logout} className="logout-btn"></button>
                    </NavDropdown.Item>
                  )}
                  {!session && (
                    <NavDropdown.Item href="https://sonny4546.github.io/Tradery/">
                      Login <button className="logout-btn"></button>
                    </NavDropdown.Item>
                  )}
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
          </div>
        </div>
    </>
  );
}
export default HomePage