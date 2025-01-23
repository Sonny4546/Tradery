import React from 'react'
import Form from 'react-bootstrap/Form';

const Post = () => { 
    return(
        <>
        <div class="Main">
            <div class="container">
                <h1>Post Item</h1>
                <div class="uploader">
                    <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label>Large file input example</Form.Label>
                        <Form.Control type="file" size="lg" />
                    </Form.Group>
                </div>
                <div class="form-floating mb-3">
                    <Form.Control type="text" placeholder="Item Name" />
                </div>
                <Form.Group className="mb-3" controlId="Description.ControlTextarea1">
                    <Form.Label>Item Description</Form.Label>
                    <Form.Control as="textarea" rows={4} />
                </Form.Group>
            </div>
        </div>
        </>
    )
}
export default Post