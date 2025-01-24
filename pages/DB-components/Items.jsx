import React from 'react'
import { CheckSession } from '../Authenticate'
import { useState, useEffect } from "react";

const Items = () => { 
    useEffect(() => {
        CheckSession();
    });
    return(
        <>
        <h1>ITEMS</h1>
        </>
    )
}
export default Items