import '../src/main.css'
import React, { useState, useEffect } from 'react'
import { logoutUser, getUser } from './Login'
import { useNavigate } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await getUser()
        setUser(userData)
      } catch (error) {
        setUser(null)
        useNavigate("/")
      }
    }

    checkUser()
  }, []);
  return (
    <>
    <div class="body">
    <Navbar className="bg-body-tertiary">
    <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Brand href="#/Home">
          <img
            alt=""
            src="/img/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Tradery
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link href="#/Dashboard/Messages">Messages</Nav.Link>
            <NavDropdown title={user.name} id="basic-nav-dropdown">
              <NavDropdown.Item href="#/Dashboard">User Dashboard</NavDropdown.Item>
              <NavDropdown.Item href="/" onlick={logoutUser}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
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