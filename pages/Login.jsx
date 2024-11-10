import '../src/main.css'
import { Route, useNavigate } from 'react-router-dom';

import { GoogleLogin } from '@react-oauth/google';


/*change auth logic later please it's not secure*/
export default function LoginPage() {

  const navigate = useNavigate();
  let IsAuthenticated = False;

  if (IsAuthenticated == True) {
    <navigate to="/Home" />
  };
  return (
    <>
    <div class="circle"></div>
    <div class="logincontainer">
      <div class="google-button">
        <GoogleLogin onSuccess={credentialResponse => {console.log(credentialResponse);
          navigate("/Home");
          IsAuthenticated = True;
        }}
        onError={() => {console.log('Login Failed');
          IsAuthenticated = False;
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
