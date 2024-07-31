import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact">
            <h2>Contact Us</h2>
            <p>Feel free to reach out for any inquiries or support.</p>
            <form className="contact-form">
                <label>
                    Name:
                    <input type="text" name="name" required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" required />
                </label>
                <label>
                    Message:
                    <textarea name="message" required></textarea>
                </label>
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Contact;
