import React from "react";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Outlet /> {/* This renders the current page */}
            <Footer /> {/* This will always be at the bottom */}
        </>
    );
};

export default Layout;