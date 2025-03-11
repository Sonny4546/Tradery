import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Post = () => {
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

    const parameterTooltips = {
        Condition: "Is it new or worn out?",
        Usefulness: "How useful is the item in daily life?",
        BrandValue: "Is it from a well-known or high-quality brand?",
        Demand: "Are people currently looking to buy this item?",
        Rarity: "Is it hard to find or a collector’s item?",
        AgeDepreciation: "Does it lose value over time? (Higher = holds value)",
        ResaleValue: "Can you sell it for a good price?",
        ReplacementCost: "How expensive is a new one?",
    };

    const handleParameterChange = (key: string, value: number) => {
        setParameters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <Container className="mt-4">
            <Card className="p-4 shadow">
                <h1 className="text-center">Post Item</h1>

                <h5 className="mt-4">Item Parameters</h5>
                <Row className="row-cols-2">
                    {Object.entries(parameters).map(([key, value]) => (
                        <Col key={key} className="mb-3">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>{parameterTooltips[key]}</Tooltip>}
                            >
                                <Form.Label>{key.replace(/([A-Z])/g, " $1").trim()}</Form.Label>
                            </OverlayTrigger>

                            {/* Tooltip on Hover (Displays Current Value) */}
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>{value}/10</Tooltip>}
                            >
                                <div className="slider-container">
                                    <Form.Range
                                        min={1}
                                        max={10}
                                        value={value}
                                        onChange={(e) => handleParameterChange(key, parseInt(e.target.value))}
                                        className="custom-slider"
                                    />
                                </div>
                            </OverlayTrigger>
                        </Col>
                    ))}
                </Row>

                <Button className="w-100 mt-3">Submit</Button>
            </Card>

            <style>{`
                .custom-slider {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 8px;
                    background: red; /* 🔴 Make track red */
                    border-radius: 5px;
                    outline: none;
                    transition: 0.2s;
                }

                .custom-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    background: blue; /* 🔵 Make thumb blue */
                    border-radius: 50%;
                    cursor: pointer;
                }

                .custom-slider::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    background: blue;
                    border-radius: 50%;
                    cursor: pointer;
                }
            `}</style>
        </Container>
    );
};

export default Post;