import React, { useEffect, useState } from "react";
import { useAuth } from "../lib/AuthHook";
import { getUser, getUserPrefs } from "../lib/appwrite";
import { useLocation } from "wouter";
import { Image, Button, Form } from "react-bootstrap";
import { TraderyUser } from "../lib/GetUser";
import { fetchUserData } from "../lib/User";
import { createProfileData, getUserDataById, TraderyProfiles, updateUserData } from "../lib/UserProfile";
import { deleteFileById, getProfilePreviewImageById, uploadUserFile } from "../lib/storage";

export interface TraderyProfileImage {
    height: number;
    file: File;
    width: number;
}

const Profile = () => {
    const [user, setUser] = useState<TraderyUser | undefined>();
    const [userdb, setUserdb] = useState<any>();
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState<TraderyProfileImage>();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const imageUrl = userdb?.profileImageId && getProfilePreviewImageById(userdb.profileImageId)
    const profile = {
      url: imageUrl,
      height: userdb?.profileImageHeight,
      width: userdb?.profileImageWidth,
    };

    useEffect(() => {
        const checkUser = async () => {
            try {
                const userData = await getUser();
                setUser(userData);

                if (userData) {
                    const {userdb} = await getUserDataById(userData.$id);
                    setUserdb(userdb);
                    setPreviewImage(userdb?.profileImageId ? getProfilePreviewImageById(userdb.profileImageId) : null);
                }
            } catch (error) {
                console.error("Error fetching user: ", error);
            }
        };

        checkUser();
    }, []);

    const handleEditProfile = () => setIsEditing(true);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        // Update the preview image
        const newPreviewUrl = URL.createObjectURL(file);
        setPreviewImage(newPreviewUrl);

        // Prevent memory leaks by revoking the old Blob URL
        return () => URL.revokeObjectURL(newPreviewUrl);
    };   

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
    
        const formData = new FormData(e.currentTarget);
        const displayName = formData.get("display-name") as string;
        const profileSummary = formData.get("summary") as string;
    
        if (!displayName || !profileSummary) {
            alert("Please fill in all fields.");
            setLoading(false);
            return;
        }
    
        try {
            if (!user) {
                console.log("User data is still loading. Please wait.");
                setLoading(false);
                return;
            }
    
            let { userdb } = await getUserDataById(user.$id);
            let profileImageId = userdb?.profileImageId || "default";
            if (profileImageId) {
                await deleteFileById(profileImageId)
            }
            // Upload new image if selected
            if (image?.file) {
                console.log("Uploading image...");
                const file = await uploadUserFile(user.$id, image.file);
                if (file?.$id) {
                    profileImageId = file.$id;
                    console.log("Image uploaded successfully:", file.$id);
                }
            }
            await updateUserData(user.$id, {
                profileImageId,
                profileSummary,
                profileImageWidth: image?.width ?? 100,
                profileImageHeight: image?.height ?? 100,
                displayName,
                defaultName: ""
            });
            console.log("✅ Profile updated.");
    
            // Update local state to reflect changes
            setUserdb((prev) => ({
                ...prev,
                displayName,
                profileSummary,
                profileImageId,
            }));
    
        } catch (error) {
            console.error("❌ Failed to update profile:", error);
        } finally {
            setLoading(false);
            setIsEditing(false);
        }
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
                                    <Image
                                        src={previewImage || "https://cloud.appwrite.io/v1/storage/buckets/67932f8600176cf1dfdc/files/default/view?project=678ba12f001dce105c6a&mode=admin"}
                                        roundedCircle
                                        width={180}
                                        height={180}
                                    />
                                <p>Upload an image: accepts jpg and png only</p>
                            </div>
                            <div className="mb-3">
                                <Form.Control type="text" id="display-name" name="display-name" placeholder="Name" autoComplete="off" defaultValue={userdb?.profileName || user?.name}/>
                            </div>
                            <Form.Group className="mb-3" controlId="Description.ControlTextarea1">
                                <Form.Label>Profile Summary</Form.Label>
                                <Form.Control as="textarea" id="summary" name="summary" rows={2} defaultValue={userdb?.profileSummary || "PROFILE SUMMARY"} />
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
                                    src={userdb?.profileImageId ? getProfilePreviewImageById(userdb.profileImageId) : "https://cloud.appwrite.io/v1/storage/buckets/67932f8600176cf1dfdc/files/default/view?project=678ba12f001dce105c6a&mode=admin"}
                                    roundedCircle
                                    width={180}
                                    height={180}
                                />
                            </div>
                            <div className="container">
                                <div className="mb-3">
                                    <p>{userdb?.displayName}</p>
                                    <p>{user?.name}</p>
                                </div>
                                <div className="mb-3">
                                    <p>{userdb?.profileSummary ?? "No profile description provided"}</p>
                                </div>
                            </div>
                    </>
                )}
            </div>
        </div>
        </>
    );
};

export default Profile;