import React from 'react';
import './CitizenPage.css';

const CitizenPage = () => {
    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header">
                <div className="user-greeting">
                    <img
                        src="https://via.placeholder.com/40"
                        alt="User Avatar"
                        className="avatar"
                    />
                    <h2>Hello, Alex!</h2>
                </div>
            </header>

            {/* Impact Summary */}
            <div className="impact-summary bg-white shadow-lg">
                <div className="impact-item">
                    <p>Eco-Points</p>
                    <h2>1,250 PTS</h2>
                </div>
                <div className="impact-item">
                    <p>CO₂ Saved</p>
                    <h2>4.7 kg</h2>
                </div>
                <div className="impact-item">
                    <p>Reports Made</p>
                    <h2>15</h2>
                </div>
            </div>

            {/* Big Bin Button */}
            <div className="report-bin">
                <div className="bin-button shadow-lg">
                    <span role="img" aria-label="bin" className="bin-icon">🗑️</span>
                </div>
                <p className="report-bin-text">Report Bin</p>
            </div>

            {/* Recent Activity */}
            <div className="recent-activity">
                <h2>Recent Activity</h2>
                <ul className="activity-list">
                    <li className="activity-card bg-white shadow-lg">
                        A dump was just cleared in Sadar B... <span>2h ago</span>
                    </li>
                    <li className="activity-card bg-white shadow-lg">
                        Priya just reached the 'Eco-Warrior' level! <span>5h ago</span>
                    </li>
                    <li className="activity-card bg-white shadow-lg">
                        Rohit reported an overflowing bin at ... <span>1d ago</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CitizenPage;
