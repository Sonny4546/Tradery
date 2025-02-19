import React, { useEffect, useState } from "react";
import { useAuth } from "../lib/AuthHook";
import { getUser, getUserPrefs } from "../lib/appwrite";
import { useLocation } from "wouter";
import { Image, Button, Form } from "react-bootstrap";
import { TraderyUser } from "../lib/GetUser";

const Profile = () => {
    const [user, setUser] = useState<TraderyUser | undefined>();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const userData = await getUser();
                console.log("User Data: ", userData);
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user: ", error);
                setUser(undefined);
            }
        };

        checkUser();
    }, []);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await getUserPrefs();
            setLoading(false);
        } catch {
            console.log("failed to get preferences");
        }
        
        setIsEditing(false); // Switch back to profile view
    };

    return (
        <>
        {loading && (
            <div className="overlay">
                <div className="overlay-content">
                    <p>Please wait... Updating User Profile</p>
                </div>
            </div>
        )}
        <div className="Main">
            <div className="container">
                {isEditing ? (
                    <>
                        <h1>Edit Profile</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="inputprofile">
                                <input type="file" accept=".png, .jpg" />
                                <p>Upload an image: accepts jpg and png only</p>
                            </div>
                            <div className="mb-3">
                                <Form.Control type="text" placeholder="Name" defaultValue={user?.name} />
                            </div>
                            <Form.Group className="mb-3" controlId="Description.ControlTextarea1">
                                <Form.Label>Profile Summary</Form.Label>
                                <Form.Control as="textarea" rows={2} defaultValue="PROFILE SUMMARY" />
                            </Form.Group>
                            <Button className="submitbtn" type="submit">
                                Submit
                            </Button>
                        </form>
                    </>
                ) : (
                    <>
                        <h1>Profile</h1>
                        <Button className="editprf btn btn-primary mb-3" onClick={handleEditProfile}>
                            Edit Profile
                        </Button>
                        <div className="inputprofile">
                            <Image
                                src="https://raw.githubusercontent.com/Sonny4546/OurFavoriteArtist/2b20d35e16c25397593d98943c14072b56aa9cbb/images/about.jpg"
                                roundedCircle
                                width={180}
                                height={180}
                            />
                        </div>
                        {user ? (
                            <div className="container">
                                <div className="mb-3">
                                    <p>{user.name}</p>
                                </div>
                                <div className="mb-3">
                                    <p>PROFILE SUMMARY</p>
                                </div>
                            </div>
                        ) : (
                            <div className="container">
                                <div className="mb-3">
                                    <p></p>
                                </div>
                                <div className="mb-3">
                                    <p>PROFILE SUMMARY</p>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
        </>
    );
};

export default Profile;