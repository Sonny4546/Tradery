import '../src/main.css'
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { sessioncheck } from './Authenticate'

export default function UserDB() {
    useEffect(() => {
        sessioncheck()
    });
    return (
        <>
        <div class="uWholeBox"> 
            <a class="errorButton" href="#/Home">
            <svg height="0.8em" width="0.8em" viewBox="0 0 2 1" preserveAspectRatio="none">
            <polyline
                    fill="none" 
                    stroke="#777777" 
                    stroke-width="0.1" 
                    points="0.9,0.1 0.1,0.5 0.9,0.9" 
            />
            </svg> Home
            </a>
            <div class="uLooks"> User Dashboard </div>
        </div>
        <div class ="NaviBar">
            <ul>
                <li><NavLink to="/Dashboard/Profile">Profile</NavLink></li>
                <li><NavLink to="/Dashboard/Messages">Messages</NavLink></li>
                <li><NavLink to="/Dashboard/Post">Post</NavLink></li>
                <li><NavLink to="/Dashboard/Items">Your Items</NavLink></li>
                <li><NavLink to="/Dashboard/Requests">Requests</NavLink></li>
            </ul>
            <Outlet/>
        </div>
        </>
    )
}