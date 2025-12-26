import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../../styles/auth.css";
import logo from "../../assets/logo.png";
import axios from 'axios';

const RegisterPartner = () => {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    
    const name = e.target.restaurant.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const contactName = e.target.contactName.value.trim();
    const contactNumber = e.target.contactNumber.value.trim();
    const address = e.target.address.value.trim();
    
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/foodpartner/register",
        {
          name,
          email,
          password, 
          contactName,
          phone: contactNumber,
          address,
        }, 
        { withCredentials: true }
      );
      
      console.log(response.data);
      navigate('/create-food');
      
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-top">
          <img src={logo} alt="YumRush" className="logo" />
          <div>
            <div className="brand">YumRush</div>
            <div className="brand-sub">Partner signup</div>
          </div>
        </div>

        <h2 className="auth-title">Register your restaurant</h2>
        <p className="auth-sub">Create a partner account to manage orders and menu.</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="restaurant">Restaurant name</label>
            <input 
              id="restaurant" 
              name="restaurant" 
              type="text" 
              className="input" 
              placeholder="Ex: Saffron Bites" 
              required 
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Contact Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              className="input" 
              placeholder="owner@restaurant.com" 
              required 
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
              required 
            />
          </div>

          <div className="input-group">
            <label htmlFor="contactName">Contact Name</label>
            <input 
              id="contactName" 
              name="contactName" 
              type="text" 
              className="input" 
              placeholder="Ex: Joy Kumar" 
              required 
            />
          </div>

          <div className="input-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input 
              id="contactNumber" 
              name="contactNumber" 
              type="tel" 
              className="input" 
              placeholder="Ex: 9988776655" 
              required 
            />
          </div>

          <div className="input-group">
            <label htmlFor="address">Restaurant Address</label>
            <input 
              id="address" 
              name="address" 
              type="text" 
              className="input" 
              placeholder="Ex: 123 Main Street, Mumbai" 
              required 
            />
          </div>

          <div className="actions">
            <button className="btn btn-primary" type="submit">Create account</button>
            <Link to="/food-partner/login" className="btn btn-ghost" role="button">Sign in</Link>
          </div>

          <div className="alt-row">
            <span>Need user access?</span>
            <Link to="/user/register" className="link">User Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPartner