import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import loginImage from './b0dc8f35-3126-4eae-b575-38285553c9a4.jpg';

const Login = ({ setIsLoggedIn, setIsAdmin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = {
            userEmail: email,
            Password: password
        };
    
        try {
            const response = await axios.post('http://localhost:3002/blood_donar/autenticate/login', data, {
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (response.status === 200 && response.data.token) {
                const { user_id } = response.data.results[0];
                const { token } = response.data;
    
                localStorage.setItem('authToken', token);
                localStorage.setItem('user_id', user_id);
    
                setIsLoggedIn(true);
                setIsAdmin(user_id === 1);
    
                if (user_id === 1) {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setErrorMessage(response.data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);  // Added logging for debugging
            setErrorMessage(error.response?.data?.message || 'An error occurred during login. Please try again.');
        }
    };
    

    return (
        <div className="login-container">
            <div className="login-image">
                <img src={loginImage} alt="Login" />
            </div>
            <div className="login-form">
                <h2>Login</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <div className="signup-link">
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
