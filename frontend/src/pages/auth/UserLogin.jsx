import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(
      "http://localhost:3000/api/auth/user/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );

    console.log(response.data);

    navigate("/");
  };
  return (
    <div className="auth-container">
      <div className="auth-wrapper fade-in">
        <div className="auth-header">
          <div className="auth-logo">zomato</div>
          <div className="auth-subtitle">
            Order food online from your favorite restaurants
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
              Sign In
            </h2>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
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

            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </form>

          <div className="divider">
            <div className="divider-line"></div>
            <div className="divider-text">or</div>
            <div className="divider-line"></div>
          </div>

          <div className="auth-footer">
            Don't have an account?{" "}
            <Link to="/register/user" className="auth-footer-link">
              Create account
            </Link>
          </div>

          <div className="info-box">
            Looking to add your restaurant?{" "}
            <Link
              to="/login/foodpartner"
              style={{ fontWeight: 600, color: "var(--primary-color)" }}
            >
              Partner With Us →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
