import React, { useState } from 'react';
import './RequestForm.css';

const RequestForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        bloodType: '',
        units: '',
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
        <form className="request-form" onSubmit={handleSubmit}>
            <h2>Request Blood</h2>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
                Blood Type:
                <input type="text" name="bloodType" value={formData.bloodType} onChange={handleChange} required />
            </label>
            <label>
                Units:
                <input type="number" name="units" value={formData.units} onChange={handleChange} required />
            </label>
            <label>
                Contact:
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default RequestForm;
