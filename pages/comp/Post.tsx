import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
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
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<string | null>(null); // Store validation errors

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];

        // ✅ Check image size limit (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError("File size must be 5MB or less.");
            return;
        }
        setError(null);

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
        setLoading(true);
    
        const formData = new FormData(e.currentTarget);
        const itemCategory = formData.get("itemCategory") as string;

        if (!name || !description || !itemCategory) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            const user = await fetchUserData();
            if (!user) {
                console.log("User data is still loading. Please wait.");
                return;
            }

            const results = await createItems({
                name,
                authorID: user.$id,
                description,
                date: new Date().toISOString(),
                imageHeight: image?.height ?? 100,
                imageFileId: "",
                imageWidth: image?.width ?? 100,
                isApproved: false,
                itemCategory,
            });

            console.log("Item created successfully:", results.items);

            if (image?.file) {
                console.log("Uploading image...");
                const file = await uploadFile(image.file);

                await updateItem(results.items.$id, {
                    imageFileId: file?.$id,
                    imageHeight: image?.height,
                    imageWidth: image?.width,
                    name,
                    description,
                    authorID: user.$id,
                    date: new Date().toISOString(),
                    isApproved: false,
                    itemCategory,
                });

                console.log("Image uploaded successfully:", file.$id);
            }

            navigate(`/Item/${results.items.$id}`);
        } catch (error) {
            console.error("Error creating item:", error);
            alert("Failed to create item. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
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
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <form onSubmit={handleOnSubmit} autoComplete="off">
                        <div className="uploader">
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
                        </div>
                        <div className="mb-3">
                            <FloatingLabel controlId="floatingSelect" label="Category">
                                <Form.Select className="itemCategory" id="itemCategory" name="itemCategory" required>
                                    <option value="" disabled>Select a Category...</option>
                                    <option value="a">School Supplies</option>
                                    <option value="b">Clothing</option>
                                    <option value="c">Entertainment/Hobbies</option>
                                    <option value="d">Gaming/Technology</option>
                                    <option value="e">Accessories</option>
                                    <option value="f">Miscellaneous</option>
                                </Form.Select>
                            </FloatingLabel>
                        </div>
                        <div className="mb-3">
                            <Form.Control
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Name"
                                maxLength={40} // ✅ Limit to 40 characters
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <small>{name.length}/40</small>
                        </div>
                        <Form.Group className="mb-3" controlId="Description.ControlTextarea1">
                            <Form.Label>Item Description</Form.Label>
                            <Form.Control
                                rows={4}
                                as="textarea"
                                id="description"
                                name="description"
                                placeholder="Description"
                                maxLength={500} // ✅ Limit to 500 characters
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                            <small>{description.length}/500</small>
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