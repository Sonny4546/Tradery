import * as React from "react";
import * as ReactDOM from "react-dom/client";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './main.css'
import './bs-mdf.css'
import 'bootstrap'
import 'react-bootstrap'
import LoginPage from "../pages/Login";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/Error";
import DBPage from "../pages/UserDB";
import Profile from "../pages/comp/Profile";
import Messages from "../pages/comp/Messages";
import Post from "../pages/comp/Post";
import Items from "../pages/comp/ItemsDB";
import Requests from "../pages/comp/Requests";
import ItemContent from "../pages/comp/ViewItem"
import { AuthProvider, useAuth } from "../pages/lib/AuthHook";
import { RouterProvider, HashRouter, createHashRouter, Route, Router, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

const main = createHashRouter([
  {
    path: "/", element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Home", element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {path: "/Item/:itemsId", element: <ItemContent />,
        errorElement: <ErrorPage/>,
      }
    ]
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
