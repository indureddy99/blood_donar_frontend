import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [bloodRequests, setBloodRequests] = useState([]);
    const [bloodDonations, setBloodDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestsResponse = await axios.get(`http://localhost:3002/blood-requests/${user_id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const donationsResponse = await axios.get(`http://localhost:3002/blood-donations/${user_id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setBloodRequests(requestsResponse.data.data);
                setBloodDonations(donationsResponse.data.data);
            } catch (err) {
                setError('Failed to load data. Please try again later.');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user_id, token]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="tables-container">
                <div className="table-section">
                    <h2>Blood Requests</h2>
                    {bloodRequests.length === 0 ? (
                        <p>No blood requests found.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Request ID</th>
                                    <th>Blood Bank ID</th>
                                    <th>Blood Type</th>
                                    <th>Amount Needed (liters)</th>
                                    <th>Request Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bloodRequests.map(request => (
                                    <tr key={request.request_id}>
                                        <td>{request.request_id}</td>
                                        <td>{request.blood_bank_id}</td>
                                        <td>{request.blood_type}</td>
                                        <td>{request.amount_needed}</td>
                                        <td>{request.request_date}</td>
                                        <td>{request.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="table-section">
                    <h2>Blood Donations</h2>
                    {bloodDonations.length === 0 ? (
                        <p>No blood donations found.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Donation ID</th>
                                    <th>Blood Bank ID</th>
                                    <th>Blood Type</th>
                                    <th>Amount Donated (liters)</th>
                                    <th>Donation Date</th>
                                    <th>Expiry Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bloodDonations.map(donation => (
                                    <tr key={donation.donation_id}>
                                        <td>{donation.donation_id}</td>
                                        <td>{donation.blood_bank_id}</td>
                                        <td>{donation.blood_type}</td>
                                        <td>{donation.amount_of_blood}</td>
                                        <td>{donation.donation_date}</td>
                                        <td>{donation.expiry_date}</td>
                                        <td>{donation.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
