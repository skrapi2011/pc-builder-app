import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TopBar from './TopBar';
import Footer from "./Footer";
import '../css/Login.css';

const LoginPane = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await login({ username, password });
        
        if (result.success) {
            window.location.href = '/';
        } else {
            setMessage(result.message);
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-container">
                <h2>Logowanie</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-login">
                        <label className="login-label" htmlFor="username">Nazwa użytkownika:</label>
                        <input type="text" id="login-username" name="username" value={username} required
                               onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="form-login">
                        <label className="login-label" htmlFor="password">Hasło:</label>
                        <input type="password" id="login-password" name="password" value={password} required
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
