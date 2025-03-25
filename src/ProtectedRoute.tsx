import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../pages/lib/firebase"; // Ensure correct path
import React from "react";
import { getUser } from "../pages/lib/appwrite";

const ADMIN_EMAIL = "bagus.anselliam@ue.edu.ph"; // Change this if needed

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    (async function fetchItems() {
      // ✅ Ensure userData is available before making API calls
      const userData = await getUser();
      if (!userData) return;
      if (userData.email === ADMIN_EMAIL) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    })();
  }, []);

  if (isAdmin === null) return <p>Loading...</p>; // Show loading state while checking

  return isAdmin ? children : <Navigate to="/" />;
};

export default ProtectedRoute;