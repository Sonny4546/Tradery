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
        })();
    }, [params.itemsId]);

    // async function handleOnTrade() {
    //     const [request, setRequest] = useState<TraderyItems | undefined>();
    //     const user = await fetchUserData();
    //     if (!user) {
    //         console.log("User data is still loading. Please wait.");
    //         return;
    //     }
    //     const { requests } = await getItems()
    //     setRequest(request)
    //     let request = await 
    //     request.push(user?.$id)
    //     try {
    //         const results = await addRequest(params.itemsId,{
    //             requests: request,
    //             imageFileId: "",
    //             imageHeight: 0,
    //             $id: "",
    //             name: "",
    //             author: "",
    //             authorID: "",
    //             date: "",
    //             description: "",
    //             imageWidth: 0
    //         });
    
    //         navigate(`/Item/${results.items.$id}`);
    //     } catch (error) {
    //         console.error("Error creating item:", error);
    //     }
    // }

    async function handleDeleteItem() {
        if (!items?.$id) return;
        await deleteItemById(items.$id);
        navigate('/');
    }
    return (
        <HomeNav>
            <div className="container">
                {items && (
                <>
                    {!items.isApproved && (
                    <Alert key='warning' variant='warning'>
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
                                <Button className="Tradereq" variant="primary">Request a Trade</Button>
                            )}
                        </div>
                    )}
                    {isAdmin && (
                        <div className="Tradecont">
                            <Button className="Tradereq" variant="primary" onClick={handleDeleteItem}>Delete Item</Button>
                            <Button className="Tradereq" variant="primary">Approve Item</Button>
                        </div>
                    )}
                    <div className="itemimg">
                        <Carousel controls={false}>
                            <Carousel.Item>
                                <img className="thumbnail" width={image.width}
                                height={image.height}
                                src={image.url ? String(image.url) : "./images/favicon"}/>
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