import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { getUserDataById, TraderyProfiles } from "../lib/UserProfile";
import { getItemsbyUser } from "../lib/Items";
import { getPreviewImageById, getProfilePreviewImageById } from "../lib/storage";
import { TraderyItems } from "../lib/ItemsInterface";
import ItemCard from "../comp/ItemCard";
import HomeNav from "../HomeNav";

export default function UserContent({ params = useParams() }: { params: { profileId: string}}) { 
    const [user, setUser] = useState<TraderyProfiles | null>(null);
    const [items, setItems] = useState<TraderyItems[]>([]);

    useEffect(() => {
        console.log(params.profileId);
    
        (async function fetchData() {
            try {
                const { userdb } = await getUserDataById(params.profileId); 
                setUser(userdb);
    
                const { items } = await getItemsbyUser(params.profileId);
                setItems(items);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        })();
    }, [params.profileId]);

    return (
        <HomeNav>
            <Container className="mt-5">
                {/* Profile Section */}
                <Row className="justify-content-center text-center">
                    <Col md={6} lg={4}>
                        <div className="profile-container p-4 bg-light rounded shadow">
                            <Image
                                src={user?.profileImageId ? getPreviewImageById(user.profileImageId) : "https://cloud.appwrite.io/v1/storage/buckets/67932f8600176cf1dfdc/files/default/view?project=678ba12f001dce105c6a&mode=admin"}
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
                                    const imageUrl = item.imageFileId && getProfilePreviewImageById(item.imageFileId);
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
                                                    author={user?.displayName || user?.defaultName || "Unknown Author"}
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