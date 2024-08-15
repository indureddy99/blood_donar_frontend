import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InventoryList from '../components/InventoryList';
import './Inventory.css';

const Inventory = () => {
    const [location, setLocation] = useState('');
    const [bloodTypeFilter, setBloodTypeFilter] = useState('');
    const [inventoryData, setInventoryData] = useState([]);

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:3002/blood_donar/inventorys',
                    headers: { 
                        'Content-Type': 'application/json'
                    }
                };

                const response = await axios.request(config);
                setInventoryData(response.data.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    // Filter the inventory data based on location and blood type
    const filteredData = inventoryData.filter((item) => {
        const matchesLocation = item.location.toLowerCase().includes(location.toLowerCase());
        const matchesBloodType = bloodTypeFilter ? item.blood_type === bloodTypeFilter : true;
        return matchesLocation && matchesBloodType;
    });

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
            <InventoryList data={filteredData} />
        </div>
    );
};

export default Inventory;
