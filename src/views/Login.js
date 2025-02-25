import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import TopBar from './TopBar';
import Footer from "./Footer";
import '../css/Login.css';

const LoginPane = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLogged, setIsLogged] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const userRole = data.role;
                const username = data.username;
                localStorage.setItem('role', userRole);
                localStorage.setItem('username', username);
                setIsLogged(true);

            } else {
                setMessage('Nieprawidłowe login lub hasło');
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas logowania', error);
            setMessage('Wystąpił błąd podczas logowania');
        }
    };

    if (isLogged) {
        return <Navigate to="/" />;
    }

    return (
        <div className="login-page-container">
            <div className="login-container">
                <h2>Logowanie</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-login">
                        <label className="login-label" htmlFor="username">Nazwa użytkownika:</label>
                        <input type="text" id="login-username" name="username" required
                               onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="form-login">
                        <label className="login-label" htmlFor="password">Hasło:</label>
                        <input type="password" id="login-password" name="password" required
                               onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-login">
                        <button type="submit" id="login-button">Zaloguj</button>
                    </div>
                    {message && <div className="login-message">{message}</div>}
                    <div className="form-login">
                        <p>Nie masz konta? <Link to='/register'>Zarejestruj się</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Login = () => {
    return (
        <div>
            <TopBar />
            <LoginPane />
            <Footer />
        </div>
    );
}

export default Login;
