import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/reels.css';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.75, // Video must be 75% visible to play
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          observer.unobserve(video);
        }
      });
    };
  }, [videos]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/food/", { withCredentials: true })
      .then((response) => {
        setVideos(response.data.foodItems);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, []);

  return (
    <div className="reels-container">
      {videos.map((reel, index) => (
        <div key={reel._id} className="reel">
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            className="reel-video"
            src={reel.video}
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="reel-overlay">
            <div className="reel-store-name">{reel.name}</div>
            <p className="reel-description">{reel.description}</p>
            <Link to={`/food-partner/${reel.foodPartner}`}>
              <button className="visit-store-btn">
                Visit Store
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;