import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.png";
import "../../styles/auth.css";
import axios from 'axios';

const LoginUser = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      
      console.log(response.data);
      navigate('/home');

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-top">
          <img src={logo} alt="YumRush" className="logo" />
          <div>
            <div className="brand">YumRush</div>
            <div className="brand-sub">Order fast. Eat happy.</div>
          </div>
        </div>

        <h2 className="auth-title">User Login</h2>
        <p className="auth-sub">Sign in to continue to your YumRush account.</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className="input" placeholder="you@example.com" required />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" className="input" placeholder="Your password" required />
          </div>

          <div className="actions">
            <button className="btn btn-primary">Sign in</button>
            <Link to="/user/register" className="btn btn-ghost" role="button">Register</Link>
          </div>

          <div className="alt-row">
            <span>New here?</span>
            <Link to="/food-partner/login" className="link">Food Partner Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginUser