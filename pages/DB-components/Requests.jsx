import React from 'react'
import { sessioncheck } from './Authenticate'
import { useState, useEffect } from "react";

const Requests = () => { 
    useEffect(() => {
        sessioncheck()
    });
    return(
        <>
        <h1>REQUESTS</h1>
        </>
    )
}
export default Requests