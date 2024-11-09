import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './main.css'
import LoginPage from "./root";
import ErrorPage from "./error";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/", element: <LoginPage />,
    errorElement: <ErrorPage />,
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
