import React, { useEffect, useState } from "react";
import { fetchUserData } from "../lib/User";

const Messages = () => {
    const [userId, setUserId] = useState<string>(""); // Explicit type

    useEffect(() => {
        (async function fetchData() {
            try {
                const user = await fetchUserData();
                console.log("Fetched User Data:", user); // ✅ Debugging
                if (user && typeof user.$id === "string") {
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
            <iframe 
                width="100%"
                height="100%"
                src={srclink}
                title="TraderyMessenger"
            />
        </div>
    );
};

export default Messages;