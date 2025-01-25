import '../src/main.css'
import React, { useEffect, useState } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { CheckSession, account, getUser } from './appwrite'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';

async function logoutUser(){
  await account.deleteSession('current'), 
  useNavigate('#');
} 

const HomePage = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await getUser()
        setUser(userData)
      } catch (error) {
        setUser(null)
      }
    }

    checkUser()
  }, [])
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end flex-grow-1">
            <Row>
              <Nav className="me-auto">
                <Nav.Link href="#/Dashboard/Messages#view-messages">Messages</Nav.Link>
                <NavDropdown title={user.name} id="basic-nav-dropdown" align="end">
                  <NavDropdown.Item href="#/Dashboard/Profile">User Dashboard</NavDropdown.Item>
                  <NavDropdown.Divider />
                  {user ? (
                    <>
                      <NavDropdown.Item>
                        Logout <button onclick={logoutUser} href="#" class="logout-btn"></button>
                      </NavDropdown.Item>
                    </>
                  ) : (
                    <NavDropdown.Item>
                      Logout
                    </NavDropdown.Item>
                  )}
                  
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