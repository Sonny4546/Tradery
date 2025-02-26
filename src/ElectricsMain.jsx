import * as React from "react";
import * as ReactDOM from "react-dom/client";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './bs-mdf.css'
import 'bootstrap'
import 'react-bootstrap'
import './main.css'
import LoginPage from "../pages/Login";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/Error";
import DBPage from "../pages/UserDB";
import Profile from "../pages/comp/Profile";
import Messages from "../pages/comp/Messages";
import Post from "../pages/comp/Post";
import Items from "../pages/comp/ItemsDB";
import Requests from "../pages/comp/Requests";
import ItemContent from "../pages/comp/[itemId]"
import UserContent from "../pages/comp/[profileId]"
import AdminPage from "../pages/Admin"
import { AuthProvider, useAuth } from "../pages/lib/AuthHook";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Footer from "../pages/comp/Footer";
import Layout from "../pages/comp/Layout";

const main = createHashRouter([
  {
    path: "/",
    element: <Layout />, // Use Layout as the main wrapper
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/Admin", element: <AdminPage /> },
      { path: "/Home", element: <HomePage /> },
      { path: "/Item/:itemsId", element: <ItemContent /> },
      { path: "/User/:profileId", element: <UserContent /> },
      {
        path: "/Dashboard",
        element: <DBPage />,
        children: [
          { path: "Post", element: <Post /> },
          { path: "Profile", element: <Profile /> },
          { path: "Items", element: <Items /> },
          { path: "Requests", element: <Requests /> },
          { path: "Messages", element: <Messages /> },
        ],
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={main} />
      <Footer></Footer>
    </AuthProvider>
  </React.StrictMode>,
)
