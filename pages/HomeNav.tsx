import '../src/main.css'
import { Col, Row, Nav, Navbar, NavDropdown, Container, Alert } from 'react-bootstrap';
import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'wouter';

import { User } from './lib/GetUser';
import { useAuth } from './lib/AuthHook';
import { account } from "./lib/appwrite";
import { TraderyItems } from './lib/ItemsInterface';
import { getItems } from './lib/Items';
import ItemCard from './comp/ItemCard';

interface HomeNavProps {
  children?: ReactNode;
}

const HomeNav = ({ children }: HomeNavProps) => {
  const { session } = useAuth();
  
  async function logoutHandle() {
    await account.deleteSession('current');
    console.log("account deleted!");
    // setSession(undefined);
  }
  return (
    <>
    <div className="body" >
      <Navbar expand="lg" bg="primary" sticky="top" className="justify-content-between">
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
                  { session && (
                    <NavDropdown.Item href="/Tradery">
                      Logout <button onClick={logoutHandle} className="logout-btn"></button>
                    </NavDropdown.Item>
                  )}
                  { !session && (
                    <NavDropdown.Item href="/Tradery">
                      Login
                    </NavDropdown.Item>
                  )}
                </NavDropdown>
              </Nav>
            </Row>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>{ children }</main>
    </div>
    </>
  );
}
export default HomeNav