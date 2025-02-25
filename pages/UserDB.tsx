import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './lib/AuthHook';
import { Modal, Spinner } from 'react-bootstrap';
import '../src/main.css';

export default function UserDB() {
    const { session } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // State to manage loading modal

    useEffect(() => {
        const checkSession = async () => {
            if (!session) {
                navigate("/"); // Redirect unauthorized users
                return;
            }
            setLoading(false); // Hide modal when session is verified
        };

        checkSession();
    }, [session, navigate]);

    return (
        <>
        {/* Bootstrap Modal for Loading Indicator */}
        <Modal show={loading} centered backdrop="static">
            <Modal.Body className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p className="mt-3">Verifying session...</p>
            </Modal.Body>
        </Modal>

        {/* Only render the dashboard once session is verified */}
        {!loading && (
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
            </>
        )}
        </>
    );
}
