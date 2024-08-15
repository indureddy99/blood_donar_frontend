import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3002/contact', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setSubmitStatus('success');
            console.log(response.data);
        } catch (error) {
            setSubmitStatus('error');
            console.log(error);
        }
    };

    return (
        <div className="contact">
            <h2>Contact Us</h2>
            <p>Feel free to reach out for any inquiries or support.</p>
            <form className="contact-form" onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Message:
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </label>
                <button type="submit">Send</button>
            </form>
            {submitStatus === 'success' && <p className="status-message success">Message sent successfully!</p>}
            {submitStatus === 'error' && <p className="status-message error">Failed to send message. Please try again.</p>}
        </div>
    );
};

export default Contact;
