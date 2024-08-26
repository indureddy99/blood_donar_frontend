import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './screens/Home';
import DonorRegistration from './screens/DonorRegistration';
import BloodRequest from './screens/BloodRequest';
import Inventory from './screens/Inventory';
import About from './screens/About';
import Contact from './screens/Contact';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Dashboard from './screens/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './screens/AdminDashboard';
import AdminInventory from './screens/AdminInventory';
import ContactList from './screens/ContactList';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('user_id');

    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(userId === '1');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user_id');
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar 
          isLoggedIn={isLoggedIn} 
          isAdmin={isAdmin} 
          handleLogout={handleLogout} 
        />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donor-registration" element={<DonorRegistration />} />
            <Route path="/blood-request" element={<BloodRequest />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-inventory" element={<AdminInventory />} />
            <Route path="/admin-contact" element={<ContactList />} />
            
            
            {/* Protect the Dashboard route */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
