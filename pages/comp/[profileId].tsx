import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { getUserDataById, getUserDataByName, TraderyProfiles } from "../lib/UserProfile";
import { getItemsbyUser } from "../lib/Items";
import { getPreviewImageById, getProfilePreviewImageById } from "../lib/storage";
import { TraderyItems } from "../lib/ItemsInterface";
import { ItemCard } from "../comp/ItemCard";
import HomeNav from "../HomeNav";

export default function UserContent({ params = useParams() }: { params: { profileName: string}}) { 
    const [user, setUser] = useState<TraderyProfiles | null>(null);
    const [items, setItems] = useState<TraderyItems[]>([]);

    useEffect(() => {
        (async function fetchData() {
            try {
                const { userdb } = await getUserDataByName(params.profileName); 
                userdb.map(async (user) => {
                    const { items } = await getItemsbyUser(user.userId);
                    setItems(items);
                    setUser(user);
                })

            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        })();
    }, [params.profileName]);

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
        <HomeNav>
            <Container className="mt-5">
                {/* Profile Section */}
                <Row className="justify-content-center text-center">
                    <Col md={6} lg={4}>
                        <div className="profile-container p-4 bg-light rounded shadow">
                            <Image
                                src={user?.profileImageId ? getProfilePreviewImageById(user.profileImageId) : "https://cloud.appwrite.io/v1/storage/buckets/67932f8600176cf1dfdc/files/default/view?project=678ba12f001dce105c6a&mode=admin"}
                                roundedCircle
                                className="profile-img"
                            />
                            <h2 className="display-6 fw-bold">{user?.displayName || "Unknown User"}</h2>
                            <p className="text-muted">{user?.defaultName}</p>
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
                                        <Col xs={12} md={3} key={item.$id} style={{ paddingBottom: "20px" }}>
                                            <a className="itemLink" href={`#/Item/${item.$id}`}>
                                                <div className="itemLabel">
                                                    <span className="Label">{categoryMap[item.itemCategory]?.name || "Uncategorized"}</span>
                                                </div>
                                                {user?.displayName && user?.defaultName ? (
                                                    <ItemCard
                                                        image={image}
                                                        name={item.name}
                                                        date={item.date}
                                                        author={user?.displayName || user?.defaultName || "Unknown Author"}
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