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
import ProtectedRoute from "./ProtectedRoute";
import AdminChat from "./components/admin/Admin";
import { AuthProvider, useAuth } from "../pages/lib/AuthHook";
import { RouterProvider, createHashRouter } from "react-router-dom";

const main = createHashRouter([
  {
    path: "/", element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Admin", element: <AdminPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/Admin-Chat",
    element: (
      <ProtectedRoute>
        <AdminChat />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/Home", element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Item/:itemsId", element: <ItemContent />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/User/:profileName", element: <UserContent />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Dashboard", element: <DBPage />,
    errorElement: <ErrorPage />,
    children: [
      {path: "/Dashboard/Post", element: <Post />},
      {path: "/Dashboard/Profile", element: <Profile />},
      {path: "/Dashboard/Items", element: <Items />},
      {path: "/Dashboard/Requests", element: <Requests />},
      {path: "/Dashboard/Messages", element: <Messages />},
    ]
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={main} />
    </AuthProvider>
  </React.StrictMode>,
)
