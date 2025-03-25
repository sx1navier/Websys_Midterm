import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUser, FaChartLine, FaCalendarAlt, FaInbox, FaCog } from 'react-icons/fa';
import './Dashboard.css';
// Remove these if they exist:
// import Calendar from './Calendar';
// Any calendar-related JSX in your render section

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const navigate = useNavigate();
  
  // Add this near the top of your component
  useEffect(() => {
    document.title = 'Naviers Dashboard';
  }, []);
  
  useEffect(() => {
    // Check if user is logged in
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
      // Redirect to login if no user is logged in
      navigate('/login');
      return;
    }
    
    // Set user data from session storage
    const userData = JSON.parse(currentUser);
    setUsername(userData.username || 'User');
    setEmail(userData.email || '');
  }, [navigate]);
  
  const handleLogout = () => {
    // Clear user session
    sessionStorage.removeItem('currentUser');
    // Redirect to login
    navigate('/login');
  };

  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem);
  };

  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="user-profile">
            <div className="user-avatar">
              <FaUser />
            </div>
            <div className="user-info">
              <h3>{username}</h3>
              <p>{email}</p>
            </div>
          </div>
        </div>
        
        <div className="sidebar-menu">
          <ul>
            <li 
              className={activeMenu === 'dashboard' ? 'active' : ''} 
              onClick={() => handleMenuClick('dashboard')}
            >
              <FaChartLine /> <span>Dashboard</span>
            </li>
            <li 
              className={activeMenu === 'calendar' ? 'active' : ''} 
              onClick={() => handleMenuClick('calendar')}
            >
              <FaCalendarAlt /> <span>Calendar</span>
            </li>
            <li 
              className={activeMenu === 'messages' ? 'active' : ''} 
              onClick={() => handleMenuClick('messages')}
            >
              <FaInbox /> <span>Messages</span>
            </li>
            <li 
              className={activeMenu === 'settings' ? 'active' : ''} 
              onClick={() => handleMenuClick('settings')}
            >
              <FaCog /> <span>Settings</span>
            </li>
          </ul>
        </div>
        
        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </div>
      </div>
      
      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="header-actions">
            <span className="date">{formatDate()}</span>
          </div>
        </div>
        
        <div className="dashboard-welcome">
          <h2>Welcome, {username}!</h2>
          <p>We're glad to have you here. This is your personal dashboard.</p>
        </div>
        
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Projects</h3>
            <p className="card-number">0</p>
          </div>
          <div className="dashboard-card">
            <h3>Tasks</h3>
            <p className="card-number">0</p>
          </div>
          <div className="dashboard-card">
            <h3>Messages</h3>
            <p className="card-number">0</p>
          </div>
          <div className="dashboard-card">
            <h3>Notifications</h3>
            <p className="card-number">0</p>
          </div>
        </div>
        
        <div className="dashboard-recent">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <p>You logged in to your account</p>
              <span className="activity-time">Just now</span>
            </div>
            <div className="activity-item">
              <p>Account created successfully</p>
              <span className="activity-time">Today</span>
            </div>
          </div>
        </div>
        {/* Remove the calendar section */}
      </div>
    </div>
  );
};

export default Dashboard;