import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../App.css";

export const ManagerSidebar = () => {
    const navigate = useNavigate();

    const handleDashboardClick = () => {
        navigate('/manager/dashboard'); 
    };

    const handleCategoriesClick = () => {
        navigate('/manager/categories'); 
    };

    const handleMenuClick = () => {
        navigate('/manager/menu'); 
    };

    const handleManageOrderClick = () => {
        navigate('/manager/manageorder'); 
    };

    const handleManageSignOut = () => {
        navigate('/staff/login'); 
    };

    return (
        <div className="ManagerSidebar">
            <div><a onClick={handleDashboardClick}>Dashboard</a></div>
            <div><a onClick={handleCategoriesClick}>Categories</a></div>
            <div><a onClick={handleMenuClick}>Menu</a></div>
            <div><a onClick={handleManageOrderClick}>ManageOrder</a></div>
            <div><a onClick={handleManageSignOut}>Sign out</a></div>
        </div>
    );
};