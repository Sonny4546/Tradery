import * as React from "react";
import * as ReactDOM from "react-dom/client";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './main.css'
import './bs-mdf.css'
import 'bootstrap'
import 'react-bootstrap'
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import ErrorPage from "../pages/Error";
import DBPage from "../pages/UserDB";
import Profile from "../pages/DB-components/Profile";
import Messages from "../pages/DB-components/Messages";
import Post from "../pages/DB-components/Post";
import Items from "../pages/DB-components/Items";
import Requests from "../pages/DB-components/Requests";
import { AuthProvider, useAuth } from "../pages/AuthHook";
import { RouterProvider, HashRouter, createHashRouter, Route, Router, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/", element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Home", element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Dashboard", element: <DBPage />,
    errorElement: <ErrorPage />,
    children:[
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
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
