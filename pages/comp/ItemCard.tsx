import React from 'react';
import { Card, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import TimeAgo from 'react-timeago'

interface ItemCardProps {
    name: string;
    date: string;
    image?: {
        height: number;
        url: string;
        width: number;
    }
    author: string;
}

const parameterDescriptions = {
    Condition: "Is it new or worn out?",
    Usefulness: "How useful is the item in daily life?",
    BrandValue: "Is it from a well-known or high-quality brand?",
    Demand: "Are people currently looking to buy this item?",
    Rarity: "Is it hard to find or a collector’s item?",
    AgeDepreciation: "Does it lose value over time? (Higher = holds value)",
    ResaleValue: "Can you sell it for a good price?",
    ReplacementCost: "How expensive is a new one?"
};

export const ItemCard = ({ name, date, author, image }: ItemCardProps) => {
    return (
        <Card className="itemcontent" style={{ width: '100%', height: '100%' }}>
            <div style={{ height: '200px', overflow: 'hidden' }}>
                {image?.url && (
                <>
                <Card.Img className="Card-Image" variant="top"
                        width={image.width && (100)}
                        height={image.height && (100)}
                        src={image.url} />
                <img className="Card-ImageBG"
                        width={image.width && (100)}
                        height={image.height && (100)}
                        src={image.url} ></img>
                </>
                )}
            </div>
                <Card.Body>
                    <Card.Title>{ name }</Card.Title>
                    <Card.Text>
                    { author }
                    </Card.Text>
                    <Card.Text>
                        <TimeAgo date={ date }/>
                    </Card.Text>
                </Card.Body>
        </Card>
    )
}

export const HomeItemCard = ({ image, name, description, date, parameters }) => {
    return (
        <Card className="mb-3 shadow-sm">
            <Card.Body>
                <Row>
                    {/* Left: Image */}
                    <Col xs={3} className="d-flex align-items-center">
                        <Card.Img src={image.url} alt={name} className="img-fluid rounded" style={{ maxHeight: '120px', objectFit: 'cover' }} />
                    </Col>

                    {/* Middle: Name & Description */}
                    <Col xs={5}>
                        <Card.Title className="fw-bold">{name}</Card.Title>
                        <Card.Text className="text-muted">{description}</Card.Text>
                    </Col>

                    {/* Right: Date & Parameters */}
                    <Col xs={4} className="text-end d-flex flex-column justify-content-center">
                        <p className="text-muted mb-2">Posted: {new Date(date).toLocaleDateString()}</p>
                        <div className="d-flex flex-wrap justify-content-end">
                            {Object.entries(parameters).map(([key, value]) => (
                                <OverlayTrigger
                                    key={key}
                                    placement="top"
                                    overlay={<Tooltip>{parameterDescriptions[key]}</Tooltip>}
                                >
                                    <span className="badge bg-primary m-1" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>
                                        {key}: 0/10
                                    </span>
                                </OverlayTrigger>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};