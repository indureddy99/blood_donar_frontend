import React from 'react';
import './InventoryList.css';

const InventoryList = () => {
    const inventoryData = [
        { bloodType: 'A+', units: 10 },
        { bloodType: 'B+', units: 8 },
        { bloodType: 'O+', units: 15 },
        { bloodType: 'AB+', units: 5 },
    ];

    return (
        <div className="inventory-list">
            <h2>Available Blood Inventory</h2>
            <table>
                <thead>
                    <tr>
                        <th>Blood Type</th>
                        <th>Units Available</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.bloodType}</td>
                            <td>{item.units}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryList;
