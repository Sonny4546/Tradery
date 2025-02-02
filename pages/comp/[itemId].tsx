import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from "react-router-dom";

import { getItemsById } from "../lib/Items";
import { TraderyItems } from "../lib/ItemsInterface";
import HomeNav from "../HomeNav";

export default function ItemContent({ params = useParams() }: { params: { itemsId: string}}) {
    const [items, setItems] = useState<TraderyItems | undefined>();
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
                        <div>Date Posted: {items.date}</div>
                    </div>
                    <div className="Tradecont">
                        <Button className="Tradereq" variant="primary">Request a Trade</Button>
                    </div>
                    <div className="itemimg">
                        <Carousel controls="false">
                            <Carousel.Item>
                                <img style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} src="https://raw.githubusercontent.com/Sonny4546/OurFavoriteArtist/2b20d35e16c25397593d98943c14072b56aa9cbb/images/about.jpg"></img>
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