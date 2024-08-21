import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminInventoryList from '../components/AdminInventoryList';
import './AdminInventory.css';

const AdminInventory = () => {
    const [location, setLocation] = useState('');
    const [bloodTypeFilter, setBloodTypeFilter] = useState('');
    const [inventoryData, setInventoryData] = useState([]);

    // Fetch data from the API when the component mounts
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3002/blood_donar/inventorys');
            setInventoryData(response.data.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = inventoryData.filter((item) => {
        const matchesLocation = item.location.toLowerCase().includes(location.toLowerCase());
        const matchesBloodType = bloodTypeFilter ? item.blood_type === bloodTypeFilter : true;
        return matchesLocation && matchesBloodType;
    });

    const refreshData = () => {
        fetchData();
    };

    return (
        <div className="inventory">
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <select
                    value={bloodTypeFilter}
                    onChange={(e) => setBloodTypeFilter(e.target.value)}
                >
                    <option value="">All Blood Types</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                    <option value="AB+">AB+</option>
                    <option value="A-">A-</option>
                    <option value="B-">B-</option>
                    <option value="O-">O-</option>
                    <option value="AB-">AB-</option>
                </select>
            </div>
            <AdminInventoryList data={filteredData} refreshData={refreshData} />
        </div>
    );
};

export default AdminInventory;
