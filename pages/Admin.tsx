import '../src/main.css'
import React from 'react'
import Button from 'react-bootstrap/Button';
import { useAuth } from './lib/AuthHook';
import { Redirect } from 'wouter';

export default function LoginPage() {
  const { session } = useAuth();
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
        <Button className="login" variant="primary" size="lg" onClick={loginHandle}>Login with Google</Button>
      </div>
      <div>
        <p className="Use">By using this website, you confirm that you are a member of the University of the East and agree to use only a valid UE email address (@ue.edu.ph) for registration and access.</p>
        <p className="Proc"> By proceeding, you acknowledge and accept this condition.</p>
        <input type="checkbox" id="cb-login" className="CheckBox"></input>
      </div>
    </div>
    </>
  )
}