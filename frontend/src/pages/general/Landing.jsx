import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/landing.css';
import logo from '../../assets/logo.png';

const Landing = () => {
  return (
    <div className="mobile-container">
      <div className="landing">
        {/* Header with Logo */}
        <div className="landing__header">
          <img src={logo} alt="YumRush Logo" className="landing__logo" />
          <h1 className="landing__brand">YumRush</h1>
          <p className="landing__tagline">Order fast. Eat happy.</p>
        </div>

        {/* Hero Section */}
        <div className="landing__hero">
          <h2 className="landing__title">Discover Restaurants Through Stories</h2>
          <p className="landing__subtitle">Swipe through authentic food videos. Find hidden gems. Order directly from restaurants you'll love.</p>

          <Link to="/user/register" className="btn btn--primary">Get Started</Link>
          <Link to="/user/login" className="btn btn--secondary">Sign In</Link>
        </div>

        {/* Features */}
        <div className="landing__features">
          <div className="feature">
            <div className="feature__icon">🎬</div>
            <div className="feature__content">
              <h3 className="feature__title">Video First</h3>
              <p className="feature__desc">Watch real food stories, not just static photos</p>
            </div>
          </div>

          <div className="feature">
            <div className="feature__icon">⚡</div>
            <div className="feature__content">
              <h3 className="feature__title">Instant Discovery</h3>
              <p className="feature__desc">Swipe to explore restaurants near you</p>
            </div>
          </div>

          <div className="feature">
            <div className="feature__icon">🍽️</div>
            <div className="feature__content">
              <h3 className="feature__title">Direct Connect</h3>
              <p className="feature__desc">Visit or order with just one tap</p>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="landing__links">
          <p className="landing__link">Are you a restaurant? <Link to="/partner">Partner with us</Link></p>
        </div>

        {/* Footer */}
        <div className="landing__footer">
          <p className="landing__footer-text">© 2025 YumRush. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
