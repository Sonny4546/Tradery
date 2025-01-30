import React from 'react'
import { useEffect } from "react";
import { useAuth } from '../AuthHook';

const Requests = () => { 
    const { NoSessionCheck } = useAuth();
    useEffect(() => {
        NoSessionCheck();
    }, []);
    return(
        <>
        <h1>REQUESTS</h1>
        </>
    )
}
export default Requests