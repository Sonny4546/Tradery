import React from 'react'
import { useEffect, useState } from "react";
import { useAuth } from '../lib/AuthHook';
import { client, account, getUser } from "../lib/appwrite";
import { useNavigate } from 'react-router-dom';
import { Image, Button, Form } from 'react-bootstrap';

const Profile = () => { 
    const { session } = useAuth();
    const [user, setUser] = useState(null)
    useEffect(() => {
        const checkUser = async () => {
          try {
            const userData = await getUser()
            setUser(user)
            console.log(userData)
          } catch (error) {
            setUser(null)
          }
        }
    
        checkUser()
    }, [])

    function sendtoEdit() {
        return(
            <Redirect to="#/Dashboard/Profile/Edit" />
        )
    }

    // useEffect(() => {
    //     if (!session) {
    //         const navigate = useNavigate()
    //         return navigate('https://sonny4546.github.io/Tradery/')
    //       }
    // }, []);
    return(
        <>
        <div class="Main">
            <div class="container">
                <h1>Profile</h1>
                <Button class="editprf" type="Edit Profile" value="Edit Profile" onclick={sendtoEdit}/>
                <div class="inputprofile">
                    <Image src="holder.js/171x180" roundedCircle />
                </div>
                {user ? (
                <div className="container">
                    <div class="mb-3">
                        <p>{user.name}</p>
                    </div>
                    <div class ="mb-3">
                        <p>PROFILE SUMMARY</p>
                    </div>
                </div>
                ) : (
                <div className="container">
                    <div class="mb-3">
                        <p>PLACEHOLDER JOHN DOE</p>
                    </div>
                    <div class ="mb-3">
                        <p>PROFILE SUMMARY</p>
                    </div>
                </div>
                )}
            </div>
        </div>
        </>
    )
}
export default Profile