import React from 'react';
import './About.css';
import bloodBankImage from './aimodosia1511533917.webp';

const About = () => {
    return (
        <div className="about-us">
            <div className="about-us-image">
                <img src={bloodBankImage} alt="Blood Bank" />
            </div>
            <div className="about-us-content">
                <h1>About Us</h1>
                <p>
                    Welcome to our Blood Bank, where saving lives is our mission. We are dedicated to providing
                    a reliable and safe supply of blood to those in need. Our team works tirelessly to ensure
                    that every donation counts, and every life is given a chance. We collaborate with hospitals,
                    communities, and volunteers to maintain a robust inventory of all blood types.
                </p>
                <p>
                    Founded on the principles of compassion, integrity, and service, our Blood Bank strives to
                    be a beacon of hope for those facing medical challenges. Join us in our mission to make a
                    difference, one drop at a time.
                </p>
            </div>
        </div>
    );
};

export default About;
