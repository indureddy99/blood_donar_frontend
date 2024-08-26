import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, isAdmin, handleLogout }) => {
    return (
        <nav className="navbar">
            <h1>Blood Bank</h1>
            <ul>
                {!isLoggedIn && (
                    <li><Link to="/">Home</Link></li>
                )}
                
                {isLoggedIn && !isAdmin && (
                    <>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/donor-registration">Donate Blood</Link></li>
                        <li><Link to="/blood-request">Request Blood</Link></li>
                        <li><Link to="/inventory">Inventory</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </>
                )}

                {isLoggedIn && isAdmin && (
                    <>
                        <li><Link to="/admin-dashboard">Dashboard</Link></li>
                        <li><Link to="/admin-inventory">Inventory</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/admin-contact">Contact</Link></li>
                    </>
                )}

                {isLoggedIn ? (
                    <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
