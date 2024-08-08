import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SignUp.css';
import signUpImage from './b0dc8f35-3126-4eae-b575-38285553c9a4.jpg';

const SignUp = () => {
    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        mobileNo: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = JSON.stringify(formData);

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3002/blood_donar/autenticate/create',
            headers: { 
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            const response = await axios.request(config);
            console.log(JSON.stringify(response.data));

            if (response.status === 200) {
                // Assuming the response contains a success message or a token
                navigate('/login'); // Redirect to login page on successful signup
            } else {
                setErrorMessage(response.data.message || 'Signup failed');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred during signup. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-image">
                <img src={signUpImage} alt="Sign Up" />
            </div>
            <div className="signup-form">
                <h2>Sign Up</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="userName">Username:</label>
                        <input 
                            type="text" 
                            id="userName" 
                            name="userName" 
                            value={formData.userName}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            value={formData.firstName}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input 
                            type="text" 
                            id="lastName" 
                            name="lastName" 
                            value={formData.lastName}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={formData.password}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input 
                            type="text" 
                            id="address" 
                            name="address" 
                            value={formData.address}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobileNo">Mobile Number:</label>
                        <input 
                            type="text" 
                            id="mobileNo" 
                            name="mobileNo" 
                            value={formData.mobileNo}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                <div className="login-link">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
