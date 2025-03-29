import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Profile from "./components/Profile";
import CreateUser from "./components/CreateUser";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/create" element={<CreateUser/>}/>
            <Route path="/perfil" element={<Profile />} />
        </Routes>
    </Router>
);
