import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginUser from '../pages/auth/LoginUser';
import RegisterUser from '../pages/auth/RegisterUser';
import LoginPartner from '../pages/auth/LoginPartner';
import RegisterPartner from '../pages/auth/RegisterPartner';
import Landing from '../pages/general/Landing';
import Home from '../pages/general/Home';
import CreateFood from '../pages/food-partner/CreateFood';
import PartnerDashboard from '../pages/food-partner/PartnerDashboard';
import EditPartnerProfile from '../pages/food-partner/EditPartnerProfile';
import Profile from '../pages/food-partner/Profile';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/user/register" element={<RegisterUser/>} />
                <Route path="/user/login" element={<LoginUser/>} />
                <Route path="/food-partner/register" element={<RegisterPartner/>} />
                <Route path="/food-partner/login" element={<LoginPartner/>} />
                <Route path="/food-partner/dashboard" element={<PartnerDashboard/>} />
                <Route path="/food-partner/edit-profile" element={<EditPartnerProfile/>} />
                <Route path="/create-food" element={<CreateFood/>} />
                <Route path="/food-partner/:id" element={<Profile/>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;