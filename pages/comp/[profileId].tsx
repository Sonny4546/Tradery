import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { getUserDataById, TraderyProfiles } from "../lib/UserProfile";
import { TraderyUser } from "../lib/GetUser";
import { fetchUserData } from "../lib/User";
import { getItemsbyUser } from "../lib/Items";
import { getPreviewImageById } from "../lib/storage";
import { TraderyItems } from "../lib/ItemsInterface";
import ItemCard from "../comp/ItemCard";
import HomeNav from "../HomeNav";

export default function UserContent() {
    const { userId } = useParams<{ userId: string }>();
    
    const [user, setUser] = useState<TraderyProfiles | null>(null);
    const [data, setData] = useState<TraderyUser | null>(null);
    const [items, setItems] = useState<TraderyItems[]>([]);

    useEffect(() => {
        (async function fetchData() {
            try {
                if (!userId) return; // ✅ Prevents fetching if userId is undefined
                
                // Fetch user profile
                const { userdb } = await getUserDataById(userId);
                setUser(userdb);

                // Fetch user authentication data
                const userdata = await fetchUserData();
                setData(userdata);

                // Fetch the user's uploaded items
                const { items } = await getItemsbyUser(userId);
                setItems(items);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        })();
    }, [userId]); // ✅ Ensure effect re-runs when userId changes

    return (
        <HomeNav>
            <Container className="mt-5">
                {/* Profile Section */}
                <Row className="justify-content-center text-center">
                    <Col md={6} lg={4}>
                        <div className="profile-container p-4 bg-light rounded shadow">
                            <Image
                                className="profile-img mb-3"
                                src={user?.profileImageId ? getPreviewImageById(user.profileImageId) : "https://via.placeholder.com/180"}
                                roundedCircle
                                fluid
                            />
                            <h2 className="display-6 fw-bold">{user?.displayName || "Unknown User"}</h2>
                            <p className="text-muted">{data?.name}</p>
                            <p className="profile-summary lead">{user?.profileSummary || "No profile summary available."}</p>
                        </div>
                    </Col>
                </Row>

                {/* Uploaded Items Section */}
                <Row className="mt-5">
                    <Col>
                        <h3 className="text-center mb-4">Uploaded Items</h3>
                        {items.length > 0 ? (
                            <Row className="g-4">
                                {items.map((item) => {
                                    const imageUrl = item.imageFileId && getPreviewImageById(item.imageFileId);
                                    const image = {
                                        url: imageUrl,
                                        height: item.imageHeight,
                                        width: item.imageWidth
                                    };

                                    return (
                                        <Col sm={12} md={6} lg={3} key={item.$id} style={{ paddingBottom: "20px" }}>
                                            <a className="itemLink" href={`#/Item/${item.$id}`}>
                                                <ItemCard
                                                    image={image}
                                                    name={item.name}
                                                    date={item.date}
                                                    author={user?.displayName || data?.name || "Unknown Author"}
                                                />
                                            </a>
                                        </Col>
                                    );
                                })}
                            </Row>
                        ) : (
                            <p className="text-muted text-center">This user has not uploaded any items yet.</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </HomeNav>
    );
}