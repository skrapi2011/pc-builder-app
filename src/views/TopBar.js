import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../css/TopBar.css';

const TopBar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="bar-container">
            <Link to="/" className="bar-title">PC Builder</Link>
            <div className="bar-right">
                {user && (
                    <>
                        <span className="welcome-message">Witaj, {user.username}</span>
                        <Link to="/builds" className="builds-button">Moje zestawy</Link>
                        {user.role === 'Admin' && (
                            <Link to="/manage" className="manage-button">Panel admina</Link>
                        )}
                        <button onClick={logout} className="login-button">Wyloguj</button>
                    </>
                )}
                {!user && (
                    <Link to="/login" className="login-button">Zaloguj</Link>
                )}
            </div>
        </div>
    );
};

export default TopBar;