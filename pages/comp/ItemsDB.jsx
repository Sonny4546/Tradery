import React from 'react'
import { useEffect } from "react";
import { useAuth } from '../lib/AuthHook';

const Items = () => { 
    const { NoSessionCheck } = useAuth();
    useEffect(() => {
        NoSessionCheck();
    }, []);
    return(
        <>
        <h1>ITEMS</h1>
        </>
    )
}
export default Items