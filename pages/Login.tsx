import '../src/main.css'
import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import { useAuth } from './lib/AuthHook';
import { Redirect, useLocation } from 'wouter';

export default function LoginPage() {
  const { session } = useAuth();
  const [, navigate] = useLocation();
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
    await logIn();
  }
  return (
    <>
    <div className="logincontainer">
      <div className="circle">
        <img src="./images/favicon.png"></img>
      </div>
      <p className="LoginWord"> USER LOGIN </p>
      <div className="google-button">
        {isChecked && (
          <Button className="login" variant="primary" size="lg" id="btn" style={{margin: 0}} onClick={loginHandle}>Login with Google</Button>
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