import React, { useState } from 'react';
import './DonorForm.css';

const DonorForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        bloodType: '',
        contact: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form className="donor-form" onSubmit={handleSubmit}>
            <h2>Register as Donor</h2>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
                Age:
                <input type="number" name="age" value={formData.age} onChange={handleChange} required />
            </label>
            <label>
                Blood Type:
                <input type="text" name="bloodType" value={formData.bloodType} onChange={handleChange} required />
            </label>
            <label>
                Contact:
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default DonorForm;
