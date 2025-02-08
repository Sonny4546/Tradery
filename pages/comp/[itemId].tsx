import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from "react-router-dom";

import { getItemsById } from "../lib/Items";
import { getPreviewImageById } from "../lib/storage"
import { TraderyItems } from "../lib/ItemsInterface";
import HomeNav from "../HomeNav";

export default function ItemContent({ params = useParams() }: { params: { itemsId: string}}) {
    const [items, setItems] = useState<TraderyItems | undefined>();
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
                        <Button className="Tradereq" variant="primary">Request a Trade</Button>
                    </div>
                    {image?.url ?? (
                    <div className="itemimg">
                        <Carousel controls={false}>
                            <Carousel.Item>
                                <img style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} 
                                width={image.width}
                                height={image.height}
                                src={image.url}/>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    )}
                    <div className="description">
                        <p>{items.description}</p>
                    </div>
                </>
                )}
            </div>
        </HomeNav>
    )
}