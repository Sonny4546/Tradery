import React from 'react'
import { CheckSession } from '../Authenticate'
import { useState, useEffect } from "react";

const Messages = () => {
    useEffect(() => {
        CheckSession();
    });
    return(
        <>
        <h1>MESSAGES</h1>
        </>
    )
}
export default Messages