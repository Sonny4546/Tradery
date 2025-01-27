import '../src/main.css'
import React from 'react'
import { Client, Account, OAuthProvider } from 'appwrite'
import Button from 'react-bootstrap/Button';
import { useAuth } from './AuthHook';
import { Redirect } from 'wouter';

const client = new Client()
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('678ba12f001dce105c6a')
export { OAuthProvider }

const account = new Account(client);

// functions
export const loginWithGoogle = async () => {
  try {
    await account.createOAuth2Session(
      OAuthProvider.Google,
      'https://sonny4546.github.io/Tradery/Home',
      'https://sonny4546.github.io/Tradery')
  } catch (error) {
    console.error(error)
  }
}

export const getUser = async () => {
  try {
    return await account.get()
  } catch (error) {
    console.error(error)
  }
}

export default function LoginPage() {
  const { session } = useAuth();

  // if (session) {
  //   return <Redirect to="#/Home" />
  // }
  return (
    <>
    <div class="logincontainer">
      <div class="circle">
        <img src="./images/favicon.png" alt></img>
      </div>
      <p class="LoginWord"> USER LOGIN </p>
      <div class="google-button">
        <Button class="login" variant="primary" size="lg" onClick={loginWithGoogle}>Login with Google</Button>
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