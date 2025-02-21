import React, { useEffect, useState } from "react";
import { useAuth } from "../lib/AuthHook";
import { getUser, getUserPrefs } from "../lib/appwrite";
import { useLocation } from "wouter";
import { Image, Button, Form } from "react-bootstrap";
import { TraderyUser } from "../lib/GetUser";
import { fetchUserData } from "../lib/User";
import { createProfileData, getUserDataById, updateUserData } from "../lib/UserProfile";
import { uploadUserFile } from "../lib/storage";

interface TraderyProfileImage {
    height: number;
    file: File;
    width: number;
}

const Profile = () => {
    const [user, setUser] = useState<TraderyUser | undefined>();
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState<TraderyProfileImage>();
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

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;
    
        const file = e.target.files[0];
        const img = document.createElement("img");
    
        img.onload = function () {
            setImage({
                height: img.height,
                file: file,
                width: img.width,
            });
        };
    
        img.src = URL.createObjectURL(file);
    }    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const profileName = formData.get("display-name") as string;
        const profileSummary = formData.get("summary") as string;
        if (!profileName || !profileSummary) {
            alert("Please fill in all fields.");
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const user = await fetchUserData();
            if (!user) {
                console.log("User data is still loading. Please wait.");
                return;
            }
            const {userdb} = await getUserDataById(user.$id)
            if (!userdb) {
                await createProfileData(user.$id, {
                    profileImageId: "",
                    profileSummary,
                    profileImageWidth: image?.height ?? 100,
                    profileImageHeight: image?.height ?? 100,
                    profileName,
                });
            }
            else {
                if (image?.file) {
                    console.log("Uploading image...");
                    const file = await uploadUserFile(user.$id, image.file);
        
                    await updateUserData(user.$id, {
                        profileImageId: file?.$id,
                        profileSummary,
                        profileImageWidth: image?.height ?? 100,
                        profileImageHeight: image?.height ?? 100,
                        profileName,
                    });
        
                    console.log("Image uploaded successfully:", file.$id);
                }
            }
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
                                <input type="file" accept=".png, .jpg" onChange={handleOnChange} required/>
                                <p>Upload an image: accepts jpg and png only</p>
                            </div>
                            <div className="mb-3">
                                <Form.Control type="text" id="display-name" name="display-name" placeholder="Name" defaultValue={user?.name}/>
                            </div>
                            <Form.Group className="mb-3" controlId="Description.ControlTextarea1">
                                <Form.Label>Profile Summary</Form.Label>
                                <Form.Control as="textarea" id="summary" name="summary" rows={2} defaultValue="PROFILE SUMMARY" />
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