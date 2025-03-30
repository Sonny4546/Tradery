import React, { useEffect, useState } from "react";
import { Col, Row, Alert, Container } from "react-bootstrap";
import { fetchUserData } from "../lib/User";
import { getPreviewImageById } from "../lib/storage";
import { getItemsbyUser } from "../lib/Items";
import { getUserDataById, TraderyProfiles } from "../lib/UserProfile";
import { TraderyItems } from "../lib/ItemsInterface";
import { ItemCard } from "../comp/ItemCard";
import { userInfo } from "../lib/context/UserContext";

const Items = () => {
    const [items, setItems] = useState<TraderyItems[]>([]);
    const [authors, setAuthors] = useState<{ [key: string]: TraderyProfiles }>({});

    useEffect(() => {
        (async function run() {
            const {userData} = userInfo();
            if (!userData) {
                console.log("User data is still loading. Please wait.");
                return;
            }
            const { items } = await getItemsbyUser(userData.$id);
            setItems(items);

            // Fetch all authors in one go
            const authorData: { [key: string]: TraderyProfiles } = {};
            await Promise.all(
                items.map(async (item) => {
                    if (!authorData[item.authorID]) {
                        const { userdb } = await getUserDataById(item.authorID);
                        authorData[item.authorID] = userdb;
                    }
                })
            );
            setAuthors(authorData);
        })();
    }, []);

    return (
        <div className="home">
            <div className="container" id="pagewrap">
                <div className="items container">
                    <Row>
                        {items.length > 0 ? (
                            items.map((item) => {
                                const imageUrl = item.imageFileId && getPreviewImageById(item.imageFileId);
                                const image = {
                                    url: imageUrl,
                                    height: item.imageHeight,
                                    width: item.imageWidth,
                                };
                                const author = authors[item.authorID];

                                return (
                                    <Col xs={12} md={3} key={item.$id} style={{ paddingBottom: "20px" }}>
                                        <a className="itemLink" href={`#/Item/${item.$id}`}>
                                            <ItemCard
                                                image={image}
                                                name={item.name}
                                                date={item.date}
                                                author={author ? author.displayName || author.defaultName : "Unknown Author"}
                                            />
                                        </a>
                                    </Col>
                                );
                            })
                        ) : (
                            <Container>
                                <Alert key="warning" variant="warning">
                                    No Items are currently posted, <Alert.Link href="#/Dashboard/Post">You can start by posting here</Alert.Link>.
                                </Alert>
                            </Container>
                        )}
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default Items;