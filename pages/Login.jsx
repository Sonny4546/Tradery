import '../src/main.css'
import { Route, useNavigate } from 'react-router-dom';

import { GoogleLogin } from '@react-oauth/google';


/*change auth logic later please it's not secure*/
export default function LoginPage() {

  const navigate = useNavigate();
  let IsAuthenticated = false;

  if (IsAuthenticated == true) {
    navigate("/Home");
  } else {
  return (
    <>
    <div class="circle"></div>
    <div class="logincontainer">
      <div class="google-button">
        <GoogleLogin onSuccess={credentialResponse => {console.log(credentialResponse);
          navigate("/Home");
          IsAuthenticated = true;
        }}
        onError={() => {console.log('Login Failed');
          IsAuthenticated = false;
        }}/>
      </div>
        <input class="emBox" type="text" placeholder="Email"></input>
        <input class="psBox" type="text" placeholder="Password"></input>
      <p> USER LOGIN </p>
        <a class="fp" href="#">Forgot Password?</a>
        <a class="cAcc" href="#">Create Account</a>
    </div>
    </>
  )
}
}
