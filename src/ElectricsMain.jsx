import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Client} from 'appwrite';
import './main.css'
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import ErrorPage from "../pages/Error";


const client = new Client();
client.setProject('678ba12f001dce105c6a');

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

const router = createHashRouter([
  {
    path: "/", element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Home", element: <HomePage />,
  },
]);

import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1000212830777-k85n77vef4cbrma455a9ufpafl6sl316.apps.googleusercontent.com">
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
