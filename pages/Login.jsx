import '../src/main.css'
import React from 'react'
import Button from 'react-bootstrap/Button';
import { useAuth } from './lib/AuthHook';
import { Redirect } from 'wouter';

export default function LoginPage() {
  const { session } = useAuth();
  const { logIn } = useAuth();

  if (session) {
    return <Redirect to="#/Home" />
  }

  async function loginHandle() {
    await logIn();
  }
  return (
    <>
    <div class="logincontainer">
      <div class="circle">
        <img src="./images/favicon.png" alt></img>
      </div>
      <p class="LoginWord"> USER LOGIN </p>
      <div class="google-button">
        <Button class="login" variant="primary" size="lg" onClick={loginHandle}>Login with Google</Button>
      </div>
      <div>
        <p class="Use">By using this website, you confirm that you are a member of the University of the East and agree to use only a valid UE email address (@ue.edu.ph) for registration and access.</p>
        <p class="Proc"> By proceeding, you acknowledge and accept this condition.</p>
        <input type="checkbox" id="cb-login" class="CheckBox"></input>
      </div>
    </div>
    </>
  )
}