import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuth } from "../lib/AuthHook";
import { createItems, updateItem } from "../lib/Items";
import { fetchUserData } from "../lib/User";
import { uploadFile } from "../lib/storage";
import { useNavigate } from "react-router-dom";

interface TraderyImage {
    height: number;
    file: File;
    width: number;
}

const Post = () => {
    const { session } = useAuth();
    const navigate = useNavigate();
    const [image, setImage] = useState<TraderyImage>();
    const [loading, setLoading] = useState(false); // 🔹 Controls overlay visibility

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const img = new Image();

        img.onload = function () {
            setImage({
                height: img.height,
                file: file,
                width: img.width,
            });
        };

        img.src = URL.createObjectURL(file);
    }

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); // Show overlay
    
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
    
        if (!name || !description) {
            alert("Please fill in all fields.");
            setLoading(false);
            return;
        }
    
        try {
            const user = await fetchUserData();
            if (!user) {
                console.log("User data is still loading. Please wait.");
                setLoading(false);
                return;
            }
    
            // Create item without image first
            const results = await createItems({
                name,
                author: user.name,
                authorID: user.$id,
                description,
                date: new Date().toISOString(),
                imageHeight: image?.height ?? 100,
                imageFileId: "",
                imageWidth: image?.width ?? 100,
                isApproved: false,
            });
    
            console.log("Item created successfully:", results.items);
    
            if (image?.file) {
                console.log("Uploading image...");
                const file = await uploadFile(image.file);
    
                await updateItem(results.items.$id, {
                    imageFileId: file?.$id,
                    imageHeight: image?.height,
                    imageWidth: image?.width,
                    name: "",
                    author: "",
                    authorID: "",
                    date: "",
                    description: "",
                    isApproved: false,
                });
    
                console.log("Image uploaded successfully:", file.$id);
            }
    
            navigate(`/Item/${results.items.$id}`);
        } catch (error) {
            console.error("Error creating item:", error);
            alert("Failed to create item. Please try again.");
        } finally {
            setLoading(false); // Hide overlay
        }
    };    

    return (
        <>
            {/* 🔹 Overlay for loading state */}
            {loading && (
                <div className="overlay">
                    <div className="overlay-content">
                        <p>Please wait... Creating Tradery Item</p>
                    </div>
                </div>
            )}

            <div className="Main">
                <div className="container">
                    <h1>Post Item</h1>
                    <form onSubmit={handleOnSubmit}>
                        <div className="uploader">
                            <Form.Group controlId="formFileLg" className="mb-3">
                                <Form.Label>Import Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    size="lg"
                                    accept=".png, .jpg"
                                    onChange={handleOnChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <Form.Control id="name" name="name" type="text" placeholder="Name" required />
                        </div>
                        <Form.Group className="mb-3" controlId="Description.ControlTextarea1">
                            <Form.Label>Item Description</Form.Label>
                            <Form.Control rows={4} as="textarea" id="description" name="description" placeholder="Description" required />
                        </Form.Group>
                        <Button className="submitbtn" type="submit" disabled={loading}>
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Post;