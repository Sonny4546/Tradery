import React from 'react'
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { CheckSession } from '../Authenticate'
import Button from 'react-bootstrap/Button';

const Post = () => { 
    useEffect(() => {
        CheckSession();
    });
    return(
        <>
        <div class="Main">
            <div class="container">
                <h1>Post Item</h1>
                <div class="uploader">
                    <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label>Import Image</Form.Label>
                        <Form.Control type="file" size="lg" accept=".png, .jpg" />
                    </Form.Group>
                </div>
                <div class="form-floating mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"/>
                </div>
                <Form.Group className="mb-3" controlId="Description.ControlTextarea1">
                    <Form.Label>Item Description</Form.Label>
                    <Form.Control as="textarea" rows={4} />
                </Form.Group>
                <Button class="submitbtn" as="input" type="submit" value="Submit" />
            </div>
        </div>
        </>
    )
}
export default Post