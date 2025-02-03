import React from 'react'
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { useAuth } from '../lib/AuthHook';
import { useLocation } from 'react-router-dom';
import { createItems } from '../lib/Items';
import { client, account, getUser } from "../lib/appwrite";

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
    const { navigate } = useLocation();
    const [user, setUser] = useState(null)
    // useEffect(() => {
    //     const checkUser = async () => {
    //       try {
    //         const userData = await getUser()
    //         setUser(user)
    //         console.log(userData)
    //       } catch (error) {
    //         setUser(null)
    //       }
    //     }
    
    //     checkUser()
    // }, [])
    async function handleOnSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        const target = e.target as typeof e.target & {
          name: { value: string };
          author: { value: string };
          description: { value: string };
          date: { value: string };
        }
        const results = await createItems({
          name: target.name.value,
          author: "None",
          description: target.description.value,
          date: new Date().toISOString()
        })
        navigate(`/event/${results.items.$id}`);
      }
    return(
        <>
        <div className="Main">
            <div className="container">
                <h1>Post Item</h1>
                <div className="uploader">
                    <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label>Import Image</Form.Label>
                        <Form.Control type="file" size="lg" accept=".png, .jpg" />
                    </Form.Group>
                </div>
                <div className="mb-3">
                    <Form.Control id="name" type="text" placeholder="Name"/>
                </div>
                <Form.Group className="mb-3" controlId="Description.ControlTextarea1">
                    <Form.Label>Item Description</Form.Label>
                    <Form.Control id="description" as="textarea" rows={4} />
                </Form.Group>
                <Button className="submitbtn" as="input" type="submit" value="Submit" onClick={handleOnSubmit} />
            </div>
        </div>
        </>
    )
}
export default Post