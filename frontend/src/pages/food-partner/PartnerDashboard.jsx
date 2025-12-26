import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/partner-dashboard.css';

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const [partner, setPartner] = useState(null);
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get partner info from cookie/auth
    axios.get('http://localhost:3000/api/food-partner/me', { withCredentials: true })
      .then(response => {
        setPartner(response.data.foodPartner);
        setVideos(response.data.foodPartner.videos || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch partner data:', error);
        // If not authenticated, redirect to login
        if (error.response?.status === 401) {
          navigate('/food-partner/login');
        }
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    axios.get('http://localhost:3000/api/auth/foodpartner/logout', { withCredentials: true })
      .then(() => {
        navigate('/');
      })
      .catch(error => console.error('Logout failed:', error));
  };

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  if (!partner) {
    return <div className="dashboard-error">Failed to load partner data</div>;
  }

  return (
    <div className="partner-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">Partner Dashboard</h1>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="dashboard-nav">
        <button 
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          👤 Profile
        </button>
        <button 
          className={`nav-tab ${activeTab === 'reels' ? 'active' : ''}`}
          onClick={() => setActiveTab('reels')}
        >
          🎬 My Reels
        </button>
      </div>

      {/* Content Area */}
      <div className="dashboard-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <section className="tab-content overview-section">
            <div className="welcome-card">
              <h2>Welcome back, {partner.name}! 👋</h2>
              <p>Manage your restaurant, upload delicious food videos, and reach more customers</p>
            </div>

            <div className="quick-stats">
              <div className="stat-card">
                <div className="stat-icon">🎬</div>
                <div className="stat-info">
                  <span className="stat-label">Total Reels</span>
                  <span className="stat-value">{videos.length}</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">👁️</div>
                <div className="stat-info">
                  <span className="stat-label">Total Views</span>
                  <span className="stat-value">0</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">❤️</div>
                <div className="stat-info">
                  <span className="stat-label">Total Likes</span>
                  <span className="stat-value">0</span>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <Link to="/create-food" className="btn btn--primary btn--large">
                ➕ Upload New Reel
              </Link>
              <button 
                className="btn btn--secondary btn--large"
                onClick={() => setActiveTab('profile')}
              >
                ✏️ Edit Profile
              </button>
            </div>
          </section>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <section className="tab-content profile-section">
            <div className="profile-card">
              <h2>Restaurant Profile</h2>

              <div className="profile-field">
                <label>Restaurant Name</label>
                <input type="text" value={partner.name} disabled />
              </div>

              <div className="profile-field">
                <label>Contact Person</label>
                <input type="text" value={partner.contactName} disabled />
              </div>

              <div className="profile-field">
                <label>Email</label>
                <input type="email" value={partner.email} disabled />
              </div>

              <div className="profile-field">
                <label>Phone</label>
                <input type="tel" value={partner.phone} disabled />
              </div>

              <div className="profile-field">
                <label>Address</label>
                <textarea disabled>{partner.address}</textarea>
              </div>

              <Link to="/food-partner/edit-profile" className="btn btn--primary">
                Edit Profile
              </Link>
            </div>
          </section>
        )}

        {/* Reels Tab */}
        {activeTab === 'reels' && (
          <section className="tab-content reels-section">
            <div className="reels-header">
              <h2>Your Reels ({videos.length})</h2>
              <Link to="/create-food" className="btn btn--primary">
                + Upload Reel
              </Link>
            </div>

            {videos.length === 0 ? (
              <div className="empty-state">
                <p>No reels uploaded yet</p>
                <Link to="/create-food" className="btn btn--primary">
                  Create Your First Reel
                </Link>
              </div>
            ) : (
              <div className="reels-grid">
                {videos.map((video) => (
                  <div key={video._id} className="reel-card">
                    <video 
                      src={video.video} 
                      controls 
                      className="reel-video"
                    />
                    <div className="reel-info">
                      <h3>{video.name}</h3>
                      <p>{video.description}</p>
                      <div className="reel-stats">
                        <span>👁️ 0</span>
                        <span>❤️ {video.likeCount || 0}</span>
                        <span>💾 {video.savesCount || 0}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default PartnerDashboard;
