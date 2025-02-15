import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from "react-router-dom";

import { getItems, getItemsById } from "../lib/Items";
import { getPreviewImageById } from "../lib/storage"
import { TraderyItems } from "../lib/ItemsInterface";
import HomeNav from "../HomeNav";
import { fetchUserData } from '../lib/User';
import { addRequest } from "../lib/Items";
import { useNavigate } from 'react-router-dom';

export default function ItemContent({ params = useParams() }: { params: { itemsId: string}}) {
    const [items, setItems] = useState<TraderyItems | undefined>();
    const [isAuthor, setIsAuthor] = useState(true);

    async function handleButton() {
        const user = await fetchUserData()
        // if(user.$id = )
    }
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
            // console.log(items);
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
    return (
        <HomeNav>
            <div className="container">
                {items && (
                <>
                    <div className="itemheading">
                        <div><h1>{items.name}</h1></div>
                        <div>By: {items.author}</div>
                        <div>Date Posted: { new Date(items.date).toLocaleString('en-US', { month: 'long', day: 'numeric' }) }</div>
                    </div>
                    <div className="Tradecont">
                        {isAuthor && (
                            <Button className="Tradereq" variant="primary">Delete Item</Button>
                        )}
                        {!isAuthor && (
                            <Button className="Tradereq" variant="primary">Request a Trade</Button>
                        )}
                    </div>
                    <div className="itemimg">
                        <Carousel controls={false}>
                            <Carousel.Item>
                            {image?.url ?? (
                                <img width={image.width}
                                height={image.height}
                                src={imageUrl}></img>
                            )}
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