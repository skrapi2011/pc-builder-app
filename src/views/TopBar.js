import {Link} from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../css/TopBar.css';

const TopBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const role = localStorage.getItem('role');
        const storedUsername = localStorage.getItem('username');
        if (role) {
            setIsLoggedIn(true);
            setUserRole(role);
        }
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUserRole('');
        setUsername('');
    };

    return (
        <div className="bar-container">
            <Link className='bar-title' to='/'>Składanie komputerów</Link>
            <div>
                {isLoggedIn && (
                    <span className='welcome-message'>Witaj, {username}</span>
                )}
                {userRole === 'Admin' && (
                    <Link className='manage-button' to='/manage'>Zarządzaj</Link>
                )}
                {isLoggedIn && (
                    <Link className='builds-button' to='/builds'>Zestawy</Link>
                )}
                {isLoggedIn ? (
                    <button className='login-button' onClick={handleLogout}>Wyloguj się</button>
                ) : (
                    <Link className='login-button' to='/login'>Zaloguj się</Link>
                )}
            </div>
        </div>
    );
};

export default TopBar;
