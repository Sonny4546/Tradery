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
import { uploadFile } from '../lib/storage'

interface TraderyImage {
    height: number;
    file: File;
    width: number;
}

const Post = () => {
    const { session } = useAuth();
    const navigate = useNavigate();
    const [image, setImage] = useState<TraderyImage>();

    function handleOnChange(e: React.FormEvent<HTMLFormElement>) {
        const target = e.target as HTMLInputElement & {
            files: FileList;
        }

        const img = new Image();

        img.onload = function(){
            setImage({
                height: img.height,
                file: target.files[0],
                width: img.width
            })
        }

        img.src = URL.createObjectURL(target.files[0])
    }

    const handleOnSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const user = await fetchUserData();
        if (!user) {
            console.log("User data is still loading. Please wait.");
            return;
        }

        const target = e.target as typeof e.target & {
            name: { value: string };
            description: { value: string };
        }
        
        let file;
    
        if ( image?.file ) {
        file = await uploadFile(image.file);
        }

        try {
            const results = await createItems({
                name: target.name.value,
                author: user.name,
                authorID: user.$id,
                description: target.description.value,
                date: new Date().toISOString(),
                imageHeight: image?.height ?? 100,
                imageFileId: file?.$id,
                imageWidth: image?.width ?? 100,
                requests: null
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
                            <Form.Control type="file" size="lg" accept=".png, .jpg" onChange={handleOnChange} required/>
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