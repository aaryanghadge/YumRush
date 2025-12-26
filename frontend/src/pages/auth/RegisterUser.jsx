import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import logo from "../../assets/logo.png";
import axios from "axios";

const RegisterUser = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const fullName = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (!fullName || !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        {
          fullName,
          email,
          password,
        },
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      
      setSuccess(
        response.data?.message || "Account created successfully. You can sign in now."
      );
      
      e.target.reset();
      
      // Navigate to home page after successful registration
      setTimeout(() => {
        navigate('/');
      }, 1500); // Give user time to see success message
      
    } catch (err) {
      const serverMsg = err.response?.data?.message || err.response?.data || null;
      setError(serverMsg || err.message || "Something went wrong.");
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-top">
          <img src={logo} alt="YumRush" className="logo" />
          <div>
            <div className="brand">YumRush</div>
            <div className="brand-sub">Create your user account</div>
          </div>
        </div>

        <h2 className="auth-title">Create an account</h2>
        <p className="auth-sub">Quick and easy — get started in seconds.</p>

        <form className="form" onSubmit={handleSubmit} aria-live="polite">
          <div className="input-group">
            <label htmlFor="name">Full name</label>
            <input 
              id="name" 
              name="name" 
              type="text" 
              className="input" 
              placeholder="Jane Doe" 
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              className="input" 
              placeholder="you@example.com" 
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              className="input" 
              placeholder="Create a password" 
            />
          </div>

          {error && <div className="alert alert-error" role="alert">{error}</div>}
          {success && <div className="alert alert-success" role="status">{success}</div>}

          <div className="actions">
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create account"}
            </button>
            <Link to="/user/login" className="btn btn-ghost" role="button">
              Sign in
            </Link>
          </div>

          <div className="alt-row">
            <span>Are you a restaurant?</span>
            <Link to="/food-partner/register" className="link">
              Partner Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;