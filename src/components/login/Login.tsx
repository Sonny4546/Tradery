// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "../../../pages/lib/firebase";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import { findUserDataById, updateUserData } from "../../lib/appwrite";
// import { TraderyProfiles } from "../../lib/appwrite";
// import { toast } from "react-toastify";
// import React from "react";

// const Login = () => {
//     const { id } = useParams(); // Get Appwrite user ID from the URL
//     const [loading, setLoading] = useState(false);

    

//     return (
//         <div className="login">
//             {loading ? <div>Loading...</div> : <div>Welcome to Tradery Messenger!</div>}
//         </div>
//     );
// };

// export default Login;