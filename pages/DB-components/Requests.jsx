import React from 'react'
import { CheckSession } from '../Authenticate'
import { useState, useEffect } from "react";

const Requests = () => { 
    useEffect(() => {
        CheckSession();
    });
    return(
        <>
        <h1>REQUESTS</h1>
        </>
    )
}
export default Requests