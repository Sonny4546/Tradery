import React from 'react'
import { useEffect } from "react";
import { useAuth } from '../lib/AuthHook';
import { useNavigate } from 'react-router-dom';

const Requests = () => { 
    const { session } = useAuth();
    useEffect(() => {
        if (!session) {
            const navigate = useNavigate()
            return navigate('https://sonny4546.github.io/Tradery/')
          }
    }, []);
    return(
        <>
        <h1>REQUESTS</h1>
        </>
    )
}
export default Requests