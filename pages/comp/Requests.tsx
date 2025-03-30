import React, { useEffect, useState } from "react";
import { useAuth } from "../lib/AuthHook";
import { useNavigate } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import { getItemsbyUser } from "../lib/Items";
import { TraderyItems } from "../lib/ItemsInterface";
import { fetchUserData } from "../lib/User";
import RequestCard from "./RequestCard";
import { userInfo } from "../lib/context/UserContext";

const Requests = () => {
    const [items, setItems] = useState<TraderyItems[]>([]); 

    useEffect(() => {
        (async function run() {
            const {userData} = userInfo();
            if (!userData) {
                console.log("User data is still loading. Please wait.");
                return;
            }
            const { items } = await getItemsbyUser(userData.$id);
            const filteredItems = items.filter((item) => item.requests && item.requests.length > 0);
            setItems(filteredItems);
        })();
    }, []);

    return (
        <div className="container">
            <h1>Your Items with Requests</h1>
            {items.length > 0 ? (
                <Accordion alwaysOpen> {/* Allows multiple open accordions */}
                    {items.map((item, index) => (
                        <RequestCard 
                            key={item.$id} 
                            name={item.name} 
                            userId={item.requests} 
                            eventKey={String(index)} // Unique key for each item
                        />
                    ))}
                </Accordion>
            ) : (
                <p>No items with requests found.</p>
            )}
        </div>
    );
};

export default Requests;