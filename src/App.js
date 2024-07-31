import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './screens/Home';
import DonorRegistration from './screens/DonorRegistration';
import BloodRequest from './screens/BloodRequest';
import Inventory from './screens/Inventory';
import About from './screens/About';
import Contact from './screens/Contact';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donor-registration" element={<DonorRegistration />} />
            <Route path="/blood-request" element={<BloodRequest />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
