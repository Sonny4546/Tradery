import '../src/main.css'
import React, { useState, useEffect } from 'react'
import { logoutUser, getUser } from './Login'
import { getUsername } from './GetUser';
import { CheckSession } from './Authenticate'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const HomePage = () => {
  useEffect(() => {
      CheckSession();
      getUsername();
  });
  return (
    <>
    <div class="body">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="me-auto">
              <Nav.Link href="#/Dashboard/Messages">Messages</Nav.Link>
              <NavDropdown title={getUsername()} id="basic-nav-dropdown">
                <NavDropdown.Item href="#/Dashboard">User Dashboard</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#" onclick={logoutUser}>
                  Separated link
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