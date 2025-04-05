import React, { useEffect, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { getUserDataById } from '../lib/UserProfile';
import { addUserToChat } from "../lib/firebase"
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../lib/context/UserContext';
import { addRequest } from '../lib/Items';

interface ItemCardProps {
    name: string;
    userId: string[] | undefined;
    eventKey: string;
    itemData: any; // Adjust the type as per your data structure
}

interface UserRequest {
    traderId: string;
    displayName: string;
    appwriteName: string;
    firebaseId: string;
}

const RequestCard = ({ name, userId, eventKey, itemData }: ItemCardProps) => {
    const [userRequests, setUserRequests] = useState<UserRequest[]>([]);
    const {userdb} = userInfo();
    if (!userdb) {
        throw new Error('User data is not available');
    }
    const navigate = useNavigate();

    useEffect(() => {
        (async function fetchUsers() {
            if (!userId || userId.length === 0) return;

            const usersData = await Promise.all(
                userId.map(async (id) => {
                    try {
                        const { userdb } = await getUserDataById(id);
                        const displayName = userdb?.displayName || userdb?.defaultName || "";
                        const appwriteName = userdb?.defaultName || "";
                        const firebaseId = userdb?.firebaseId || null;
                        const traderId = userdb?.userId || null;

                        return displayName || appwriteName
                            ? { displayName, appwriteName, firebaseId, traderId }
                            : null;
                    } catch (error) {
                        console.error("Error fetching user data:", error);
                        return null;
                    }
                })
            );
            setUserRequests(usersData.filter((user): user is UserRequest => user !== null));
        })();
    }, [userId]);

    async function acceptUser(itemData: any, targetUserId: string, traderId: string, currentUserId: string) {
        try {
            await addUserToChat(targetUserId, currentUserId);

            const currentRequests = itemData.requests ?? [];
            const updatedRequests = currentRequests.filter(id => id !== traderId);
        
            // ✅ Update backend
            await addRequest(itemData.$id, {
                ...itemData,
                isApproved: true,
                requests: updatedRequests,
            });

            console.log("Done");
        } catch {
            console.log("Failed to add chat");
        } finally {
            navigate(`/Dashboard/Messages#view-messages`);
        }
    }

    async function denyUser(itemData: any, targetUserId: string) {
        try {
            const currentRequests = itemData.requests ?? [];
            const updatedRequests = currentRequests.filter(id => id !== targetUserId);
        
            // ✅ Update backend
            await addRequest(itemData.$id, {
                ...itemData,
                isApproved: true,
                requests: updatedRequests,
            });
        
            console.log("Trade request denied");
        } catch (error) {
            console.error("Error removing request:", error);
        }
    }

    return (
        <Accordion.Item eventKey={eventKey}>
            <Accordion.Header>{name}</Accordion.Header>
            <Accordion.Body>
                {userRequests.length > 0 ? (
                    userRequests.map((user, index) => (
                        <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                            <p className="mb-0">
                                <strong>{user.displayName}</strong> wants to trade. The default username is <a href={`#/User/${user.displayName}`} className="profile-link"><strong>{user.appwriteName}</strong></a>, You can click on the name to view their profile.
                            </p>
                            <Button 
                                variant="primary" 
                                size="sm" 
                                onClick={() => {
                                    if (user.firebaseId && userdb.firebaseId && user.traderId) {
                                        acceptUser(itemData, user.firebaseId, user.traderId,  userdb.firebaseId);
                                    } else {
                                        console.error("Invalid user IDs");
                                    }
                                }}
                            >
                                Accept
                            </Button>
                            <Button 
                                variant="primary" 
                                size="sm" 
                                onClick={() => {
                                    if (eventKey && user.traderId) {
                                        denyUser(itemData, user.traderId);
                                    } else {
                                        console.error("Invalid user IDs");
                                    }
                                }}
                            >
                                Deny
                            </Button>
                        </div>
                    ))
                ) : (
                    <p>No trade requests yet.</p>
                )}
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default RequestCard;