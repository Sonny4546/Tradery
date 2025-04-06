import React, { useEffect, useState } from "react";
import { Col, Row, Alert, Container } from "react-bootstrap";
import { getPreviewImageById } from "../lib/storage";
import { getItemsbyUser } from "../lib/Items";
import { getUserDataById, TraderyProfiles } from "../lib/UserProfile";
import { TraderyItems } from "../lib/ItemsInterface";
import { ItemCard } from "../comp/ItemCard";
import { userInfo } from "../lib/context/UserContext";

const Items = () => {
    const [items, setItems] = useState<TraderyItems[]>([]);
    const [authors, setAuthors] = useState<{ [key: string]: TraderyProfiles }>({});
    const {userData} = userInfo();
    useEffect(() => {
        (async function run() {
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

    // Category mapping with colors
  const categoryMap: { [key: string]: { name: string; color: string } } = {
    a: { name: "School Supplies", color: "primary" },
    b: { name: "Clothing", color: "success" },
    c: { name: "Entertainment/Hobbies", color: "warning" },
    d: { name: "Gaming/Technology", color: "danger" },
    e: { name: "Fashion Accessories", color: "info" },
    f: { name: "Sports & Outdoor", color: "dark" },
  };

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
                                        <div className="itemLabel">
                                            <span className="Label">{categoryMap[item.itemCategory]?.name || "Uncategorized"}</span>
                                        </div>
                                        {author ? (
                                            <ItemCard
                                                image={image}
                                                name={item.name}
                                                date={item.date}
                                                author={author.displayName || author.defaultName}
                                            />
                                        ) : (
                                            // Placeholder card when the author is not yet known
                                            <div className="card placeholder-glow">
                                                <div className="card-body">
                                                    <h5 className="card-title placeholder-glow">
                                                        <span className="placeholder col-6"></span>
                                                    </h5>
                                                    <p className="card-text placeholder-glow">
                                                        <span className="placeholder col-7"></span>
                                                        <span className="placeholder col-4"></span>
                                                        <span className="placeholder col-4"></span>
                                                        <span className="placeholder col-6"></span>
                                                        <span className="placeholder col-8"></span>
                                                    </p>
                                                </div>
                                            </div>
                                        )}
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