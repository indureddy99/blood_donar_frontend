import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DonorForm.css';

const CreateBloodRequestForm = () => {
    const [formData, setFormData] = useState({
        bloodType: '',
        amountNeeded: '',
        requestDate: '',
        bloodBankId: ''
    });
    const [bloodBanks, setBloodBanks] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3002/blood-donars/inventorys')
            .then(response => {
                const { data } = response.data;
                setBloodBanks(data);
            })
            .catch(error => {
                console.error('Error fetching blood banks:', error);
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


        const requestData = {
            blood_bank_id: parseInt(formData.bloodBankId, 10),
            user_id: parseInt(user_id, 10),
            blood_type: formData.bloodType,
            amount_needed: parseFloat(formData.amountNeeded),
            request_date: formData.requestDate
        };


        axios.post('http://localhost:3002/blood-requests', requestData)
            .then(response => {
                setMessage('Blood request created successfully!');
            })
            .catch(error => {
                setMessage('Failed to create blood request. Please try again.');
            });
    };

    return (
        <form className="donor-form" onSubmit={handleSubmit}>
            <h2>Create Blood Request</h2>
            {message && <p className={`message ${message.includes('Failed') ? 'error' : ''}`}>{message}</p>}
            <label>
                Blood Bank:
                <select name="bloodBankId" value={formData.bloodBankId} onChange={handleChange} required>
                    <option value="">Select Blood Bank</option>
                    {bloodBanks.map(bloodBank => (
                        <option key={bloodBank.blood_bank_id} value={bloodBank.blood_bank_id}>
                            {bloodBank.blood_bank_name || `Blood Bank ${bloodBank.blood_bank_id}`} - {bloodBank.location}
                        </option>
                    ))}
                </select>
            </label>
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
                Amount Needed (liters):
                <input type="number" step="0.01" name="amountNeeded" value={formData.amountNeeded} onChange={handleChange} required />
            </label>
            <label>
                Request Date:
                <input type="date" name="requestDate" value={formData.requestDate} onChange={handleChange} required />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default CreateBloodRequestForm;
