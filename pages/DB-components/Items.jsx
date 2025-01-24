import React from 'react'
import { sessioncheck } from '../Authenticate'
import { useState, useEffect } from "react";

const Items = () => { 
    useEffect(() => {
        sessioncheck()
    });
    return(
        <>
        <h1>ITEMS</h1>
        </>
    )
}
export default Items