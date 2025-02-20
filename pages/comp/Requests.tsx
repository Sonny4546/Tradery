import React, { useEffect, useState } from "react";
import { useAuth } from "../lib/AuthHook";
import { useNavigate } from "react-router-dom";
import { getItemsbyUser } from "../lib/Items";
import { TraderyItems } from "../lib/ItemsInterface"; // Assuming TraderyItems interface is imported
import { fetchUserData } from "../lib/User";

const Requests = () => {
    const [items, setItems] = useState<TraderyItems[]>([]);  // Store filtered items
    const { session } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        (async function run() {
            const user = await fetchUserData();
            if (!user) {
                console.log("User data is still loading. Please wait.");
                return;
            }
            const { items } = await getItemsbyUser(user.$id);
            // Filter items that have at least one request
            const filteredItems = items.filter((item: TraderyItems) => item.requests?.length || 0 > 0);
            setItems(filteredItems);
            console.log(filteredItems);  // Log filtered items
        })();
    }, []);  // Run only once when the component mounts

    return (
        <div className="container">
            <h1>Your Items with Requests</h1>
            {/* Render the filtered items */}
            {items.length > 0 ? (
                items.map((item) => (
                    <div key={item.$id} className="item-card">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>Requests: {item.requests.length}</p>
                    </div>
                ))
            ) : (
                <p>No items with requests found.</p>
            )}
        </div>
    );
};

export default Requests;