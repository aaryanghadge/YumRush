import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/auth.css';

const EditPartnerProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch current partner data
    axios.get('http://localhost:3000/api/food-partner/me', { withCredentials: true })
      .then(response => {
        setFormData(response.data.foodPartner);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch partner data:', error);
        if (error.response?.status === 401) {
          navigate('/food-partner/login');
        }
        setLoading(false);
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      const response = await axios.put(
        'http://localhost:3000/api/food-partner/update-profile',
        formData,
        { withCredentials: true }
      );

      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        navigate('/food-partner/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="auth-page"><div className="auth-card">Loading...</div></div>;
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Edit Restaurant Profile</h2>
        <p className="auth-sub">Update your restaurant information</p>

        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}

        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Restaurant Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="contactName">Contact Person Name</label>
            <input
              id="contactName"
              name="contactName"
              type="text"
              className="input"
              value={formData.contactName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              required
              disabled
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="input"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="address">Restaurant Address</label>
            <textarea
              id="address"
              name="address"
              className="input"
              rows="4"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="actions">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              type="button" 
              className="btn btn-ghost"
              onClick={() => navigate('/food-partner/dashboard')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPartnerProfile;
