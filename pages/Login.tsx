import '../src/main.css'
import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import { useAuth } from './lib/AuthHook';
import { useNavigate } from 'react-router-dom';

import { auth, db } from "./lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


export default function LoginPage() {
  const { session } = useAuth();
  const navigate = useNavigate();
  if (session) {
    navigate(`/Home`);
  }
  const [isChecked, setIsChecked] = useState(false);

  function checkbx(event: React.ChangeEvent<HTMLInputElement>) {
    switch (event.target.checked) {
      case true:
        setIsChecked(true);
        break;
      case false:
        setIsChecked(false);
        break;
      default:
        break;
    }
  // }
  // const { logIn } = useAuth();
  // async function loginHandle() {
  //     await logIn();
  // }
  }
  const { logIn } = useAuth();
  async function loginHandle() {
    try {
      await logIn();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        id: user.uid,
        email: user.email,
        username: user.displayName || "New User",
        createdAt: new Date(),
        blocked: [],
      });
      await setDoc(doc(db, "userchats", user.uid), {
        chats: [],
      });
    }
  } catch (error) {
    console.error("Login error:", error);
  }
}

      
    

  
  return (
    <>
    <div className="logincontainer">
      <div className="circle">
        <img src="./images/favicon.png"></img>
      </div>
      <p className="LoginWord"> USER LOGIN </p>
      <div className="google-button">
        {isChecked && (
          <Button className="login" variant="primary" size="lg" id="btn" style={{margin: 0}} onClick={loginHandle}>Login with Google</Button>
        )}
      </div>
      <div>
        <p className="Use">By using this website, you confirm that you are a member of the University of the East and agree to use only a valid UE email address (@ue.edu.ph) for registration and access.</p>
        <p className="Proc"> By proceeding, you acknowledge and accept this condition.</p>
        <input type="checkbox" id="cb-login" className="CheckBox" onChange={checkbx}></input>
      </div>
    </div>
    </>
  )
}