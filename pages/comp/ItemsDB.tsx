import React from 'react'
import { useEffect, useState } from "react";
import { Col, Row, Nav, Navbar, NavDropdown, Container, Alert, AlertHeading } from 'react-bootstrap';
import { useAuth } from '../lib/AuthHook';
import { useNavigate } from 'react-router-dom';
import { TraderyItems } from '../lib/ItemsInterface';
import { getPreviewImageById } from "../lib/storage";
import { getItemsbyUser } from '../lib/Items';
import ItemCard from '../comp/ItemCard';
import { fetchUserData } from '../lib/User';


const Items = () => {
    const [items, setItems] = useState<Array<TraderyItems> | undefined>();

    useEffect(() => {
        (async function run() {
        const user = await fetchUserData();
        if (!user) {
            console.log("User data is still loading. Please wait.");
            return;
        }
        const { items } = await getItemsbyUser(user.$id);
        setItems(items)
        console.log(items);
        })();
    }, []);
    return(
        <>
        <div className="home">
            <div className="container" id="pagewrap">
                <div className="items container">
                    <Row>
                        {Array.isArray(items) && items.length > 0 && (
                            <>
                                {items.map((item) => {
                                    const imageUrl = item.imageFileId && getPreviewImageById(item.imageFileId)
                                    const image = {
                                    url: imageUrl,
                                    height: item?.imageHeight,
                                    width: item?.imageWidth,
                                    };
                                    return (
                                        <Col xs={12} md={3} key={item.$id} style={{ paddingBottom: '20px' }}>
                                            <a className="itemLink" href={`#/Item/${item.$id}`}>
                                                <ItemCard
                                                    image={{
                                                    height: image.height,
                                                    url: image.url,
                                                    width: image.width
                                                    }}
                                                    name={item.name}
                                                    date={item.date}
                                                    author={item.author}
                                                />
                                            </a>
                                        </Col>
                                    );
                                })}
                            </>
                        )}
                        {Array.isArray(items) && items.length === 0 && (
                            <Container>
                                <Alert key='warning' variant='warning'>
                                No Items are currently posted, 
                                <Alert.Link href="#/Dashboard/Post">You can start by posting here</Alert.Link>.
                                </Alert>
                            </Container>
                        )}
                    </Row>
                </div>
            </div>
      </div>
        </>
    )
}
export default Items