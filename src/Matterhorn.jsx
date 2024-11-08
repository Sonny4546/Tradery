import './main.css'

import { GoogleLogin } from '@react-oauth/google';

let login = 0;
let page = App

function App() {
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
        <GoogleLogin onSuccess={credentialResponse => {console.log(credentialResponse); login + 1;}}
        onError={() => {console.log('Login Failed');}}/>
      </div>
    </>
  )
}

function Homepage() {
  return (
    <>
    <nav class="menu-container">
            <input type="checkbox" aria-label="Toggle menu" />
            <span></span>
            <span></span>
            <span></span>
            
            <div class="menu">
            <ul>
                <li>
                <a href="#home">
                    Tradery
                </a>
                </li>
            </ul>
            <ul>
                <li>
                <a href="#signup">
                    Messages
                </a>
                </li>
                <li>
                <a href="#login">
                    User
                </a>
                </li>
            </ul>
            </div>
        </nav>
        <div class="Main" id="wrapper">
            <form>
                <i class="fa fa-search">
                </i>
                <input name="keyword" placeholder="Search for Items..."></input>
                <button type="submit">Search</button>
            </form>
        </div>
    </>
  )
}

if (login == 1){
  page = Homepage
}

export default page
