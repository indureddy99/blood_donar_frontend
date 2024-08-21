import React, { useState } from 'react';
import axios from 'axios';
import './StatusModal.css';

const StatusModal = ({ isOpen, onClose, item, onStatusUpdate }) => {
    const [status, setStatus] = useState(item.status);
    const [fulfillmentDate, setFulfillmentDate] = useState(item.fulfillment_date || '');
    const [error, setError] = useState('');

    const handleStatusChange = async () => {
        try {
            // if (!item.id) {
            //     throw new Error('Invalid item ID');
            // }

            const endpoint = item.type === 'request'
                ? `http://localhost:3002/blood-requests/${item.request_id}/status`
                : `http://localhost:3002/blood-donations/${item.donation_id}/status`;

            const data = item.type === 'request'
                ? { status, fulfillment_date: fulfillmentDate || null }
                : { status };

            const response = await axios.put(endpoint, data);
            if (response.status === 200) {
                onStatusUpdate(item.id, status, fulfillmentDate);
                onClose();
                window.location.reload(); 
            }
        } catch (err) {
            setError('Failed to update status. Please try again.');
            console.error('Error updating status:', err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Update Status</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="declined">Declined</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                {item.type === 'request' && status === 'completed' && (
                    <div className="form-group">
                        <label htmlFor="fulfillment-date">Fulfillment Date:</label>
                        <input
                            type="date"
                            id="fulfillment-date"
                            value={fulfillmentDate}
                            onChange={(e) => setFulfillmentDate(e.target.value)}
                        />
                    </div>
                )}
                <button onClick={handleStatusChange}>Update Status</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};



export default StatusModal;
