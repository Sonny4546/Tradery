import React from 'react'
import { sessioncheck } from '../Authenticate'
import { useState, useEffect } from "react";

const Messages = () => {
    useEffect(() => {
        sessioncheck()
    });
    return(
        <>
        <h1>MESSAGES</h1>
        </>
    )
}
export default Messages