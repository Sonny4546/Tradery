import React, { useEffect, useState } from "react";
import { fetchUserData } from "../lib/User";

const Messages = () => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        (async function fetchData() {
            try {
                const user = await fetchUserData();
                if (user?.$id) {
                    setUserId(user.$id);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        })();
    }, []);

    const srclink = userId ? `https://lynxlenior.github.io/TraderyMessenger/#/${userId}` : "";

    return (
        <div className="messages-container">
            {userId ? (
                <iframe 
                    width="100%"
                    height="100%"
                    src={srclink}
                    title="TraderyMessenger"
                />
            ) : (
                <p>Loading messages...</p>
            )}
        </div>
    );
};

export default Messages;