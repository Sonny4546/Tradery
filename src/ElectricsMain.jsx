import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './main.css'
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import ErrorPage from "../pages/Error";
import DBPage from "../pages/UserDB";
import Profile from "../pages/DB-components/Profile";
import Messages from "../pages/DB-components/Messages";
import Post from "../pages/DB-components/Post";
import Items from "../pages/DB-components/Items";
import Requests from "../pages/DB-components/Requests";

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
  {
    path: "/Dashboard", element: <DBPage />,
  },
  {
    path: "/Profile", element: <Profile />,
    path: "/Messages", element: <Messages />,
    path: "/Post", element: <Post />,
    path: "/Items", element: <Items />,
    path: "/Requests", element: <Requests />,
  },
]);

import { GoogleOAuthProvider } from '@react-oauth/google';
import Profile from "../pages/DB-components/Profile";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1000212830777-k85n77vef4cbrma455a9ufpafl6sl316.apps.googleusercontent.com">
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
