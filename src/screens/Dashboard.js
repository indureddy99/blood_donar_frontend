import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('authToken');

    return (
        <div className="dashboard">
            <h1>Welcome to your Dashboard</h1>
            <p>User ID: {user_id}</p>
            <p>Token: {token}</p>
            {/* Add more dashboard content here */}
        </div>
    );
};

export default Dashboard;
