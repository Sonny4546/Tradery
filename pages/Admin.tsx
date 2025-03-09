import React, { useState, useEffect } from "react";
import { Col, Row, Container, Alert, Button, Form } from "react-bootstrap";
import { useAuth } from "./lib/AuthHook";
import { getItemsbyApproval } from "./lib/Items";
import { getPreviewImageById } from "./lib/storage";
import { fetchUserData } from "./lib/User";
import HomeNav from "./HomeNav";
import { ItemCard } from './comp/ItemCard';
import { getUserDataById, TraderyProfiles } from "./lib/UserProfile";
import { TraderyItems } from "./lib/ItemsInterface";
import "../src/main.css";

export default function Admin() {
    const { isAdmin, logInAdmin } = useAuth();
    const [items, setItems] = useState<TraderyItems[]>([]);
    const [authors, setAuthors] = useState<{ [key: string]: TraderyProfiles }>({});

    const handleAdminLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };
        await logInAdmin(target.email.value, target.password.value);
        window.location.reload();
    };

    useEffect(() => {
        (async function run() {
            const { items } = await getItemsbyApproval();
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
        <>
            {!isAdmin && (
                <div className="RegAdminContainer">
                    <div className="login-register-container">
                        <form onSubmit={handleAdminLogin} autoComplete="off">
                            <div className="form-field-wrapper">
                                <label>Email:</label>
                                <input required type="email" name="email" placeholder="Enter email..." />
                            </div>
                            <div className="form-field-wrapper">
                                <label>Password:</label>
                                <Form.Control type="password" name="password" placeholder="Enter password..." />
                            </div>
                            <div className="form-field-wrapper">
                                <Button type="submit" className="admin-btn btn-dark w-100">
                                    Log-In
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isAdmin && (
                <HomeNav>
                    <div className="home">
                        <div className="container" id="pagewrap">
                            <h1>UNAPPROVED ITEMS</h1>
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
                                                No Items are waiting to be approved yet.
                                            </Alert>
                                        </Container>
                                    )}
                                </Row>
                            </div>
                        </div>
                    </div>
                </HomeNav>
            )}
        </>
    );
}