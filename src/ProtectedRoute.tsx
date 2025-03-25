import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../pages/lib/firebase"; // Ensure correct path
import React from "react";

const ADMIN_EMAIL = "bagus.anselliam@ue.edu.ph"; // Change this if needed

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setIsAdmin(user?.email === ADMIN_EMAIL);
    });

    return () => unSub();
  }, []);

  if (isAdmin === null) return <p>Loading...</p>; // Show loading state while checking

  return isAdmin ? children : <Navigate to="/" />;
};

export default ProtectedRoute;