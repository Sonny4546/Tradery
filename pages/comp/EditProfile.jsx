import React from 'react'
import { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../lib/AuthHook';
import { useNavigate } from 'react-router-dom';

const Profile = () => { 
    const { session } = useAuth();
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
                <h1>Edit Profile</h1>
                <div class="inputprofile">
                    <input type="file" accept=".png, .jpg"></input>
                    <p>Upload an image: accepts jpg and png only</p>
                </div>
                <div class="mb-3">
                    <Form.Control type="text" placeholder="Name"/>
                </div>
                <Form.Group className="mb-3" controlId="Description.ControlTextarea1">
                    <Form.Label>Profile Summary</Form.Label>
                    <Form.Control as="textarea" rows={2} />
                </Form.Group>
                <Button class="submitbtn" as="input" type="submit" value="Submit" />
            </div>
        </div>
        </>
    )
}
export default Profile