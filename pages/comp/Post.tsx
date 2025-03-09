import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
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
    const [error, setError] = useState<string | null>(null);

    // Parameters state (default to 5)
    const [parameters, setParameters] = useState({
        Condition: 5,
        Usefulness: 5,
        BrandValue: 5,
        Demand: 5,
        Rarity: 5,
        AgeDepreciation: 5,
        ResaleValue: 5,
        ReplacementCost: 5,
    });

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];

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

    const handleParameterChange = (key: string, value: number) => {
        setParameters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

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

        // Validate that all parameters are set
        for (const key in parameters) {
            if (parameters[key as keyof typeof parameters] < 1 || parameters[key as keyof typeof parameters] > 10) {
                setError("All parameters must be between 1 and 10.");
                setLoading(false);
                return;
            }
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
                parameters, 
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
                    parameters, 
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

    // Tooltips for parameters
    const parameterTooltips: { [key: string]: string } = {
        Condition: "Is it new or worn out?",
        Usefulness: "How useful is the item in daily life?",
        BrandValue: "Is it from a well-known or high-quality brand?",
        Demand: "Are people currently looking to buy this item?",
        Rarity: "Is it hard to find or a collector’s item?",
        AgeDepreciation: "Does it lose value over time? (Higher = holds value)",
        ResaleValue: "Can you sell it for a good price?",
        ReplacementCost: "How expensive is a new one?",
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
                                    <option value="e">Fashion Accessories</option>
                                    <option value="f">Sports & Outdoor</option>
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
                        <h5>Item Parameters</h5>
                        {Object.entries(parameters).map(([key, value]) => (
                            <Form.Group key={key} className="mb-3">
                                <OverlayTrigger placement="top" overlay={<Tooltip>{parameterTooltips[key]}</Tooltip>}>
                                    <Form.Label>{key.replace(/([A-Z])/g, " $1").trim()}</Form.Label>
                                </OverlayTrigger>
                                <Form.Range
                                    min={1}
                                    max={10}
                                    value={value}
                                    onChange={(e) => handleParameterChange(key, parseInt(e.target.value))}
                                    required
                                />
                                <Form.Control
                                    type="number"
                                    min={1}
                                    max={10}
                                    value={value}
                                    onChange={(e) => handleParameterChange(key, parseInt(e.target.value))}
                                    required
                                />
                            </Form.Group>
                        ))}

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