import React from 'react'
import { CheckSession } from '../Authenticate'
import { useState, useEffect } from "react";

const Messages = () => {
    useEffect(() => {
        CheckSession();
    });
    return(
        <>
        <div class="messages-container">
            <iframe width="1920"
                    height="1080"
                    src="https://lynxlenior.github.io/TraderyMessenger/"
                    title="TraderyMessenger">
            </iframe>
        </div>
        </>
    )
}
export default Messages