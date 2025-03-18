import React, { useEffect, useState } from "react";
import { Image, Button, Form, Container, Card, Spinner } from "react-bootstrap";
import { getUser } from "../lib/appwrite";
import { checkUserNameDuplicate, getUserDataById, updateUserData } from "../lib/UserProfile";
import { getProfilePreviewImageById, uploadUserFile, deleteProfileImageById } from "../lib/storage";
import { TraderyUser } from "../lib/GetUser";

export interface TraderyProfileImage {
    height: number;
    file: File;
    width: number;
}

const Profile = () => {
    const [user, setUser] = useState<TraderyUser>();
    const [userdb, setUserdb] = useState<any>();
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState<TraderyProfileImage>();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [newDisplayName, setDisplayName] = useState("");
    const [profileSummary, setProfileSummary] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser();
                setUser(userData);
                if (userData) {
                    const { userdb } = await getUserDataById(userData.$id);
                    setUserdb(userdb);
                    setPreviewImage(userdb?.profileImageId ? getProfilePreviewImageById(userdb.profileImageId) : null);
                    setDisplayName(userdb?.displayName || userData?.name || "");
                    setProfileSummary(userdb?.profileSummary || "");
                }
            } catch (error) {
                console.error("Error fetching user: ", error);
            }
        };
        fetchUser();
    }, []);

    const handleEditProfile = () => setIsEditing(true);

    // ✅ Automatically remove non-alphanumeric characters (except spaces)
    const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^a-zA-Z0-9]/g, ""); // Keep letters, numbers, and spaces
        setDisplayName(value);
    };

    const handleProfileSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value.replace(/[^a-zA-Z0-9 .,!?]/g, ""); // Allow punctuation
        setProfileSummary(value);
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];

        // **Check File Size (Max 5MB)**
        if (file.size > 5 * 1024 * 1024) { // 5MB
            setError("File size exceeds 5MB limit.");
            return;
        } else {
            setError(null);
        }

        const img = document.createElement("img");
        img.onload = function () {
            setImage({ height: img.height, file: file, width: img.width });
        };
        img.src = URL.createObjectURL(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (!newDisplayName.trim() || !profileSummary.trim()) {
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
            let profileImageId = userdb?.profileImageId || ""; // ✅ Keep empty string if no existing image

            const nameExists = await checkUserNameDuplicate(newDisplayName);
            if (!nameExists) {
                await updateUserData(user.$id, {
                    profileImageId,
                    profileSummary,
                    profileImageWidth: image?.width ?? userdb?.profileImageWidth ?? 100,
                    profileImageHeight: image?.height ?? userdb?.profileImageHeight ?? 100,
                    displayName: newDisplayName,
                    defaultName: user.name,
                    userId: user.$id,
                    userEmail: user.email,
                    firebaseId: userdb.firebaseId
                });
                // ✅ Only delete the old image if a new one is uploaded AND an image already exists
                if (image?.file) {
                    if (profileImageId && profileImageId !== "default") {
                        await deleteProfileImageById(profileImageId);
                    }
                    // ✅ Upload the new image
                    const file = await uploadUserFile(user.$id, image.file);
                    if (file?.$id) {
                        profileImageId = file.$id;
                    }
                }
            } else {
                alert("The username already exists. Try another one.");
                setLoading(false);
                return;
            }

            console.log("✅ Profile updated.");
            setUserdb((prev) => ({
                ...prev,
                displayName: newDisplayName,
                profileSummary,
                profileImageId,
            }));

        } catch (error) {
            console.error("Failed to update profile:", error);
        } finally {
            setLoading(false);
            setIsEditing(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Card className="profile-card shadow-lg">
                {loading && (
                    <div className="overlay">
                        <Spinner animation="border" />
                        <p className="mt-2">Updating User Profile...</p>
                    </div>
                )}

                <Card.Body className="text-center">
                    {isEditing ? (
                        <>
                            <h2>Edit Profile</h2>
                            <form onSubmit={handleSubmit} className="mt-3">
                                <div className="profile-image-upload">
                                    <input type="file" accept=".png, .jpg" onChange={handleOnChange}/>
                                    <Image
                                        src={previewImage || "https://cloud.appwrite.io/v1/storage/buckets/67932f8600176cf1dfdc/files/default/view?project=678ba12f001dce105c6a&mode=admin"}
                                        roundedCircle
                                        className="profile-img"
                                    />
                                    <p className="text-muted">Upload a PNG or JPG image (Max: 5MB)</p>
                                    {error && <p className="text-danger">{error}</p>}
                                </div>
                                <Form.Group className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        name="display-name" 
                                        placeholder="Name" 
                                        maxLength={20}
                                        value={newDisplayName}
                                        onChange={handleDisplayNameChange}
                                    />
                                    <small className="text-muted">{newDisplayName.length}/20</small>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Profile Summary</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        name="summary" 
                                        rows={2} 
                                        maxLength={500}
                                        value={profileSummary}
                                        onChange={handleProfileSummaryChange}
                                    />
                                    <small className="text-muted">{profileSummary.length}/500</small>
                                </Form.Group>
                                <Button className="btn-lg w-100" type="submit">Submit</Button>
                            </form>
                        </>
                    ) : (
                        <>
                            <Image
                                src={userdb?.profileImageId ? getProfilePreviewImageById(userdb.profileImageId) : "https://cloud.appwrite.io/v1/storage/buckets/67932f8600176cf1dfdc/files/default/view?project=678ba12f001dce105c6a&mode=admin"}
                                roundedCircle
                                className="profile-img"
                            />
                            <h2 className="display-name">{userdb?.displayName || "Username"}</h2>
                            <p className="account-name">{user?.name}</p>
                            <p className="text-muted">{userdb?.profileSummary ?? "No profile description provided"}</p>
                            <Button className="btn-lg mt-3" onClick={handleEditProfile}>Edit Profile</Button>
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Profile;