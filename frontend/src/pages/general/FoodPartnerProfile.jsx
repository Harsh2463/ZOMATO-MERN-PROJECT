import React, { useEffect, useState } from "react";
import "./FoodPartnerProfile.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const partnerProfile = {
  avatar:
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80",
  businessName: "Spice Avenue",
  ownerName: "Chef Rahul Sharma",
  address: "4th Block, Bandra West, Mumbai",
  email: "spiceavenue@example.com",
  phone: "+91 98765 43210",
  about:
    "An authentic food partner experience bringing spicy street flavors and crisp reels to your feed.",
};

const FoodPartnerProfile = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState([]);
  const [video, setVideo] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideo(response.data.foodPartner.foodItems);
      });
  }, []);
  return (
    <main className="partner-profile">
      <section className="partner-profile__hero">
        <div className="partner-profile__avatar-shell">
          <img
            className="partner-profile__avatar"
            src={partnerProfile.avatar}
            alt={`${partnerProfile.businessName} avatar`}
          />
        </div>

        <div className="partner-profile__hero-copy">
          <span className="partner-profile__label">Food Partner</span>
          <h1 className="partner-profile__name">{profile.name}</h1>
          <p className="partner-profile__subtext">
            {profile.contactName} · {profile.address}
          </p>

          <div className="partner-profile__stats">
            <div>
              <strong>{video.length}</strong>
              <span>Reels</span>
            </div>
            <div>
              <strong>12</strong>
              <span>Locations</span>
            </div>
          </div>
        </div>
      </section>

      <section className="partner-profile__body">
        <div className="partner-profile__summary">
          <div>
            <h2>Business details</h2>
            <p>Email: {profile.email}</p>
            <p>+91-{profile.phone}</p>
          </div>
        </div>

        {/* <div className="partner-profile__feed-header">
          <h2>Created food reels</h2>
          <p>Explore the latest food item reels from the partner profile.</p>
        </div> */}

        <div className="partner-profile__grid">
          {video.map((item) => (
            <article key={item._id} className="partner-profile__card">
              <video
                className="partner-profile__card-video"
                src={item.video}
                muted
                loop
                playsInline
                preload="metadata"
                controls={false}
              />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default FoodPartnerProfile;
