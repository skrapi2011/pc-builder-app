import React, {useState} from 'react';
import '../css/Register.css';
import TopBar from "./TopBar";
import Footer from "./Footer";

const RegisterPane = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, name, surname, email, password }),
            });

            if (response.ok) {
                setMessage('Rejestracja przebiegła pomyślnie.');
                setUsername('');
                setName('');
                setSurname('');
                setEmail('');
                setPassword('');
            } else if (response.status === 409) {
                setMessage('Użytkownik o podanej nazwie już istnieje!');
            } else {
                throw new Error('Błąd serwera');
            }
        } catch (error) {
            setMessage('Wystąpił błąd podczas rejestracji');
        }
    };

    return (
        <div className='registration'>
            <div className="registration-container">
                <div className="registration-header">
                    <h2>Rejestracja</h2>
                </div>
                <form onSubmit={handleRegister} className="registration-form">
                    <div className="form-register">
                        <label htmlFor="username">Nazwa użytkownika:</label>
                        <input type="text" id="username" name="username" maxLength="25"
                               value={username} onChange={e => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-register">
                        <label htmlFor="name">Imię:</label>
                        <input type="text" id="name" name="name" maxLength="25"
                               value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                    <div className="form-register">
                        <label htmlFor="surname">Nazwisko:</label>
                        <input type="text" id="surname" name="surname" maxLength="25"
                               value={surname} onChange={e => setSurname(e.target.value)} required />
                    </div>
                    <div className="form-register">
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" id="email" name="email" maxLength="25"
                               value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-register">
                        <label htmlFor="password">Hasło:</label>
                        <input type="password" id="password" name="password" minLength="6" maxLength="25"
                               value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="form-register">
                        <button type="submit" id="register-button">Zarejestruj się</button>
                    </div>
                    {message && <p className="registration-message" >{message}</p>}
                </form>
            </div>
        </div>
    );

}


const Register = () => {

    return (
        <div>
            <TopBar />
            <RegisterPane />
            <Footer />
        </div>
    );

}

export default Register;