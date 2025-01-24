import React from 'react'
import { useState, useEffect } from "react";
import { getUsername } from './GetUser';
import { sessioncheck } from '../Authenticate'

const Profile = () => { 
    useEffect(() => {
          sessioncheck();
          getUsername;
    });
    return(
        <>
        <div class="Main">
            <div class="container">
                <h1>Edit Profile</h1>
                <div class="inputprofile">
                    <p>Upload an image: accepts jpg and png only</p>
                    <input type="file" accept=".png, .jpg"></input>
                </div>
                <div class="form-floating mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="name"/>
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