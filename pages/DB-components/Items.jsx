import React from 'react'
import { getCurrentSession } from '../appwrite'
import { useState, useEffect } from "react";

const Items = () => { 
    useEffect(() => {
        getCurrentSession();
    });
    return(
        <>
        <h1>ITEMS</h1>
        </>
    )
}
export default Items