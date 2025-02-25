import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useAuth } from './lib/AuthHook';
import { useNavigate } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Please check the notice below to continue..
    </Tooltip>
  );
  const { session } = useAuth();
  const navigate = useNavigate();
  if (session) {
    navigate(`/Home`);
  }
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
          placement="right"
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
      </div>
    </div>
    </>
  )
}