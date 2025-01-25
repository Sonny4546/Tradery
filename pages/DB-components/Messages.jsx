import React from 'react'
import { CheckSession } from '../appwrite'
import { useState, useEffect } from "react";

const Messages = () => {
    useEffect(() => {
        CheckSession();
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