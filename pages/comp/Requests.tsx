import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { getItemsbyUser } from "../lib/Items";
import { TraderyItems } from "../lib/ItemsInterface";
import RequestCard from "./RequestCard";
import { userInfo } from "../lib/context/UserContext";

const Requests = () => {
    const [items, setItems] = useState<TraderyItems[]>([]); 
    const {userData} = userInfo();

    useEffect(() => {
        (async function run() {
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