import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <div className="home">
            <div className="hero">
                <div className="hero-text">
                    <h1>Welcome to the Blood Bank</h1>
                    <p>Your contribution can save lives. Register as a donor or request blood.</p>
                    <button className="hero-button" onClick={handleGetStarted}>Get Started</button>
                </div>
            </div>
            <div className="reviews">
                <h2>What Our Donors and Recipients Say</h2>
                <div className="review-list">
                    <div className="review">
                        <p>"Donating blood was a smooth process and it feels great to help others."</p>
                        <h4>- Indu</h4>
                    </div>
                    <div className="review">
                        <p>"I received blood during surgery, and I'm so grateful to the donors."</p>
                        <h4>- Lubna</h4>
                    </div>
                    <div className="review">
                        <p>"The blood bank staff was very professional and made me feel comfortable."</p>
                        <h4>- Melonica</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
