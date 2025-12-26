import React, { useState, useEffect } from 'react'
import '../../styles/instagram-profile.css'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import BottomNav from '../../components/BottomNav'

const Profile = () => {
    const { id } = useParams()
    const [ profile, setProfile ] = useState(null)
    const [ videos, setVideos ] = useState([])
    const [ following, setFollowing ] = useState(false)
    const [ selectedVideo, setSelectedVideo ] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
            .then(response => {
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems || [])
            })
    }, [ id ])

    if (!profile) {
        return <div className="profile-loading">Loading...</div>
    }

    return (
        <div className="ig-profile-page">
            {/* Header */}
            <header className="ig-profile-header">
                <Link to="/home" className="back-btn">←</Link>
                <h1 className="profile-username">{profile.name}</h1>
                <button className="header-menu">•••</button>
            </header>

            {/* Profile Info Section */}
            <div className="ig-profile-container">
                {/* Profile Header */}
                <div className="profile-header-section">
                    <div className="profile-avatar">
                        <div className="avatar-circle">🍽️</div>
                    </div>

                    <div className="profile-stats">
                        <div className="stat">
                            <div className="stat-value">{videos.length}</div>
                            <div className="stat-label">Posts</div>
                        </div>
                        <div className="stat">
                            <div className="stat-value">1.2K</div>
                            <div className="stat-label">Followers</div>
                        </div>
                        <div className="stat">
                            <div className="stat-value">342</div>
                            <div className="stat-label">Following</div>
                        </div>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="profile-info">
                    <h2 className="profile-name">{profile.name}</h2>
                    <p className="profile-bio">{profile.address}</p>
                    <p className="profile-contact">📞 {profile.phone}</p>
                    <a href={`mailto:${profile.email}`} className="profile-email">{profile.email}</a>
                </div>

                {/* Action Buttons */}
                <div className="profile-actions">
                    <button 
                        className={`follow-btn ${following ? 'following' : ''}`}
                        onClick={() => setFollowing(!following)}
                    >
                        {following ? 'Following' : 'Follow'}
                    </button>
                    <button className="message-btn">Message</button>
                </div>

                {/* Stories Section */}
                <div className="stories-section">
                    <div className="story">
                        <div className="story-circle">Highlights</div>
                        <span className="story-label">Highlights</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="profile-tabs">
                    <button className="tab active">📸 Posts</button>
                    <button className="tab">🏷️ Tagged</button>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="posts-grid-wrapper">
                <div className="posts-grid">
                    {videos.length === 0 ? (
                        <div className="no-posts">
                            <p>No posts yet</p>
                        </div>
                    ) : (
                        videos.map((video) => (
                            <div 
                                key={video._id} 
                                className="grid-item"
                                onClick={() => setSelectedVideo(video)}
                            >
                                <video 
                                    src={video.video}
                                    className="grid-video"
                                />
                                <div className="grid-overlay">
                                    <span className="grid-icon">▶️</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal for selected video */}
            {selectedVideo && (
                <div className="modal-overlay" onClick={() => setSelectedVideo(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedVideo(null)}>✕</button>
                        <video 
                            src={selectedVideo.video}
                            controls
                            className="modal-video"
                            autoPlay
                        />
                        <div className="modal-info">
                            <h3>{selectedVideo.name}</h3>
                            <p>{selectedVideo.description}</p>
                            <div className="modal-stats">
                                <span>❤️ {selectedVideo.likeCount || 0}</span>
                                <span>💬 0</span>
                                <span>📤 0</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Navigation */}
            <BottomNav currentPage="profile" />
        </div>
    )
}

export default Profile