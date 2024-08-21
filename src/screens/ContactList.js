import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactList.css';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('http://localhost:3002/contacts');
                setContacts(response.data.data);
            } catch (error) {
                setError('Failed to fetch contacts');
                console.error('Error fetching contacts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="contact-list">
            <h1>Contact List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.length > 0 ? (
                        contacts.map(contact => (
                            <tr key={contact.id}>
                                <td>{contact.id}</td>
                                <td>{contact.name}</td>
                                <td>{contact.email_id}</td>
                                <td>{contact.message}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No contacts found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ContactList;
