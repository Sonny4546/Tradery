import { Navigate } from "react-router-dom";
import { userInfo } from "../pages/lib/context/UserContext"; // Adjust path as needed
import React from "react";

const MainProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { userData } = userInfo(); // Get user data from context

    if (!userData) {
        return <Navigate to="/" replace />;  // Redirect to login if not logged in
    }

    return <>{children}</>;
};

export default MainProtectedRoute;