import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Manage from "./views/Manage";
import Component from "./views/Component";
import Builds from "./views/Builds";
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
    const [userRole, setUserRole] = useState(localStorage.getItem('role') || '');

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role) {
            setUserRole(role);
        }
    }, []);

    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route 
                                path="/manage" 
                                element={
                                    <ProtectedRoute requiredRole="Admin">
                                        <Manage />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                exact path="/component/:id" 
                                element={
                                    <ProtectedRoute>
                                        <Component />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/builds" 
                                element={
                                    <ProtectedRoute>
                                        <Builds />
                                    </ProtectedRoute>
                                } 
                            />
                        </Routes>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;