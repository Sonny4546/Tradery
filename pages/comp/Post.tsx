import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { createItems, updateItem } from "../lib/Items";
import { fetchUserData } from "../lib/User";
import { uploadFile } from "../lib/storage";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

interface TraderyImage {
    height: number;
    file: File;
    width: number;
    previewUrl: string;
}

const Post = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState<TraderyImage | null>(null);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<string | null>(null);

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];

        if (file.size > 5 * 1024 * 1024) {
            setError("File size must be 5MB or less.");
            return;
        }
        setError(null);

        const img = new window.Image();
        const previewUrl = URL.createObjectURL(file);
        img.onload = function () {
            setImage({
                height: img.height,
                file: file,
                width: img.width,
                previewUrl: previewUrl,
            });
        };
        img.src = previewUrl;
    }

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
    
        const formData = new FormData(e.currentTarget);
        const itemCategory = formData.get("itemCategory") as string;
    
        if (!name || !description || !itemCategory || !image) {
            setError("Please fill in all fields.");
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
    
            // ✅ Convert parameters to a JSON string
            const results = await createItems({
                name,
                authorID: user.$id,
                description,
                date: new Date().toISOString(),
                imageHeight: image.height,
                imageFileId: "", // Placeholder, updated after upload
                imageWidth: image.width,
                isApproved: false,
                itemCategory
            });
    
            if (!results || !results.items || !results.items.$id) {
                throw new Error("Failed to create item. No ID returned.");
            }
    
            let imageFileId = "";
            if (image.file) {
                console.log("Uploading image...");
                const uploadedFile = await uploadFile(image.file);
    
                if (!uploadedFile || !uploadedFile.$id) {
                    throw new Error("Image upload failed.");
                }
    
                imageFileId = uploadedFile.$id;
            }
    
            // ✅ Update item with proper attributes
            await updateItem(results.items.$id, {
                imageFileId,
                imageHeight: image.height,
                imageWidth: image.width,
                name,
                description,
                authorID: user.$id,
                date: new Date().toISOString(),
                isApproved: false,
                itemCategory,
            });
    
            console.log("Item created and updated successfully.");
            navigate(`/Item/${results.items.$id}`);
        } catch (error) {
            console.error("Error creating or updating item:", error);
            alert("Failed to create item. Please try again.");
        } finally {
            setLoading(false);
        }
    };    

    return (
        <Container className="mt-4">
            {loading && (
                <div className="overlay">
                    <div className="overlay-content">
                        <p>Please wait... Creating Tradery Item</p>
                    </div>
                </div>
            )}

            <Card className="p-4 shadow">
                <h1 className="text-center">Post Item</h1>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleOnSubmit} autoComplete="off">
                    <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label>Import Image (Max: 5MB)</Form.Label>
                        <Form.Control
                            type="file"
                            size="lg"
                            accept=".png, .jpg"
                            onChange={handleOnChange}
                            required
                        />
                    </Form.Group>
                    {image && (
                        <Image src={image.previewUrl} alt="Preview" className="mb-3" fluid rounded />
                    )}
                    <FloatingLabel controlId="floatingSelect" label="Category">
                        <Form.Select id="itemCategory" name="itemCategory" required>
                            <option value="" disabled>Select a Category...</option>
                            <option value="a">School Supplies</option>
                            <option value="b">Clothing</option>
                            <option value="c">Entertainment/Hobbies</option>
                            <option value="d">Gaming/Technology</option>
                            <option value="e">Fashion Accessories</option>
                            <option value="f">Sports & Outdoor</option>
                        </Form.Select>
                    </FloatingLabel>
                    <Form.Control className="mt-3" id="name" name="name" type="text" placeholder="Name" maxLength={40} value={name} onChange={(e) => setName(e.target.value)} required />
                    <Form.Control className="mt-3" as="textarea" id="description" name="description" placeholder="Description" maxLength={500} value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <Button className="w-100 mt-3" type="submit" disabled={loading}>Submit</Button>
                </form>
            </Card>
        </Container>
    );
};

export default Post;