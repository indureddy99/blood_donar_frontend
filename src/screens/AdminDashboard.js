import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import StatusModal from './StatusModal';

const AdminDashboard = () => {
    const [bloodRequests, setBloodRequests] = useState([]);
    const [bloodDonations, setBloodDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestsResponse = await axios.get('http://localhost:3002/blood-requests', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const donationsResponse = await axios.get('http://localhost:3002/blood-donations', {
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
    }, [token]);

    const openModal = (item, type) => {
        setSelectedItem({ ...item, type });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handleStatusUpdate = (id, newStatus, fulfillmentDate) => {
        if (selectedItem.type === 'request') {
            setBloodRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request.request_id === id ? { ...request, status: newStatus, fulfillment_date: fulfillmentDate } : request
                )
            );
        } else if (selectedItem.type === 'donation') {
            setBloodDonations((prevDonations) =>
                prevDonations.map((donation) =>
                    donation.donation_id === id ? { ...donation, status: newStatus } : donation
                )
            );
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="dashboard">
            <h1>Admin Dashboard</h1>
            <div className="tables-container">
                <div className="table-section">
                    <h2>Blood Requests</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Blood Bank ID</th>
                                <th>Blood Type</th>
                                <th>Amount Needed (liters)</th>
                                <th>Request Date</th>
                                <th>Status</th>
                                <th>Fulfillment Date</th>
                                <th>Actions</th>
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
                                    <td>{request.fulfillment_date}</td>
                                    <td>
                                        <button onClick={() => openModal(request, 'request')}>Update Status</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="table-section">
                    <h2>Blood Donations</h2>
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
                                <th>Actions</th>
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
                                    <td>
                                        <button onClick={() => openModal(donation, 'donation')}>Update Status</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedItem && (
                <StatusModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    item={selectedItem}
                    onStatusUpdate={handleStatusUpdate}
                />
            )}
        </div>
    );
};

export default AdminDashboard;