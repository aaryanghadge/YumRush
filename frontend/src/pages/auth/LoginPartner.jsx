import React from 'react'
import { Link } from 'react-router-dom'
import "../../styles/auth.css";
import logo from "../../assets/logo.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginPartner = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/foodpartner/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(response.data);
      navigate('/food-partner/dashboard');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-top">
          <img src={logo} alt="YumRush" className="logo" />
          <div>
            <div className="brand">YumRush</div>
            <div className="brand-sub">Partner portal</div>
          </div>
        </div>

        <h2 className="auth-title">Food Partner Login</h2>
        <p className="auth-sub">Sign in to manage your restaurant and menu.</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className="input" placeholder="partner@restaurant.com" />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" className="input" placeholder="Your password" />
          </div>

          <div className="actions">
            <button className="btn btn-primary">Sign in</button>
            <Link to="/food-partner/register" className="btn btn-ghost" role="button">Register</Link>
          </div>

          <div className="alt-row">
            <span>Back to</span>
            <Link to="/user/login" className="link">User Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPartner
