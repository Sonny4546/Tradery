import React from 'react';
import { useRef, useState } from 'react';
import { Container, Button, Modal, Col, Nav, Row, ListGroup } from 'react-bootstrap';

function Tutorial({ show, onHide }) {
  const tradingRef = useRef(null);
  const uploadRef = useRef(null);
  const faqRef = useRef(null);
  const fin = useRef(null);
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" }); //scroll thingy
  };
  return (
    <>
      <Modal show={show} onHide={onHide} backdrop="static" size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>First Time?</Modal.Title>
        </Modal.Header>
        <Modal.Body><Row className="mt-2">
        {/* Left-side navigation */}
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link onClick={() => scrollToSection(tradingRef)}>Trading</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => scrollToSection(uploadRef)}>Upload</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => scrollToSection(faqRef)}>Account Issues</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => scrollToSection(fin)}>Finish</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        {/* Right-side content with scrollbar */}
        <Col sm={9}>
          <Container
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "10px",
              backgroundColor: "#f8f9fa",
            }}
          >
            {/* Trading Section */}
            <div ref={tradingRef} className="mb-4">
              <h4>Trading</h4>
              <ListGroup>
                <ListGroup.Item>
                  <strong>How does trading work?</strong>
                  <p>You can list an item, find a match, and confirm a trade.</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Is trading free?</strong>
                  <p>Yes! Our platform only facilitates item exchanges without any money involved.</p>
                </ListGroup.Item>
              </ListGroup>
            </div>

            {/* Upload Section */}
            <div ref={uploadRef} className="mb-4">
              <h4>Upload</h4>
              <ListGroup>
                <ListGroup.Item>
                  <strong>How do I upload an item?</strong>
                  <p>Go to your dashboard, click "Upload Item," and fill in the details.</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>What types of files are supported?</strong>
                  <p>We support images in JPG, PNG, and GIF formats.</p>
                </ListGroup.Item>
              </ListGroup>
            </div>

            {/* FAQ Section */}
            <div ref={faqRef} className="mb-4">
              <h4>FAQ</h4>
              <ListGroup>
                <ListGroup.Item>
                  <strong>How do I reset my password?</strong>
                  <p>Go to the login page, click "Forgot Password," and follow the instructions.</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Why was my account suspended?</strong>
                  <p>Check your email for details or contact support for further assistance.</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Why is my post not showing in the HomePage?</strong>
                  <p>Your post is probably not yet accepted by Admins.</p>
                </ListGroup.Item>
              </ListGroup>
            </div>
            
            {/* Finish Section */}
            <div ref={fin} className="mb-4">
              <h4>You're Done!</h4>
              <ListGroup>
                <ListGroup.Item>
                  <strong>Since you're new to Tradery</strong>
                  <p>Before you start Trading, We recommend you customize your profile first and change how people will see your profile. By clicking Done, this will redirect you to your profile in your dashboard where you can start editing.</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Wanna read this again?</strong>
                  <p>You can access this menu by going to the User Dashboard and clicking the Question button on the top right corner of the navigation bar.</p>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Container>
        </Col>
      </Row></Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onHide}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Tutorial;