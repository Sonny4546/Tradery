import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './lib/AuthHook';
import { Modal, Spinner, Button } from 'react-bootstrap';
import Tutorial from './comp/Tutorial';
import '../src/main.css';

export default function UserDB() {
    const navigate = useNavigate();
  
    const [show, setShow] = useState(false);
    const handleClose = () => {
      setShow(false);
      navigate(`/Dashboard/Profile`)
    }
    const handleOpen = () => setShow(true);

    return (
        <>
        <Tutorial show={show} onHide={handleClose}/>
            <>
                <div className="uWholeBox"> 
                    <a className="HomeButton" href="#/Home">
                        <svg height="0.8em" width="0.8em" viewBox="0 0 2 1" preserveAspectRatio="none">
                            <polyline fill="none" stroke="#ffffff" strokeWidth="0.1" points="0.9,0.1 0.1,0.5 0.9,0.9" />
                        </svg> Home
                    </a>
                    <div className="uLooks"> Dashboard </div>
                </div>
                <div className="NaviBar">
                    <ul>
                        <li><NavLink to="/Dashboard/Post">Post</NavLink></li>
                        <li><NavLink to="/Dashboard/Items">Your Items</NavLink></li>
                        <li><NavLink to="/Dashboard/Requests">Requests</NavLink></li>
                        <li><NavLink to="/Dashboard/Messages#view-messages">Messages</NavLink></li>
                        <li><NavLink to="/Dashboard/Profile">Profile</NavLink></li>
                    </ul>
                    <Outlet/>
                </div>
                <Button variant={`outline-success`} onClick={handleOpen} className="tutorial">?</Button>
            </>
        </>
    );
}
