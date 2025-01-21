import '../src/main.css'
import { Route, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect } from 'react'

// functions
export const loginWithGoogle = async () => {
  try {
    await account.createOAuth2Session(
      'google',
      'https://sonny4546.github.io/Tradery/#/Home',
      'https://sonny4546.github.io/Tradery');
  } catch (error) {
    console.error(error);
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    console.error(error);
  }
}


export default function LoginPage() {
  // const notice = () => {
  //   // Get the checkbox
  //   var checkBox = document.getElementById("condition");
  //   // Get the output text
  //   var google = document.getElementById("google");

  //   // If the checkbox is checked, display the output text
  //   if (checkBox.checked == true){
  //     google.style.display = "block";
  //   } else {
  //     google.style.display = "none";
  //   }
  // };

  return (
    <>
    <div class="logincontainer">
      <div class="circle"></div>
      <p> USER LOGIN </p>
      <div class="google-button">
        <div id="google">
          <div id="g_id_onload"
              data-client_id="1000212830777-k85n77vef4cbrma455a9ufpafl6sl316.apps.googleusercontent.com"
              data-context="signup"
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
              data-logo_alignment="left">
          </div>
        </div>
      </div>
      <input type="checkbox" id="condition" name="notice" onClick={notice()}></input>
      <label for="notice"> By using this website, you confirm that you are a member of the University of the East and agree to use only a valid UE email address (@ue.edu.ph) for registration and access.
By proceeding, you acknowledge and accept this condition.</label>
    </div>
    </>
  );
}