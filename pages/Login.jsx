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
    <div class="circle"></div>
    <div class="logincontainer">
      <div class="google-button">
        <GoogleLogin onSuccess={credentialResponse => {console.log(credentialResponse);
          navigate("/Home");}}onError={() => {console.log('Login Failed');}}/>
      </div>
      <p> USER LOGIN </p>
    </div>
    </>
  )
}