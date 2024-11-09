import '../src/main.css'

import { GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  return (
    <>
      <h3 class="user">User Login</h3>
      <div class="email_input">
        <label>Enter Email Address</label>
        <input class="email" type="text" placeholder="Email Address"></input>
      </div>
      <div class="pass_input">
        <label>Enter User Password</label>
        <input class="pass" type="text" placeholder="User Password"></input>
      </div>
      <div class="google-button">
        <GoogleLogin onSuccess={credentialResponse => {console.log(credentialResponse);}}
        onError={() => {console.log('Login Failed');}}/>
      </div>
    </>
  )
}
