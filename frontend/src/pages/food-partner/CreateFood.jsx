import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/create-food.css';

const CreateFood = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    video: null,
  });
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate video file
      if (!file.type.startsWith('video/')) {
        setError('Please select a valid video file');
        return;
      }
      
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        setError('Video size must be less than 100MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        video: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name.trim()) {
      setError('Please enter a food name');
      return;
    }
    if (!formData.description.trim()) {
      setError('Please enter a description');
      return;
    }
    if (!formData.video) {
      setError('Please select a video file');
      return;
    }

    setUploading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('name', formData.name);
      uploadFormData.append('description', formData.description);
      uploadFormData.append('video', formData.video);

      const response = await axios.post(
        'http://localhost:3000/api/food/',
        uploadFormData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setSuccess('Reel uploaded successfully!');
      setTimeout(() => {
        navigate('/food-partner/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload reel');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="create-food-page">
      <div className="create-food-container">
        <div className="create-food-header">
          <button 
            className="btn-back"
            onClick={() => navigate('/food-partner/dashboard')}
          >
            ← Back
          </button>
          <h1>Upload Food Reel</h1>
        </div>

        <div className="create-food-content">
          {/* Form Section */}
          <div className="form-section">
            <h2>Reel Details</h2>
            <p className="section-subtitle">Share your delicious food with customers</p>

            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">{success}</div>}

            <form onSubmit={handleSubmit} className="upload-form">
              <div className="input-group">
                <label htmlFor="name">Dish/Food Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="input"
                  placeholder="e.g., Butter Chicken, Margherita Pizza"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={uploading}
                />
              </div>

              <div className="input-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  className="input"
                  placeholder="Describe your dish, ingredients, or special tips..."
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={uploading}
                />
              </div>

              <div className="input-group">
                <label htmlFor="video">Video File *</label>
                <div className="video-input-wrapper">
                  <input
                    id="video"
                    name="video"
                    type="file"
                    accept="video/*"
                    className="video-input"
                    onChange={handleVideoChange}
                    disabled={uploading}
                  />
                  <div className="video-input-label">
                    <span className="upload-icon">🎬</span>
                    <span className="upload-text">
                      {formData.video ? formData.video.name : 'Click to select or drag a video'}
                    </span>
                    <span className="upload-hint">MP4, WebM, or Ogg (Max 100MB)</span>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn--primary btn--large"
                disabled={uploading}
              >
                {uploading ? '⏳ Uploading...' : '📤 Upload Reel'}
              </button>
            </form>
          </div>

          {/* Preview Section */}
          <div className="preview-section">
            <h2>Preview</h2>
            {videoPreview ? (
              <div className="video-preview-container">
                <video 
                  src={videoPreview} 
                  controls 
                  className="video-preview"
                />
                <div className="video-info">
                  <h3>{formData.name || 'Untitled'}</h3>
                  <p>{formData.description || 'No description'}</p>
                </div>
              </div>
            ) : (
              <div className="preview-placeholder">
                <div className="placeholder-icon">🎬</div>
                <p>Your video preview will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFood;