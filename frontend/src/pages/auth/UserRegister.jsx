import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can collect form data and send it to the backend API using axios

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(
      "http://localhost:3000/api/auth/user/register",
      {
        fullName: firstName + " " + lastName,
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
          <div className="auth-subtitle">Create your account to order food</div>
        </div>

        <div className="auth-body">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2
              style={{
                fontSize: "var(--font-size-2xl)",
                marginBottom: "var(--spacing-md)",
              }}
            >
              Create Account
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--spacing-lg)",
              }}
            >
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="First name"
                  name="firstName"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Last name"
                  name="lastName"
                />
              </div>
            </div>

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
                placeholder="Create a password (min 8 characters)"
                name="password"
              />
            </div>

            {/* <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Confirm your password"
              />
            </div> */}

            {/* <div className="checkbox-group">
              <input
                type="checkbox"
                id="agreeTerms"
                className="checkbox-input"
              />
              <label htmlFor="agreeTerms" className="checkbox-label">
                I agree to Terms & Conditions and Privacy Policy
              </label>
            </div> */}

            <button type="submit" className="btn btn-primary">
              Create Account
            </button>
          </form>

          <div className="divider">
            <div className="divider-line"></div>
            <div className="divider-text">or</div>
            <div className="divider-line"></div>
          </div>

          <div className="auth-footer">
            Already have an account?{" "}
            <Link to="/login/user" className="auth-footer-link">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
