import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useAuth } from './lib/AuthHook';
import { useNavigate } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Please check the notice below to continue..
    </Tooltip>
  );
  const { session } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (session) {
        navigate(`/Home`);
    }
  }, [session, navigate]);
  const [isChecked, setIsChecked] = useState(false);

  function checkbx(event: React.ChangeEvent<HTMLInputElement>) {
    switch (event.target.checked) {
      case true:
        setIsChecked(true);
        break;
      case false:
        setIsChecked(false);
        break;
      default:
        break;
    }

  }
  const { logIn } = useAuth();
  async function loginHandle() {
    setLoading(true); // Show loading modal
    await logIn();
    setLoading(false); // Hide modal after login
  }
  return (
    <>
    <Modal show={loading} centered backdrop="static">
        <Modal.Body className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Logging in, please wait...</p>
        </Modal.Body>
    </Modal>
    <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>1. User Responsibility <br/> By using this platform, you acknowledge that all interactions and transactions between users are conducted at your own risk. We do not take responsibility for any disputes, agreements, or exchanges made between users. It is your responsibility to exercise caution and ensure the legitimacy of the items and users you engage with.<br/><br/>

2. Privacy and Message Monitoring <br/> We respect your privacy and do not monitor or view private messages exchanged between users during transactions. However, all accounts are recorded in our system for security and compliance purposes.<br/><br/>

3. Item Posting and Review<br/>All items posted on the platform are subject to review by an administrator. We reserve the right to remove or reject any listings that contain inappropriate, illegal, or prohibited content. Users are encouraged to adhere to ethical and legal guidelines when posting items.<br/><br/>

4. Violations and Account Management<br/>Users who repeatedly violate our guidelines by posting inappropriate content or engaging in prohibited activities may face account restrictions, suspensions, or permanent deletion. We reserve the right to take appropriate actions to maintain the integrity of the platform.<br/><br/>

5. Disclaimer of Liability<br/>We do not guarantee the quality, safety, legality, or authenticity of the items listed on the platform. The website serves only as a medium for users to connect and trade, and we do not take responsibility for any losses, damages, or issues arising from trades or interactions.<br/><br/>

6. Amendments and Changes<br/>We reserve the right to update or modify these Terms and Conditions at any time. Users are responsible for staying informed about any changes. Continued use of the platform signifies your acceptance of the updated terms.<br/><br/>

By using this platform, you agree to abide by these Terms and Conditions and ensure that your activities align with our community standards.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>Okay</Button>
        </Modal.Footer>
    </Modal>
    <div className="logincontainer">
      <div className="circle">
        <img src="./images/favicon.png"></img>
      </div>
      <p className="LoginWord"> USER LOGIN </p>
      <div className="google-button">
        {isChecked && (
          <Button className="login" variant="primary" size="lg" id="btn" style={{margin: 0}} onClick={loginHandle} disabled={loading}>Login with Google</Button>
        )}
        {!isChecked && (
          <OverlayTrigger
          placement="bottom"
          delay={{ show: 0, hide: 400 }}
          overlay={renderTooltip}
          >
            <div>
              <Button className="login" variant="primary" size="lg" id="btn" style={{margin: 0}} disabled>Login with Google</Button>
            </div>
          </OverlayTrigger>
        )}
      </div>
      <div>
        <p className="Use">By using this website, you confirm that you are a member of the University of the East and agree to use only a valid UE email address (@ue.edu.ph) for registration and access.</p>
        <p className="Proc"> By proceeding, you acknowledge and accept this condition.</p>
        <input type="checkbox" id="cb-login" className="CheckBox" onChange={checkbx}></input>
        <p 
            className="terms-text text-primary fw-bold" 
            style={{ cursor: "pointer", textDecoration: "underline", position: "absolute", bottom: "0%", left: "30%" }} 
            onClick={handleOpen}
        >
            Terms and Conditions
        </p>
      </div>
    </div>
    </>
  )
}