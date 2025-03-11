import React, { useState, useEffect } from 'react';
import { Card, Row, Col, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import TimeAgo from 'react-timeago'
import { useAuth } from '../lib/AuthHook';
import { addRequest, deleteItemById, getItemsById, updateItem } from '../lib/Items';
import { fetchUserData } from '../lib/User';
import { getUserDataById, TraderyProfiles } from '../lib/UserProfile';
import { TraderyItems } from '../lib/ItemsInterface';
import { useNavigate } from 'react-router-dom';

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

export const HomeItemCard = ({
    itemId,
    image,
    name,
    description,
    date,
    parameters, // Pass parameters as an object
}) => {
    const [items, setItems] = useState<TraderyItems | undefined>();
    const [author, setAuthor] = useState<TraderyProfiles | undefined>()
    const [isAuthor, setIsAuthor] = useState(false);
    const [isRequesting, setRequest] = useState(false);
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const parameterDescriptions = {
        Condition: "Is it new or worn out?",
        Usefulness: "How useful is the item in daily life?",
        BrandValue: "Is it from a well-known or high-quality brand?",
        Demand: "Are people currently looking to buy this item?",
        Rarity: "Is it hard to find or a collector’s item?",
        AgeDepreciation: "Does it lose value over time? (Higher = holds value)",
        ResaleValue: "Can you sell it for a good price?",
        ReplacementCost: "How expensive is a new one?",
    };
    useEffect(() => {
            (async function run() {
                if (!itemId) return;
                const { items } = await getItemsById(itemId);
                console.log("Fetched Item Data:", items);  // Debugging
                
                setItems(items);
                const user = await fetchUserData();
                const userId = user?.$id;
    
                if (userId === items?.authorID) {
                    setIsAuthor(true);
                }
                
                if (user) {
                    setRequest(items.requests?.includes(user.$id) ?? false);
                }
                if (items) {
                    const {userdb} = await getUserDataById(items.authorID)
                    setAuthor(userdb)
                }
            })();
        }, [itemId]);

    async function handleOnTrade() {
            if (!items) return;
            
            const user = await fetchUserData();
            if (!user) {
                console.log("User data is still loading. Please wait.");
                return;
            }
    
            try {
                const currentRequests = items.requests ?? [];
    
                if (currentRequests.includes(user.$id)) {
                    setRequest(true);
                    return;
                }
    
                const updatedRequests = [...currentRequests, user.$id];
    
                // ✅ Optimistic UI update
                setItems((prevItems) => prevItems ? { ...prevItems, requests: updatedRequests } : prevItems);
                setRequest(true);
    
                // ✅ Update backend
                await addRequest(itemId, {
                    ...items,
                    isApproved: true,
                    requests: updatedRequests,
                });
    
                console.log("Trade request successful");
            } catch (error) {
                console.error("Error requesting trade:", error);
            }
        }
    
        async function handleDeleteItem() {
            if (items?.$id){
                await deleteItemById(items.$id);
            return;
            }
            navigate(-1);
        }
    
        async function handleApprove() {
            if (!items) return;
        
            const user = await fetchUserData();
            if (!user) {
                console.log("User data is still loading. Please wait.");
                return;
            }
        
            try {
                // ✅ Update in Appwrite using `updateItem` instead of `addRequest`
                await updateItem(itemId, {
                    ...items,
                    isApproved: true,
                });
        
                // ✅ Fetch the latest data to ensure correctness
                const { items: updatedItem } = await getItemsById(itemId);
                console.log("✅ Approved Post Data from Appwrite:", updatedItem);
        
                // ✅ Update state with the newly fetched data
                setItems(updatedItem);
                navigate(-1);
            } catch (error) {
                console.error("Error approving post:", error);
            }
        }    
    
        async function handleOnTradeRemove() {
            if (!items) return;
    
            const user = await fetchUserData();
            if (!user) {
                console.log("User data is still loading. Please wait.");
                return;
            }
    
            try {
                const currentRequests = items.requests ?? [];
                if (!currentRequests.includes(user.$id)) {
                    setRequest(false);
                    return;
                }
    
                const updatedRequests = currentRequests.filter(id => id !== user.$id);
    
                // ✅ Optimistic UI update
                setItems((prevItems) => prevItems ? { ...prevItems, requests: updatedRequests } : prevItems);
                setRequest(false);
    
                // ✅ Update backend
                await addRequest(itemId, {
                    ...items,
                    isApproved: true,
                    requests: updatedRequests,
                });
    
                console.log("Trade request removed");
            } catch (error) {
                console.error("Error removing request:", error);
            }
    }
    return (
        <Card className="mb-3 shadow-sm">
            <Card.Body>
                <Row>
                    {/* Left: Image */}
                    <Col xs={3} className="d-flex align-items-center">
                        <Card.Img
                            src={image.url}
                            alt={name}
                            className="img-fluid rounded"
                            style={{ maxHeight: "120px", objectFit: "cover" }}
                        />
                    </Col>

                    {/* Middle: Name & Description */}
                    <Col xs={5}>
                        <Card.Title className="fw-bold">{name} by:&nbsp;
                        {author && (
                                <a href={`#/User/${author.displayName}`} className="profile-link">
                                    {author.displayName || author.defaultName}
                                </a>
                        )}
                        </Card.Title>
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
                                    <span className="badge bg-primary m-1" style={{ fontSize: "0.9rem", cursor: "pointer" }}>
                                        {key}: {value as number}/10
                                    </span>
                                </OverlayTrigger>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer>
                <>
                {!isAdmin && (
                    <div className="Tradecont">
                        {isAuthor && (
                            <Button className="Tradereq" variant="primary" onClick={handleDeleteItem}>
                                Delete Item
                            </Button>
                        )}
                        {!isAuthor && (
                            <>
                                {isRequesting ? (
                                    <Button className="Tradereq" variant="danger" onClick={handleOnTradeRemove}>
                                        Remove Trade Request
                                    </Button>
                                ) : (
                                    <Button className="Tradereq" variant="primary" onClick={handleOnTrade}>
                                        Request a Trade
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                )}           
                {isAdmin && (
                    <div className="Tradecont">
                        <Button className="Tradereq" variant="primary" onClick={handleDeleteItem}>
                            Delete Item
                        </Button>
                        <Button className="Tradereq" variant="primary" onClick={handleApprove}>
                            Approve Item
                        </Button>
                    </div>
                )}
                </>
            </Card.Footer>
        </Card>
    );
};