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
  return (
    <>
    <div class="logincontainer">
      <div class="circle"></div>
      <p class="LoginWord"> USER LOGIN </p>
      <div class="google-button">
        <GoogleLogin onSuccess={credentialResponse => {console.log(credentialResponse);
                useNavigate("/Home");}}onError={() => {console.log('Login Failed');useNavigate("");}}/>
      </div>
      <p class="Use">By using this website, you confirm that you are a member of the University of the East and agree to use only a valid UE email address (@ue.edu.ph) for registration and access.</p>
      <p class="Proc"> By proceeding, you acknowledge and accept this condition.</p>
      <input type="checkbox" class="CheckBox"></input>
    </div>
    </>
  )
}