import '../src/main.css'

import { GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  return (
    <>
    <div class="LogContain">
    <div class="Box"> 
      <div class="Logo"></div>
      <h2 class="user">USER LOGIN</h2>
        <input class="email" type="text" placeholder="Email Address"></input>
      </div>
        <input class="pass" type="text" placeholder="User Password"></input>
      </div>
      <a href="#" className="forgot-password">Forgot Password?</a>
      <div class="google-button">
        <GoogleLogin onSuccess={credentialResponse => {console.log(credentialResponse);}}
        onError={() => {console.log('Login Failed');}}/>
      <a href="#" className="create-account">Create New Account</a>
      </div>
    </>
  )
}
