import React from 'react'
import { getCurrentSession } from '../appwrite'
import { useState, useEffect } from "react";

const Requests = () => { 
    useEffect(() => {
        getCurrentSession();
    });
    return(
        <>
        <h1>REQUESTS</h1>
        </>
    )
}
export default Requests