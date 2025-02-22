import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from "react-router-dom";

import { getItems, getItemsById, deleteItemById } from "../lib/Items";
import { getPreviewImageById } from "../lib/storage"
import { TraderyItems } from "../lib/ItemsInterface";
import HomeNav from "../HomeNav";
import { fetchUserData } from '../lib/User';
import { addRequest } from "../lib/Items";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "wouter";
import { useAuth } from "../lib/AuthHook";

export default function ItemContent({ params = useParams() }: { params: { itemsId: string}}) {
    const [items, setItems] = useState<TraderyItems | undefined>();
    const navigate = useNavigate();
    const [isAuthor, setIsAuthor] = useState(false);
    const [isRequesting, setRequest] = useState(false);
    const {isAdmin} = useAuth();
    const imageUrl = items?.imageFileId && getPreviewImageById(items.imageFileId)
    const image = {
      url: imageUrl,
      height: items?.imageHeight,
      width: items?.imageWidth,
    };
    useEffect(() => {
        (async function run() {
            const { items } = await getItemsById(params.itemsId);
            setItems(items);
            const user = await fetchUserData()
            const userId = user?.$id
            if (userId === items?.authorID) {
                setIsAuthor(true);
            }
            if (!user) return;
            setRequest(items.requests?.includes(user.$id) ?? false);
        })();
    }, [params.itemsId]);

    async function handleOnTrade() {
        if (!items) return;
        
        const user = await fetchUserData();
        if (!user) {
            console.log("User data is still loading. Please wait.");
            return;
        }
    
        try {
            // Fetch existing requests or initialize an empty array
            const currentRequests = items.requests ?? [];
            
            // Avoid duplicate requests
            if (currentRequests.includes(user.$id)) {
                setRequest(true)
                return;
            }
    
            // Add the user ID to the requests array
            const updatedRequests = [...currentRequests, user.$id];
    
            // Update the item in Appwrite
            const updatedItem = await addRequest(params.itemsId, {
                ...items,
                isApproved: true,
                requests: updatedRequests,
            });
    
            console.log("Trade request successful:", updatedItem);
            
            setItems((prevItems) => prevItems ? { ...prevItems, isApproved: true, requests: updatedRequests } : prevItems);
            setRequest(true);
        } catch (error) {
            console.error("Error requesting trade:", error);
        }
    }

    async function handleDeleteItem() {
        if (!items?.$id) return;
        await deleteItemById(items.$id);
        navigate('/');
    }

    async function handleApprove() {
        if (!items) return;
        
        const user = await fetchUserData();
        if (!user) {
            console.log("User data is still loading. Please wait.");
            return;
        }
    
        try {
            // Update in Appwrite
            const updatedItem = await addRequest(params.itemsId, {
                ...items,
                isApproved: true,
            });
    
            console.log("Approved Post: ", updatedItem);
    
            // ✅ Update the local state so the alert disappears immediately
            setItems((prevItems) => prevItems ? { ...prevItems, isApproved: true } : prevItems);
            
            navigate(`/Admin`);
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
    
            const updatedItem = await addRequest(params.itemsId, {
                ...items,
                isApproved: true,
                requests: updatedRequests,
            });
    
            console.log("Trade request removed:", updatedItem);
    
            // ✅ Update local state so the button updates immediately
            setItems((prevItems) => prevItems ? { ...prevItems, isApproved: true, requests: updatedRequests } : prevItems);
            setRequest(false);
        } catch (error) {
            console.error("Error removing request:", error);
        }
    }    
    return (
        <HomeNav>
            <div className="container">
                {items && (
                <>
                    {items.isApproved == false && (
                        <Alert key='warning' variant='warning' style={{ margin: '20px', }}>
                            Post is waiting to be approved by the moderators.
                        </Alert>
                    )}
                    <div className="itemheading">
                        <div><h1>{items.name}</h1></div>
                        <div>By: {items.author}</div>
                        <div>Date Posted: { new Date(items.date).toLocaleString('en-US', { month: 'long', day: 'numeric' }) }</div>
                    </div>
                    {!isAdmin && (
                        <div className="Tradecont">
                            {isAuthor == true && (
                                <Button className="Tradereq" variant="primary" onClick={handleDeleteItem}>Delete Item</Button>
                            )}
                            {isAuthor == false && (
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
                            <Button className="Tradereq" variant="primary" onClick={handleDeleteItem}>Delete Item</Button>
                            <Button className="Tradereq" variant="primary" onClick={handleApprove}>Approve Item</Button>
                        </div>
                    )}
                    <div className="itemimg">
                        <Carousel className="image-carousel" controls={false}>
                            <Carousel.Item>
                                <img 
                                    className="thumbnail"
                                    src={image.url ? String(image.url) : "./images/favicon"}
                                    alt="Item"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    <div className="description">
                        <p>{items.description}</p>
                    </div>
                </>
                )}
            </div>
        </HomeNav>
    )
}