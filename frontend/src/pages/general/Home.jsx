import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [videoItems, setVideoItems] = useState([]);
  const [loginRequired, setLoginRequired] = useState(false);
  const videoRefs = useRef([]);

  // Fetch videos
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", {
        withCredentials: true,
      })
      .then((response) => {
        setVideoItems(response.data.foodItems);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          setLoginRequired(true);
        } else {
          console.error(error);
        }
      });
  }, []);

  // Auto play + restart from beginning like Instagram reels
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!video) return;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            // Pause all other videos
            videoRefs.current.forEach((v) => {
              if (v && v !== video) {
                v.pause();
              }
            });

            // Restart from beginning every time visible again
            video.currentTime = 0;
            video.play().catch(() => {});
          } else {
            video.pause();
            video.currentTime = 0; // reset when leaving screen
          }
        });
      },
      {
        threshold: [0.6],
      },
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [videoItems]);

  if (loginRequired) {
    return (
      <main className="home-reel home-reel--login-required">
        <div className="home-reel__login-box">
          <h1>Please log in first</h1>
          <p>
            You need to sign in before viewing the home feed. Log in to access
            your personalized food reels.
          </p>
          <div className="home-reel__login-actions">
            <Link className="store-btn" to="/login/user">
              Login as user
            </Link>
            <Link
              className="store-btn home-reel__secondary-btn"
              to="/register/user"
            >
              Register
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="home-reel">
      <div className="home-reel__container">
        {videoItems.map((item, index) => (
          <section key={item._id} className="home-reel__slide">
            <video
              ref={(element) => {
                videoRefs.current[index] = element;
              }}
              className="home-reel__video"
              src={item.video}
              muted
              playsInline
              preload="metadata"
              controls={false}
            />
            <div className="home-reel__info">
              <span className="home-reel__label">{item.name}</span>
              <h2>{item.description}</h2>
              <Link
                className="store-btn"
                to={"/foodpartner/" + item.foodPartner}
              >
                View Store
              </Link>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default Home;
