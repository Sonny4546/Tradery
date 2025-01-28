import '../src/main.css'
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { getCurrentSession } from './appwrite'

export default function UserDB() {
    useEffect(() => {
        getCurrentSession();
    });
    return (
        <>
        <div class="uWholeBox" bg="primary"> 
            <a class="HomeButton" href="#/Home">
            <svg height="0.8em" width="0.8em" viewBox="0 0 2 1" preserveAspectRatio="none">
            <polyline
                    fill="none" 
                    stroke="#000000" 
                    stroke-width="0.1" 
                    points="0.9,0.1 0.1,0.5 0.9,0.9" 
            />
            </svg> Home
            </a>
            <div class="uLooks"> Dashboard </div>
        </div>
        <div class ="NaviBar">
            <ul bg="primary">
                <li><NavLink to="/Dashboard/Post">Post</NavLink></li>
                <li><NavLink to="/Dashboard/Items">Your Items</NavLink></li>
                <li><NavLink to="/Dashboard/Requests">Requests</NavLink></li>
                <li><NavLink to="/Dashboard/Messages#view-messages">Messages</NavLink></li>
                <li><NavLink to="/Dashboard/Profile">Profile</NavLink></li>
            </ul>
            <Outlet/>
        </div>
        </>
    )
}