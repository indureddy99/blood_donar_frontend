import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DonorForm.css';

const DonorForm = () => {
    const [formData, setFormData] = useState({
        bloodType: '',
        amountOfBlood: '',
        donationDate: '',
        bloodBankId: ''
    });

    const [message, setMessage] = useState('');
    const [bloodBanks, setBloodBanks] = useState([]);

    useEffect(() => {
        // Fetch blood banks from the API
        axios.get('http://localhost:3002/blood_donar/inventorys')
            .then(response => {
                if (response.data && Array.isArray(response.data.data)) {
                    setBloodBanks(response.data.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            })
            .catch(error => {
                console.error('Failed to fetch blood banks:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const user_id = localStorage.getItem('user_id');
        if (!user_id) {
            setMessage('User ID not found. Please log in first.');
            return;
        }

        const donationData = {
            user_id: parseInt(user_id, 10),
            blood_type: formData.bloodType,
            amount_of_blood: parseFloat(formData.amountOfBlood),
            donation_date: formData.donationDate,
            blood_bank_id: parseInt(formData.bloodBankId, 10),
            expiry_date: calculateExpiryDate(formData.donationDate)
        };

        axios.post('http://localhost:3002/blood-donations', donationData)
            .then(response => {
                setMessage('Blood donation recorded successfully!');
            })
            .catch(error => {
                setMessage('Failed to record blood donation. Please try again.');
            });
    };

    // Calculate expiry date (42 days from donation date)
    const calculateExpiryDate = (donationDate) => {
        const date = new Date(donationDate);
        date.setDate(date.getDate() + 42);
        return date.toISOString().split('T')[0];
    };

    return (
        <div className="donor-form-container">
            <form className="donor-form" onSubmit={handleSubmit}>
                <h2>Donate Blood Form</h2>
                {message && <p className={`message ${message.includes('Failed') ? 'error' : ''}`}>{message}</p>}
                <label>
                    Blood Type:
                    <select name="bloodType" value={formData.bloodType} onChange={handleChange} required>
                        <option value="">Select Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </label>
                <label>
                    Amount of Blood (liters):
                    <input type="number" step="0.01" name="amountOfBlood" value={formData.amountOfBlood} onChange={handleChange} required />
                </label>
                <label>
                    Donation Date:
                    <input type="date" name="donationDate" value={formData.donationDate} onChange={handleChange} required />
                </label>
                <label>
                    Blood Bank:
                    <select name="bloodBankId" value={formData.bloodBankId} onChange={handleChange} required>
                        <option value="">Select Blood Bank</option>
                        {bloodBanks.map(bank => (
                            <option key={bank.blood_bank_id} value={bank.blood_bank_id}>
                                {bank.blood_bank_name || bank.location}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>

            <div className="donation-info">
                <h3>Who Can Donate Blood</h3>
                <ul>
                    <li>Be generally fit and well</li>
                    <li>Be aged between 17 and 65</li>
                    <li>Weigh between 7 stone 12 lbs (50kg) and 25 stone (158kg)</li>
                    <li>Have suitable veins (we will check these before you donate)</li>
                    <li>Meet all donor eligibility criteria (we will check this with you before you donate)</li>
                </ul>

                <h3>Who Can't Donate Blood</h3>
                <ul>
                    <li>Have had most types of cancer</li>
                    <li>Have some heart conditions</li>
                    <li>Have received blood, platelets, plasma or any other blood products after 1 January 1980</li>
                    <li>Have tested positive for HIV</li>
                    <li>Have had an organ transplant</li>
                    <li>Are a hepatitis B carrier</li>
                    <li>Are a hepatitis C carrier</li>
                    <li>Have injected non-prescribed drugs including body-building and injectable tanning agents. You may be able to give if a doctor prescribed the drugs</li>
                </ul>
            </div>
        </div>
    );
};

export default DonorForm;
