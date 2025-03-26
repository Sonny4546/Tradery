import React, { useEffect, useState } from "react";
import { fetchUserData } from "../lib/User";
import App from "../../src/App.js";

const Messages = () => {
    const [userId, setUserId] = useState<string>(""); // Explicit type

    useEffect(() => {
        (async function fetchData() {
            try {
                const user = await fetchUserData();
                console.log("Fetched User Data:", user); // ✅ Debugging
                if (user && typeof user.$id === "string") {
                    console.log("Setting userId:", user.$id);
                    setUserId(user.$id);
                } else {
                    console.log("Invalid user data:", user);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        })();
    }, []);

    useEffect(() => {
        console.log("Current userId state:", userId);
    }, [userId]);

    return (
        <div className="messages-container">
            <App />
        </div>
    );
};

export default Messages;