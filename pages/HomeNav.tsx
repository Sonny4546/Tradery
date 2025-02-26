import { Col, Row, Nav, Navbar, NavDropdown, Container, Modal, Spinner, Button } from 'react-bootstrap';
import React, { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './lib/AuthHook';
import { TraderyUser } from './lib/GetUser';
import { getUser } from "./lib/appwrite";
import {auth} from "./lib/firebase"
import '../src/main.css';

interface HomeNavProps {
  children?: ReactNode;
}

const HomeNav = ({ children }: HomeNavProps) => {
  const { session, logOut } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<TraderyUser | undefined>();
  const [loading, setLoading] = useState(true); // State to control loading modal

  useEffect(() => {
    const checkSession = async () => {
      if (!session) {
        navigate("/"); // Redirect unauthorized users
        return;
      }
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false); // Hide modal after fetching
      }
    };

    checkSession();
  }, [session, navigate]);

  async function logoutHandle() {
    await auth.signOut();
    await logOut();
    navigate("/"); // Redirect to login after logout
  }

  return (
    <>
      <Modal show={loading} centered backdrop="static">
        <Modal.Body className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Please wait, loading...</p>
        </Modal.Body>
      </Modal>

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
                  <NavDropdown title={user?.name || "User"} id="basic-nav-dropdown" align="end">
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