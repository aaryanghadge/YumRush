import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/bottom-nav.css';

const BottomNav = ({ currentPage = 'home' }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get('http://localhost:3000/api/auth/user/logout', { withCredentials: true })
      .then(() => {
        navigate('/');
      })
      .catch(error => console.error('Logout failed:', error));
  };

  return (
    <nav className="bottom-nav">
      <Link 
        to="/home" 
        className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
        title="Home"
      >
        <span className="nav-icon">🏠</span>
      </Link>

      <Link 
        to="/explore" 
        className={`nav-item ${currentPage === 'explore' ? 'active' : ''}`}
        title="Explore"
      >
        <span className="nav-icon">🔍</span>
      </Link>

      <Link 
        to="/create-food" 
        className={`nav-item ${currentPage === 'create' ? 'active' : ''}`}
        title="Create"
      >
        <span className="nav-icon">➕</span>
      </Link>

      <Link 
        to="/saved" 
        className={`nav-item ${currentPage === 'saved' ? 'active' : ''}`}
        title="Saved"
      >
        <span className="nav-icon">🔖</span>
      </Link>

      <Link 
        to="/profile" 
        className={`nav-item ${currentPage === 'profile' ? 'active' : ''}`}
        title="Profile"
      >
        <span className="nav-icon">👤</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
