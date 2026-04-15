import axios from "axios";
import React, { use } from "react";
import { Link, useNavigate } from "react-router-dom";

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const password = e.target.password.value;

    const response = await axios.post(
      "http://localhost:3000/api/auth/foodpartner/register",
      {
        name: businessName,
        contactName,
        email,
        phone,
        address,
        password,
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
          <div className="auth-subtitle">Start your online journey with us</div>
        </div>

        <div className="auth-body">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2
              style={{
                fontSize: "var(--font-size-2xl)",
                marginBottom: "var(--spacing-md)",
              }}
            >
              Register Your Restaurant
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--spacing-lg)",
              }}
            >
              <div className="form-group">
                <label className="form-label">Business Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Your Business name"
                  name="businessName"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Your full name"
                  name="contactName"
                />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--spacing-lg)",
              }}
            >
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="Your phone number"
                  name="phone"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-input"
                placeholder="Full address"
                name="address"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Create password"
                name="password"
              />
            </div>

            {/* <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--spacing-lg)",
              }}
            >
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Create password"
                  name="password"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="agreeTerms"
                className="checkbox-input"
              />
              <label htmlFor="agreeTerms" className="checkbox-label">
                I agree to Restaurant Partner Agreement & Terms
              </label>
            </div> */}

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                background: "linear-gradient(135deg, #ff6f00 0%, #e65100 100%)",
              }}
            >
              Register Restaurant
            </button>
          </form>

          <div className="divider">
            <div className="divider-line"></div>
            <div className="divider-text">or</div>
            <div className="divider-line"></div>
          </div>

          <div className="auth-footer">
            Already registered?{" "}
            <Link to="/login/foodpartner" className="auth-footer-link">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
