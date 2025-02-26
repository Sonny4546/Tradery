import React, { useEffect, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { getUserDataById } from '../lib/UserProfile';
import { useAutoSearchAndAdd } from "../lib/firebase"

interface ItemCardProps {
    name: string;
    userId: string[] | undefined;
    eventKey: string;
}

interface UserRequest {
    displayName: string;
    appwriteName: string;
}

async function messageUser(username: string) {
    try {
        await useAutoSearchAndAdd(username);
        console.log(username)
    } catch {
        console.log("Failed to add chat")
    }
}

const RequestCard = ({ name, userId, eventKey }: ItemCardProps) => {
    const [userRequests, setUserRequests] = useState<UserRequest[]>([]);

    useEffect(() => {
        (async function fetchUsers() {
            if (!userId || userId.length === 0) return;

            const usersData = await Promise.all(
                userId.map(async (id) => {
                    try {
                        const { userdb } = await getUserDataById(id);
                        const displayName = userdb?.displayName || userdb?.defaultName || "";
                        const appwriteName = userdb?.defaultName || "";

                        return displayName || appwriteName
                            ? { displayName, appwriteName }
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

    return (
        <Accordion.Item eventKey={eventKey}>
            <Accordion.Header>{name}</Accordion.Header>
            <Accordion.Body>
                {userRequests.length > 0 ? (
                    userRequests.map((user, index) => (
                        <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                            <p className="mb-0">
                                <strong>{user.displayName}</strong> wants to trade.
                            </p>
                            <Button variant="primary" size="sm" onClick={() => messageUser(user.appwriteName)}>Message</Button>
                        </div>
                    ))
                ) : (
                    <p>No trade requests found.</p>
                )}
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default RequestCard;