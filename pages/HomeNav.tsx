import { Col, Row, Nav, Navbar, NavDropdown, Container, Modal, Spinner, Button } from 'react-bootstrap';
import React, { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './lib/AuthHook';
import { TraderyUser } from './lib/GetUser';
import { getUser } from "./lib/appwrite";
import {auth} from "./lib/firebase"
import '../src/main.css';
import { userInfo } from './lib/context/UserContext';

interface HomeNavProps {
  children?: ReactNode;
}

const HomeNav = ({ children }: HomeNavProps) => {
  const { session, logOut } = useAuth();
  const navigate = useNavigate();
  const {userData} = userInfo();

  async function logoutHandle() {
    await logOut();
    await auth.signOut();
    navigate("/"); // Redirect to login after logout
  }

  return (
    <>

      <div className="body">
        <Navbar expand="lg" bg="primary" sticky="top" className="justify-content-between">
          <Container>
            <Navbar.Brand href="#/Home">
              <img
                alt=""
                src="./images/favicon.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              Tradery
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end flex-grow-1">
              <Row>
                <Nav className="me-auto">
                  <Nav.Link href="#/Dashboard/Messages#view-messages">Messages</Nav.Link>
                  <NavDropdown title={userData?.name || "User"} id="basic-nav-dropdown" align="end">
                    <NavDropdown.Item href="#/Dashboard/Profile">User Dashboard</NavDropdown.Item>
                    <NavDropdown.Divider />
                    {session ? (
                      <NavDropdown.Item className="logout-nav" onClick={logoutHandle}>
                        Logout
                      </NavDropdown.Item>
                    ) : (
                      <NavDropdown.Item href="/Tradery">Login</NavDropdown.Item>
                    )}
                  </NavDropdown>
                </Nav>
              </Row>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <main>{children}</main>
      </div>
    </>
  );
};

export default HomeNav;