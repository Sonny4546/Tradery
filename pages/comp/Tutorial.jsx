import { useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function LeftTabsExample() {
  const [isOpen, setIsOpen] = useState(true); //This is for close button thingy
  const tradingRef = useRef(null);
  const uploadRef = useRef(null);
  const faqRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" }); //scroll thingy
  };

  if (!isOpen) return null; //close button thingy

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        background: "rgba(255, 255, 255, 0.95)",
        boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.3)",
        padding: "20px",
        borderRadius: "12px",
        width: "60%",
        maxWidth: "800px",
      }}
    >
      {/* This is Close Button */}
      <Button
        onClick={() => setIsOpen(false)}
        variant="danger"
        size="sm"
        style={{
          position: "absolute",
          top: "3px",
          right: "14px",
          borderRadius: "50%",
          width: "25px",
          height: "25px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ❌
      </Button>

      <Row className="mt-2">
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
                  <p>Your post is probably not accepted by Admins.</p>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default LeftTabsExample;
