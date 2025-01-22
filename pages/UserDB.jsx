import '../src/main.css'
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'

export default function UserDB() {
    return (
        <>
        <div class="uWholeBox"> 
            <div class="uLooks"> User Dashboard </div>
        </div>
        <div class ="NaviBar">
            <ul>
                <li><NavLink to="/Profile">Profile</NavLink></li>
                <li><NavLink to="/Messages">Messages</NavLink></li>
                <li><NavLink to="/Post">Post</NavLink></li>
                <li><NavLink to="/Items">Your Items</NavLink></li>
                <li><NavLink to="/Requests">Requests</NavLink></li>
            </ul>
            <Outlet/>
        </div>
        </>
    )
}