import React from 'react'
import { useEffect } from "react";
import { useAuth } from '../AuthHook';

const Requests = () => { 
    useEffect(() => {
        const { NoSessionCheck } = useAuth();
        NoSessionCheck();
    });
    return(
        <>
        <h1>REQUESTS</h1>
        </>
    )
}
export default Requests