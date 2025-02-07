import React from 'react'
import { useEffect, useState } from "react";
import { useAuth } from '../lib/AuthHook';
import { client, account, getUser } from "../lib/appwrite";
import { useNavigate } from 'react-router-dom';
import { Image, Button, Form } from 'react-bootstrap';
import { TraderyUser } from '../lib/GetUser';

const Profile = () => { 
    const { session } = useAuth();
    const [user, setUser] = useState<TraderyUser | undefined>()
    useEffect(() => {
        const checkUser = async () => {
          try {
            const userData = await getUser()
            setUser(userData)
            console.log(userData)
          } catch (error) {
            setUser(undefined)
          }
        }
    
        checkUser()
    }, [])

    const sendtoEdit = () => {
        useNavigate("/Dashboard/Profile/Edit");
    };

    return (
        <div className="Main">
            <div className="container">
                <h1>Profile</h1>
                <Button className="editprf btn btn-primary mb-3" onClick={sendtoEdit}>
                    Edit Profile
                </Button>
                <div className="inputprofile">
                    <Image src="https://raw.githubusercontent.com/Sonny4546/OurFavoriteArtist/2b20d35e16c25397593d98943c14072b56aa9cbb/images/about.jpg" roundedCircle width={180} height={180} />
                </div>
                {user ? (
                    <div className="container">
                        <div className="mb-3">
                            <p>{user.name}</p>
                        </div>
                        <div className="mb-3">
                            <p>PROFILE SUMMARY</p>
                        </div>
                    </div>
                ) : (
                    <div className="container">
                        <div className="mb-3">
                            <p>PLACEHOLDER JOHN DOE</p>
                        </div>
                        <div className="mb-3">
                            <p>PROFILE SUMMARY</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;