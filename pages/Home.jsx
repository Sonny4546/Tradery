import '../src/main.css'
import React, { useState, useEffect } from 'react'
import { logoutUser, getUser } from './Login'
import { getUsername } from './GetUser';
import { sessioncheck } from './Authenticate'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const HomePage = () => {
  useEffect(() => {
      sessioncheck();
      getUsername;
  });
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
            <NavDropdown title={getUsername} id="basic-nav-dropdown">
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