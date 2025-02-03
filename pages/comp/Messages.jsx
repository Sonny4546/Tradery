import React from 'react'
import { useEffect } from "react";
import { useAuth } from '../lib/AuthHook';
import { useNavigate } from 'react-router-dom';

const Messages = () => {
    const { session } = useAuth();
    useEffect(() => {
        if (!session) {
            const navigate = useNavigate()
            return navigate('https://sonny4546.github.io/Tradery/')
          }
    }, []);
    return(
        <>
        <div class="messages-container">
            <iframe width="100%"
                    height="100%"
                    src="https://lynxlenior.github.io/TraderyMessenger/"
                    title="TraderyMessenger">
            </iframe>
            <div id="view-messages"></div>
        </div>
        </>
    )
}
export default Messages