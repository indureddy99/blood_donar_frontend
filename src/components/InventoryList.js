import React from 'react';
import './InventoryList.css';

const InventoryList = ({ data }) => {
    return (
        <div className="inventory-list">
            <h2>Available Blood Inventory</h2>
            <table>
                <thead>
                    <tr>
                        <th>Blood Type</th>
                        <th>Location</th>
                        <th>Units Available</th>
                        <th>Expiry Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.blood_type}</td>
                            <td>{item.location}</td>
                            <td>{item.amount_of_blood} L</td>
                            <td>{new Date(item.expiry_date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryList;
