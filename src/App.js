import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Manage from "./views/Manage";
import Component from "./views/Component";
import Builds from "./views/Builds";

function App() {
    const [userRole, setUserRole] = useState(localStorage.getItem('role') || '');

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role) {
            setUserRole(role);
        }
    }, []);

    return (

        <Router>
            <div className="App">
                <div className="content">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/register" element={<Register />} />
                        {userRole === 'Admin' ? (
                            <Route exact path="/manage" element={<Manage />} />
                        ) : (
                            <Route exact path="/manage" element={<Navigate to="/login" />} />
                        )}
                        <Route exact path="/component/:id" element={<Component />} />
                        {userRole === 'Admin' || userRole === 'User' ? (
                            <Route exact path="/builds" element={<Builds />} />
                        ) : (
                            <Route exact path="/builds" element={<Navigate to="/login" />} />
                        )}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;