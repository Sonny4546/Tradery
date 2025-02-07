import React from 'react'
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { useAuth } from '../lib/AuthHook';
import { createItems } from '../lib/Items';
import { client, account, getUser } from "../lib/appwrite";
import { useNavigate } from 'react-router-dom';
import { TraderyUser } from '../lib/GetUser';
import { fetchUserData } from '../lib/User';

function getCurrentDateString() {
    const date = new Date().getDate() //current date
    const month = new Date().getMonth() + 1 //current month
    const year = new Date().getFullYear() //current year
    const hours = new Date().getHours() //current hours
    const min = new Date().getMinutes() //current minutes
    const sec = new Date().getSeconds() //current seconds

    return date + '/' + month + '/' + year + '    ' +  hours + ':' + min + ':' + sec
}

const Post = () => {
    const { session } = useAuth();
    const navigate = useNavigate();
    const handleOnSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const user = await fetchUserData();
        if (!user) {
            console.log("User data is still loading. Please wait.");
            return;
        }

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
    
        const name = formData.get("name") as string | null;
        const description = formData.get("description") as string | null;
    
        if (!name || !description) {
            alert("Please fill in all required fields.");
            return;
        }
    
        try {
            const results = await createItems({
                name,
                author: user.name,
                description,
                date: new Date().toISOString()
            });
    
            navigate(`/Item/${results.items.$id}`);
        } catch (error) {
            console.error("Error creating item:", error);
        }
    };    
    return(
        <>
        <div className="Main">
            <div className="container">
                <h1>Post Item</h1>
                <form onSubmit={handleOnSubmit}>
                    <div className="uploader">
                        <Form.Group controlId="formFileLg" className="mb-3">
                            <Form.Label>Import Image</Form.Label>
                            <Form.Control type="file" size="lg" accept=".png, .jpg" />
                        </Form.Group>
                    </div>
                    <div className="mb-3">
                        <Form.Control id="name" name="name" type="text" placeholder="Name" required/>
                    </div>
                    <Form.Group className="mb-3" controlId="Description.ControlTextarea1">
                        <Form.Label>Item Description</Form.Label>
                        <Form.Control rows={4} id="description" name="description" placeholder="Description" required/>
                    </Form.Group>
                    <Button className="submitbtn" type="submit">Submit</Button>
                </form>
            </div>
        </div>
        </>
    )
}
export default Post