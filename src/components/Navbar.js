import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Blood Bank</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/donor-registration">Register as Donor</Link></li>
                <li><Link to="/blood-request">Request Blood</Link></li>
                <li><Link to="/inventory">Inventory</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
