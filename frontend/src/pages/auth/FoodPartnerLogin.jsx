import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(
      "http://localhost:3000/api/auth/foodpartner/login",
      {
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      },
    );

    console.log(response.data);
    navigate("/create-food");
  };
  return (
    <div className="auth-container">
      <div className="auth-wrapper fade-in">
        <div
          className="auth-header"
          style={{
            background: "linear-gradient(135deg, #ff6f00 0%, #e65100 100%)",
          }}
        >
          <div className="auth-logo">zomato</div>
          <div className="auth-subtitle">
            Partner with us to grow your business
          </div>
        </div>

        <div className="auth-body">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2
              style={{
                fontSize: "var(--font-size-2xl)",
                marginBottom: "var(--spacing-md)",
              }}
            >
              Partner Sign In
            </h2>

            <div
              className="info-box"
              style={{
                background: "rgba(255, 111, 0, 0.05)",
                borderLeftColor: "#ff6f00",
              }}
            >
              <strong>Restaurant Dashboard</strong>
              <br />
              Access your sales, orders, and analytics
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your restaurant email"
                name="email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your password"
                name="password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                background: "linear-gradient(135deg, #ff6f00 0%, #e65100 100%)",
              }}
            >
              Sign In
            </button>

            <Link
              to="#"
              style={{
                color: "var(--primary-color)",
                textAlign: "center",
                fontSize: "var(--font-size-sm)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Forgot Password?
            </Link>
          </form>

          <div className="divider">
            <div className="divider-line"></div>
            <div className="divider-text">or</div>
            <div className="divider-line"></div>
          </div>

          <div className="auth-footer">
            Don't have a partner account?{" "}
            <Link to="/register/foodpartner" className="auth-footer-link">
              Register now
            </Link>
          </div>

          <div className="info-box" style={{ marginTop: "var(--spacing-xl)" }}>
            💡 <strong>Why Join Zomato?</strong>
            <br />
            • Reach millions of customers
            <br />
            • Increase your online visibility
            <br />• Real-time order management
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
