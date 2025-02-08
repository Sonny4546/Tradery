import '../src/main.css'
import { Col, Row, Nav, Navbar, NavDropdown, Container, Alert } from 'react-bootstrap';
import React, { ReactNode, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'wouter';

import { useAuth } from './lib/AuthHook';
import { Redirect } from 'wouter';
import { TraderyItems } from './lib/ItemsInterface';
import { getItems } from './lib/Items';
import ItemCard from './comp/ItemCard';
import { useNavigate } from 'react-router-dom';

interface HomeNavProps {
  children?: ReactNode;
}

const HomeNav = ({ children }: HomeNavProps) => {
  const { session, logOut } = useAuth();

  async function logoutHandle() {
    await logOut()
    return (
      <Redirect to="/" />
    )
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
                    <button onClick={logoutHandle} className="logout-btn">
                      <NavDropdown.Item href="/Tradery">
                        Logout
                      </NavDropdown.Item>
                    </button>
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