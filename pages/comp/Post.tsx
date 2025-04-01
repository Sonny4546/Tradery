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
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

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
    const [itemDescription, setDescription] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [attData, setAttData] = useState({
        color: "",
        weight: "",
        height: "",
        width: "",
        brand: "",
        condition: "New",
        category: "",
        usageInstructions: "",
    });

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

        const formattedString = `
Color: ${attData.color}
Weight: ${attData.weight} kg
Height: ${attData.height} cm
Width: ${attData.width} cm
Brand: ${attData.brand}
Condition: ${attData.condition}
Category: ${attData.category}
Usage Instructions: ${attData.usageInstructions}
  `.trim(); // Removes extra spaces at the start/end
    
        if (!name || !itemDescription || !itemCategory || !image) {
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
                description: formattedString + "\n\n" + itemDescription,
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
                description: formattedString + "\n\n" + itemDescription,
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

    const renderTooltip = (text) => <Tooltip id="tooltip">{text}</Tooltip>;
    
    const handleAttributeChange = (e) => {
        setAttData({ ...attData, [e.target.name]: e.target.value });
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
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                            <Form.Label>
                                <OverlayTrigger placement="right" overlay={renderTooltip("Specify the item's primary color.")}>
                                <span>Color 🎨</span>
                                </OverlayTrigger>
                            </Form.Label>
                            <Form.Control type="text" name="color" value={attData.color} onChange={handleAttributeChange} required />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                            <Form.Label>
                                <OverlayTrigger placement="right" overlay={renderTooltip("Enter the item's weight in kilograms.")}>
                                <span>Weight ⚖️</span>
                                </OverlayTrigger>
                            </Form.Label>
                            <Form.Control type="number" step="0.1" name="weight" value={attData.weight} onChange={handleAttributeChange} required />
                            </Form.Group>
                        </Col>
                        </Row>

                        <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                            <Form.Label>
                                <OverlayTrigger placement="right" overlay={renderTooltip("Enter the item's height in centimeters.")}>
                                <span>Height 📏</span>
                                </OverlayTrigger>
                            </Form.Label>
                            <Form.Control type="number" name="height" value={attData.height} onChange={handleAttributeChange} required />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                            <Form.Label>
                                <OverlayTrigger placement="right" overlay={renderTooltip("Enter the item's width in centimeters.")}>
                                <span>Width 📐</span>
                                </OverlayTrigger>
                            </Form.Label>
                            <Form.Control type="number" name="width" value={attData.width} onChange={handleAttributeChange} required />
                            </Form.Group>
                        </Col>
                        </Row>

                        <Form.Group className="mb-3">
                        <Form.Label>
                            <OverlayTrigger placement="right" overlay={renderTooltip("Enter the item's brand name (e.g., Nike, Samsung).")}>
                            <span>Brand 🏷️</span>
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Control type="text" name="brand" value={attData.brand} onChange={handleAttributeChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                        <Form.Label>
                            <OverlayTrigger placement="right" overlay={renderTooltip("Select the item's condition (New, Used, etc.).")}>
                            <span>Condition 🔄</span>
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Select name="condition" value={attData.condition} onChange={handleAttributeChange}>
                            <option value="New">New</option>
                            <option value="Used">Used</option>
                            <option value="Damaged">Damaged</option>
                        </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                        <Form.Label>
                            <OverlayTrigger placement="right" overlay={renderTooltip("Enter the category (e.g., Electronics, Clothing).")}>
                            <span>Category 📂</span>
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Control type="text" name="category" value={attData.category} onChange={handleAttributeChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                        <Form.Label>
                            <OverlayTrigger placement="right" overlay={renderTooltip("Enter any important usage instructions.")}>
                            <span>Usage Instructions 📝</span>
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Control as="textarea" rows={3} name="usageInstructions" value={attData.usageInstructions} onChange={handleAttributeChange} required />
                        </Form.Group>
                    <Form.Control className="mt-3" as="textarea" id="description" name="description" placeholder="Description" maxLength={500} value={itemDescription} onChange={(e) => setDescription(e.target.value)} required />
                    <p className="text-muted">Posting items that are harmful, sensual or offensive will lead to an unapproved item. Repeated offense may cause in a ban to the account.</p>
                    <Button className="w-100 mt-3" type="submit" disabled={loading}>Submit</Button>
                </form>
            </Card>
        </Container>
    );
};

export default Post;