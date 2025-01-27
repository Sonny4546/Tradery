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
import { Redirect } from "wouter";

const PrivateRoutes = () => {
  const session = useAuth();
  if (!session) {
    return (
      <Redirect to="/" />
    )
  }
}

// export default function App() {
//   return (
//     <Routes>
//         {/* <Route element={<PrivateRoutes/>}> */}
//           <Route path="/Home" element={<HomePage/>} />
//           <Route path="/Dashboard" element={<DBPage/>} />
//           <Route path="/Dashboard/Profile" element={<Profile/>} />
//           <Route path="/Dashboard/Messages" element={<Messages/>} />
//           <Route path="/Dashboard/Post" element={<Post/>} />
//           <Route path="/Dashboard/Items" element={<Items/>} />
//           <Route path="/Dashboard/Requests" element={<Requests/>} />
//         {/* </Route> */}
//         <Route path="/" element={<LoginPage />} />
//         <Route path="*" element={<ErrorPage />} />
//     </Routes>
//   );
// };


// {
//   path: "/", element: <LoginPage />,
//   errorElement: <ErrorPage />,
// },
// {
//   path: "/Home", element: <HomePage />,
//   errorElement: <ErrorPage />,
// },
// {
//   path: "/Dashboard", element: <DBPage />,
//   errorElement: <ErrorPage />,
//   children:[
//     {path: "/Dashboard/Profile", element: <Profile />},
//     {path: "/Dashboard/Messages", element: <Messages />},
//     {path: "/Dashboard/Post", element: <Post />},
//     {path: "/Dashboard/Items", element: <Items />},
//     {path: "/Dashboard/Requests", element: <Requests />},
//   ]
// },

// const router = createHashRouter([
//   <Router>
//     <Route path="/" element={<LoginPage />} />
//     <Route path="*" element={<ErrorPage />} />
//       {/* <Route element={<PrivateRoutes/>}> */}
//         <Route path="/Home" element={<HomePage/>} />
//         <Route path="/Dashboard" element={<DBPage/>} />
//         <Route path="/Dashboard/Profile" element={<Profile/>} />
//         <Route path="/Dashboard/Messages" element={<Messages/>} />
//         <Route path="/Dashboard/Post" element={<Post/>} />
//         <Route path="/Dashboard/Items" element={<Items/>} />
//         <Route path="/Dashboard/Requests" element={<Requests/>} />
//       {/* </Route> */}
//   </Router>
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<LoginPage />}
      errorElement={<ErrorPage />}>
      <Route element={<PrivateRoutes/>}>
        <Route 
          path="/Home" 
          element={<HomePage/>} 
          errorElement={<ErrorPage />} />
      </Route>
    </Route>

  ),
  { basename: "/Tradery" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
