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
      'https://sonny4546.github.io/Tradery')
  } catch (error) {
    console.error(error)
  }
}

export const logoutUser = async () => {
  try {
    await account.deleteSession('current')
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
  notice = () => {
    // Get the checkbox
    var checkBox = document.getElementById("condition");
    // Get the output text
    var google = document.getElementById("text");

    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
      google.style.display = "block";
    } else {
      google.style.display = "none";
    }
  }

  return (
    <>
    <div class="logincontainer">
      <div class="circle"></div>
      <p> USER LOGIN </p>
      <div class="google-button">
        <div id="google">
        <GoogleLogin onSuccess={credentialResponse => {console.log(credentialResponse);
          navigate("/Home");}}onError={() => {console.log('Login Failed');}}/>
        </div>
      </div>
      <input type="checkbox" id="condition" name="notice" onClick={notice()}></input>
      <label for="notice"> By using this website, you confirm that you are a member of the University of the East and agree to use only a valid UE email address (@ue.edu.ph) for registration and access.
By proceeding, you acknowledge and accept this condition.</label>
    </div>
    </>
  )
}