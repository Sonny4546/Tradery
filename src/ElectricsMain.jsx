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
import ItemContent from "../pages/comp/[itemId]"
import EditProfile from "../pages/comp/EditProfile"
import AdminPage from "../pages/Admin"
import { AuthProvider, useAuth } from "../pages/lib/AuthHook";
import { HashRouter as Routes } from "react-router-dom";
import { Router as WouterRouter, Router, Route } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";

const MainRouter = () => {
  return (
    <Router hook={useHashLocation}>
      <WouterRouter >
        <Route path="/" element={<LoginPage />} />
        <Route path="/Admin" element={<AdminPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Item/:itemsId" element={<ItemContent />} />
        <Route path="/Dashboard" element={<DBPage />}>
          <Route path="Post" element={<Post />} />
          <Route path="Profile" element={<Profile />}>
            <Route path="Edit" element={<EditProfile />} />
          </Route>
          <Route path="Items" element={<Items />} />
          <Route path="Requests" element={<Requests />} />
          <Route path="Messages" element={<Messages />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </WouterRouter>
    </Router>
  );
};


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  </React.StrictMode>,
)
