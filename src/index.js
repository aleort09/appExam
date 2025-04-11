import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Profile from "./components/Profile";
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";
import ViewUser from "./components/ViewUser";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/create" element={<CreateUser />} />
            <Route path="/edit/:id" element={<EditUser />} />
            <Route path="/view/:id" element={<ViewUser />} />
            <Route path="/perfil" element={<Profile />} />
        </Routes>
    </Router>
);