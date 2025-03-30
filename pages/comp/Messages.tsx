import React, { useEffect, useState } from "react";
import { fetchUserData } from "../lib/User";
import App from "../../src/App.js";
import { userInfo } from "../lib/context/UserContext";

const Messages = () => {
    const [userId, setUserId] = useState<string>(""); // Explicit type

    useEffect(() => {
        (async function fetchData() {
            try {
                const {userData} = userInfo();
                if (userData && typeof userData.$id === "string") {
                    setUserId(userData.$id);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        })();
    }, []);

    return (
        <div className="messages-container">
            <App />
        </div>
    );
};

export default Messages;