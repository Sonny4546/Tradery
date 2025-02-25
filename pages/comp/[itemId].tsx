import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from "react-router-dom";

import { getItemsById, deleteItemById, addRequest, updateItem } from "../lib/Items";
import { getPreviewImageById } from "../lib/storage";
import { TraderyItems } from "../lib/ItemsInterface";
import HomeNav from "../HomeNav";
import { fetchUserData } from '../lib/User';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../lib/AuthHook";
import { getUserDataById, TraderyProfiles } from "../lib/UserProfile";
import { TraderyUser } from "../lib/GetUser";

export default function ItemContent({ params = useParams() }: { params: { itemsId: string}}) {
    const [items, setItems] = useState<TraderyItems | undefined>();
    const [author, setAuthor] = useState<TraderyProfiles | undefined>()
    const navigate = useNavigate();
    const [isAuthor, setIsAuthor] = useState(false);
    const [isRequesting, setRequest] = useState(false);
    const { isAdmin } = useAuth();
    
    const imageUrl = items?.imageFileId && getPreviewImageById(items.imageFileId);
    const image = {
      url: imageUrl,
      height: items?.imageHeight,
      width: items?.imageWidth,
    };

    useEffect(() => {
        (async function run() {
            const { items } = await getItemsById(params.itemsId);
            console.log("Fetched Item Data:", items);  // ✅ Debugging
            
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
            return;
            }
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
            await addRequest(params.itemsId, {
                ...items,
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
            await updateItem(params.itemsId, {
                ...items,
                isApproved: true,
            });
    
            // ✅ Fetch the latest data to ensure correctness
            const { items: updatedItem } = await getItemsById(params.itemsId);
            console.log("✅ Approved Post Data from Appwrite:", updatedItem);
    
            // ✅ Update state with the newly fetched data
            setItems(updatedItem);
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
            await addRequest(params.itemsId, {
                ...items,
                requests: updatedRequests,
            });

            console.log("Trade request removed");
        } catch (error) {
            console.error("Error removing request:", error);
        }
    }
    return (
        <HomeNav>
            <a className="HomeItem" href="#/Home">
                <svg height="0.8em" width="0.8em" viewBox="0 0 2 1" preserveAspectRatio="none">
                    <polyline
                        fill="none" 
                        stroke="#000" 
                        stroke-width="0.2" 
                        points="0.9,0.1 0.1,0.5 0.9,0.9" 
                    />
                </svg> Home
            </a>
            <div className="container">
                {items && (
                    <>
                        <div className="itemheading">
                            <div><h1>{items.name}</h1></div>
                            {author && (
                            <div>By: {author.displayName || author.defaultName}</div>
                            )}
                            <div>Date Posted: { new Date(items.date).toLocaleString('en-US', { month: 'long', day: 'numeric' }) }</div>
                        </div>

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
    );
}