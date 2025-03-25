import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="dashboard-container sigma-dashboard">
            <div className="dashboard-box">
                <h1 className="sigma-title">💀 SKIBIDI ALPHA DASHBOARD 💀</h1>
                <div className="dashboard-content sigma-content">
                    <div className="stat-box sigma-box">🔥 Total GigaChads: 9999+</div>
                    <div className="stat-box sigma-box">💪 Active Grindset Sessions: 999</div>
                    <div className="stat-box sigma-box">💋 Rizz Level: MAXIMUM</div>
                    <div className="stat-box sigma-box">🦷 Perfect Mewing Form: 100%</div>
                    <div className="stat-box sigma-box">👀 Gyatt Detection: ULTRA HIGH</div>
                    <div className="stat-box sigma-box">⚡ Bet Confidence: UNSTOPPABLE</div>
                </div>
                <button onClick={handleLogout} className="logout-button">🚀 EXIT THE GRIND 🚀</button>
            </div>
        </div>
    );
}

export default Dashboard;