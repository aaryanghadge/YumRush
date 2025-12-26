import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/instagram-feed.css';
import BottomNav from '../../components/BottomNav';

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/food/", { withCredentials: true })
      .then((response) => {
        setPosts(response.data.foodItems || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  const handleLike = async (postId) => {
    try {
      const newLiked = new Set(likedPosts);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      setLikedPosts(newLiked);

      await axios.post(
        'http://localhost:3000/api/food/like',
        { foodId: postId },
        { withCredentials: true }
      );
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  const handleSave = async (postId) => {
    try {
      const newSaved = new Set(savedPosts);
      if (newSaved.has(postId)) {
        newSaved.delete(postId);
      } else {
        newSaved.add(postId);
      }
      setSavedPosts(newSaved);

      await axios.post(
        'http://localhost:3000/api/food/save',
        { foodId: postId },
        { withCredentials: true }
      );
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  if (loading) {
    return (
      <div className="feed-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="feed-container">
      {/* Instagram-style Header */}
      <header className="ig-header">
        <div className="ig-header-content">
          <h1 className="ig-logo">Food Reels</h1>
          <div className="ig-header-icons">
            <button className="ig-icon-btn">❤️</button>
            <button className="ig-icon-btn">✉️</button>
          </div>
        </div>
      </header>

      {/* Feed */}
      <div className="ig-feed">
        {posts.length === 0 ? (
          <div className="empty-feed">
            <p>No posts yet. Check back soon!</p>
          </div>
        ) : (
          posts.map((post) => (
            <article key={post._id} className="ig-post">
              {/* Post Header */}
              <div className="post-header">
                <div className="post-user-info">
                  <div className="user-avatar">🍽️</div>
                  <div className="user-details">
                    <h3 className="username">{post.foodPartner?.name || 'Restaurant'}</h3>
                    <span className="post-location">{post.name}</span>
                  </div>
                </div>
                <button className="post-menu-btn">•••</button>
              </div>

              {/* Post Video */}
              <div className="post-media">
                <video
                  src={post.video}
                  className="post-video"
                  controls
                  playsInline
                />
              </div>

              {/* Post Actions */}
              <div className="post-actions">
                <div className="action-buttons">
                  <button
                    className={`action-btn like-btn ${likedPosts.has(post._id) ? 'liked' : ''}`}
                    onClick={() => handleLike(post._id)}
                    title="Like"
                  >
                    {likedPosts.has(post._id) ? '❤️' : '🤍'}
                  </button>
                  <button className="action-btn" title="Comment">
                    💬
                  </button>
                  <button className="action-btn" title="Share">
                    ➤
                  </button>
                </div>
                <button
                  className={`action-btn save-btn ${savedPosts.has(post._id) ? 'saved' : ''}`}
                  onClick={() => handleSave(post._id)}
                  title="Save"
                >
                  {savedPosts.has(post._id) ? '🔖' : '🔗'}
                </button>
              </div>

              {/* Post Stats */}
              <div className="post-stats">
                <span className="likes-count">{post.likeCount || 0} likes</span>
              </div>

              {/* Post Caption */}
              <div className="post-caption">
                <span className="caption-username">{post.foodPartner?.name}</span>
                <span className="caption-text">{post.description}</span>
              </div>

              {/* View Comments */}
              <div className="view-comments">
                <button>View all {0} comments</button>
              </div>

              {/* Post Time */}
              <div className="post-time">
                <span>2 hours ago</span>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage="home" />
    </div>
  );
};

export default InstagramFeed;
