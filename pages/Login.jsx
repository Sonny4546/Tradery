import '../src/main.css'
import React, { useState, useEffect } from 'react'
import { Account, OAuthProvider } from '../src/appwrite'

// functions
export const loginWithGoogle = async () => {
  try {
    await Account.createOAuth2Session(
      'google',
      'https://sonny4546.github.io/Tradery/#/Home',
      'https://sonny4546.github.io/Tradery')
  } catch (error) {
    console.error(error)
  }
}

export const logoutUser = async () => {
  try {
    await Account.deleteSession('current')
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
  return (
    <>
    <div class="logincontainer">
      <div class="circle"></div>
      <p class="LoginWord"> USER LOGIN </p>
      {/* <div class="google-button">
        <GoogleLogin onSuccess={credentialResponse => {console.log(credentialResponse);
                useNavigate("/Home");}}onError={() => {console.log('Login Failed');useNavigate("");}}/>
      </div> */}
      <div class="google-button">
        {/* <div id="g_id_onload"
            data-client_id="1000212830777-k85n77vef4cbrma455a9ufpafl6sl316.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-login_uri="https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/678ba12f001dce105c6a"
            data-auto_prompt="false">
        </div>
        <div class="g_id_signin"
            data-type="standard"
            data-shape="pill"
            data-theme="outline"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left"
            data-width="320">
        </div> */}
        <button onClick={loginWithGoogle}>Login with Google</button>
      </div>
      <p class="Use">By using this website, you confirm that you are a member of the University of the East and agree to use only a valid UE email address (@ue.edu.ph) for registration and access.</p>
      <p class="Proc"> By proceeding, you acknowledge and accept this condition.</p>
      <input type="checkbox" class="CheckBox"></input>
    </div>
    </>
  )
}