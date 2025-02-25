import React, { useState, useEffect } from "react";
import { Button, Alert, useAccordionButton } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from "react-router-dom";

import { getItems, getItemsById, deleteItemById } from "../lib/Items";
import { getPreviewImageById } from "../lib/storage"
import { TraderyItems } from "../lib/ItemsInterface";
import HomeNav from "../HomeNav";
import { fetchUserData } from '../lib/User';
import { addRequest } from "../lib/Items";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "wouter";
import { useAuth } from "../lib/AuthHook";
import { getUserDataById, TraderyProfiles } from "../lib/UserProfile";
import { TraderyUser } from "../lib/GetUser";

export default function UserContent({ params = useParams() }: { params: { userId: string}}) {
    const [user, setUser] = useState<TraderyProfiles>();
    const [data, setData] = useState<TraderyUser>();
    const navigate = useNavigate();
    const [isRequesting, setRequest] = useState(false);
    const {isAdmin} = useAuth();
    const imageUrl = user?.profileImageId && getPreviewImageById(user.profileImageId)
    
    useEffect(() => {
        (async function run() {
            const { userdb } = await getUserDataById(params.userId);
            setUser(userdb);
            const userdata = await fetchUserData()
            if (userdata) {
                setData(userdata)
            }
        })();
    }, [params.userId]);

    return (
        <HomeNav>
            <div className="container">
                <div className="inputprofile">
                    <img 
                        className="profile"
                        src={imageUrl ? String(imageUrl) : "https://cloud.appwrite.io/v1/storage/buckets/678bac020031c1c3ad75/files/67b5f14b0018676748e5/view?project=678ba12f001dce105c6a&mode=admin"}
                        alt="Item"
                    />
                </div>
                <h1>{user?.displayName}</h1>
                <p>{data?.name}</p>
                <p>{user?.profileSummary}</p>
            </div>
        </HomeNav>
    )
}