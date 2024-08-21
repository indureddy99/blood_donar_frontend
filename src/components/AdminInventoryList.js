import React, { useState } from 'react';
import axios from 'axios';
import './AdminInventoryList.css';

const AdminInventoryList = ({ data, refreshData }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        blood_bank_name: '',
        location: '',
        blood_type: '',
        amount_of_blood: '',
        expiry_date: '',
        user_id: '',
    });

    const handleOpenUpdateModal = (item) => {
        setSelectedItem(item);
        setFormData({
            blood_bank_name: item.blood_bank_name,
            location: item.location,
            blood_type: item.blood_type,
            amount_of_blood: item.amount_of_blood,
            expiry_date: item.expiry_date,
            user_id: item.user_id,
        });
    };

    const handleCloseUpdateModal = () => {
        setSelectedItem(null);
    };

    const handleOpenCreateModal = () => {
        setShowCreateModal(true);
        setFormData({
            blood_bank_name: '',
            location: '',
            blood_type: '',
            amount_of_blood: '',
            expiry_date: '',
            user_id: 1,
        });
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3002/blood_donar/inventory/${selectedItem.blood_bank_id}`, formData);
            alert('Blood bank entry updated successfully');
            handleCloseUpdateModal();
            refreshData();
        } catch (error) {
            console.error('Error updating blood bank entry:', error);
            alert('Failed to update blood bank entry');
        }
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3002/blood_donar/inventory', formData);
            alert('Blood bank entry created successfully');
            handleCloseCreateModal();
            refreshData();
        } catch (error) {
            console.error('Error creating blood bank entry:', error);
            alert('Failed to create blood bank entry');
        }
    };

    return (
        <div className="inventory-list">
            <h2>Available Blood Inventory</h2>
            <button onClick={handleOpenCreateModal} className="create-button">Create New Entry</button>
            <table>
                <thead>
                    <tr>
                        <th>Blood Bank Name</th>
                        <th>Blood Type</th>
                        <th>Location</th>
                        <th>Units Available</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.blood_bank_id}>
                            <td>{item.blood_bank_name}</td>
                            <td>{item.blood_type}</td>
                            <td>{item.location}</td>
                            <td>{item.amount_of_blood}</td>
                            <td>
                                <button onClick={() => handleOpenUpdateModal(item)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Update Modal */}
            {selectedItem && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseUpdateModal}>&times;</span>
                        <h2>Update Blood Bank Entry</h2>
                        <form onSubmit={handleUpdateSubmit}>
                            <div className="form-group">
                                <label htmlFor="blood_bank_name">Blood Bank Name:</label>
                                <input
                                    type="text"
                                    id="blood_bank_name"
                                    name="blood_bank_name"
                                    value={formData.blood_bank_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">Location:</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="blood_type">Blood Type:</label>
                                <input
                                    type="text"
                                    id="blood_type"
                                    name="blood_type"
                                    value={formData.blood_type}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="amount_of_blood">Amount of Blood:</label>
                                <input
                                    type="number"
                                    id="amount_of_blood"
                                    name="amount_of_blood"
                                    value={formData.amount_of_blood}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="expiry_date">Expiry Date:</label>
                                <input
                                    type="date"
                                    id="expiry_date"
                                    name="expiry_date"
                                    value={formData.expiry_date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="user_id">User ID:</label>
                                <input
                                    type="text"
                                    id="user_id"
                                    name="user_id"
                                    value={formData.user_id}
                                    onChange={handleChange}
                                />
                            </div> */}
                            <button type="submit">Update</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Create Modal */}
            {showCreateModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseCreateModal}>&times;</span>
                        <h2>Create New Blood Bank Entry</h2>
                        <form onSubmit={handleCreateSubmit}>
                            <div className="form-group">
                                <label htmlFor="blood_bank_name">Blood Bank Name:</label>
                                <input
                                    type="text"
                                    id="blood_bank_name"
                                    name="blood_bank_name"
                                    value={formData.blood_bank_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">Location:</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="blood_type">Blood Type:</label>
                                <input
                                    type="text"
                                    id="blood_type"
                                    name="blood_type"
                                    value={formData.blood_type}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="amount_of_blood">Amount of Blood:</label>
                                <input
                                    type="number"
                                    id="amount_of_blood"
                                    name="amount_of_blood"
                                    value={formData.amount_of_blood}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="expiry_date">Expiry Date:</label>
                                <input
                                    type="date"
                                    id="expiry_date"
                                    name="expiry_date"
                                    value={formData.expiry_date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="user_id">User ID:</label>
                                <input
                                    type="text"
                                    id="user_id"
                                    name="user_id"
                                    value={formData.user_id}
                                    onChange={handleChange}
                                />
                            </div> */}
                            <button type="submit">Create</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminInventoryList;
