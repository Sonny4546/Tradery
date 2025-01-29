import React from 'react'
import { useEffect } from "react";
import { useAuth } from '../AuthHook';

const Messages = () => {
    useEffect(() => {
        const { NoSessionCheck } = useAuth();
        NoSessionCheck();
    });
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