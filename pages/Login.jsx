import '../src/main.css'

import { GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  return (
    <>
    <div class="circle"></div>
    <div class="square">
      <div class="google-button">
        <GoogleLogin onSuccess={credentialResponse => {console.log(credentialResponse);}}
        onError={() => {console.log('Login Failed');}}/>
      </div>
        <input class="emBox" type="text" placeholder="Email"></input>
        <input class="psBox" type="text" placeholder="Password"></input>
      <p> USER LOGIN </p>
        <a href="#">Forgot Password?</a>
            <a class="cAcc" href="#">Create Account</a>
    </div>
    </>
  )
}
