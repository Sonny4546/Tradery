import React, { useEffect, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { getUserDataById } from '../lib/UserProfile';
import { addUserToChat } from "../lib/firebase"
import { getUser } from '../lib/appwrite';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../lib/context/UserContext';

interface ItemCardProps {
    name: string;
    userId: string[] | undefined;
    eventKey: string;
}

interface UserRequest {
    displayName: string;
    appwriteName: string;
    firebaseId: string;
}

const RequestCard = ({ name, userId, eventKey }: ItemCardProps) => {
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

                        return displayName || appwriteName
                            ? { displayName, appwriteName, firebaseId }
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

    async function messageUser(targetUserId: string, currentUserId: string) {
        try {
            await addUserToChat(targetUserId, currentUserId);
            console.log("Done");
        } catch {
            console.log("Failed to add chat");
        } finally {
            navigate(`/Dashboard/Messages#view-messages`);
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
                                <strong>{user.displayName}</strong> wants to trade. The default username is <strong>{user.appwriteName}</strong>
                            </p>
                            <Button 
                                variant="primary" 
                                size="sm" 
                                onClick={() => {
                                    if (user.firebaseId && userdb.firebaseId) {
                                        messageUser(user.firebaseId, userdb.firebaseId);
                                    } else {
                                        console.error("Invalid user IDs");
                                    }
                                }}
                            >
                                Message
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