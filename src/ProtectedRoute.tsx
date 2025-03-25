import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../pages/lib/firebase"; // Ensure correct path
import React from "react";
import { getUser } from "../pages/lib/appwrite";

const ADMIN_EMAIL = "bagus.anselliam@ue.edu.ph"; // Change this if needed

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUser();
        if (userData && userData.email === ADMIN_EMAIL) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>; // Show loading state while checking

  return isAdmin ? children : null; // Show children if admin, otherwise show nothing
};

export default ProtectedRoute;