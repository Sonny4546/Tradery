import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { getUserDataById } from '../lib/UserProfile';
import { fetchUserData } from '../lib/User';

interface ItemCardProps {
    name: string;
    image?: {
        height: number;
        url: string;
        width: number;
    }
    userId: string[] | undefined;
}

const RequestCard = ({ name, image, userId }: ItemCardProps) => {
    const [userRequests, setUserRequests] = useState<{ displayName: string; appwriteName: string }[]>([]);

    useEffect(() => {
        (async function fetchUsers() {
            if (!userId || userId.length === 0) return;  // Skip if no requests

            const usersData = await Promise.all(
                userId.map(async (id) => {
                    try {
                        // Fetch user account name from Appwrite
                        const userAccount = await fetchUserData();
                        
                        // Fetch user display name from database
                        const { userdb } = await getUserDataById(id);
                        
                        return {
                            displayName: userdb?.profileName || "Unknown User",
                            appwriteName: userAccount?.name || "No Appwrite Name",
                        };
                    } catch (error) {
                        console.error("Error fetching user data:", error);
                        return { displayName: "Error", appwriteName: "Error" };
                    }
                })
            );

            setUserRequests(usersData);
        })();
    }, [userId]);

    return (
        <Accordion.Item eventKey="0">
            <Accordion.Header>{name}</Accordion.Header>
            <Accordion.Body>
                {userRequests.length > 0 ? (
                    userRequests.map((user, index) => (
                        <p key={index}>
                            <strong>{user.displayName}</strong> requests to trade with this item.  
                            You can message them at **{user.appwriteName}**.
                        </p>
                    ))
                ) : (
                    <p>No trade requests found.</p>
                )}
            </Accordion.Body>
        </Accordion.Item>
    );
}

export default RequestCard;