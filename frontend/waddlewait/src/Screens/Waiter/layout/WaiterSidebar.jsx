import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../App.css";

export const WaiterSidebar = () => {
    const navigate = useNavigate();

    const handleOrderRequestsClick = () => {
        navigate("/waiter/order-requests"); 
    };

    const handleAssistanceRequestClick = () => {
        navigate("/waiter/assistance-requests"); 
    };

    const handleSignOutClick = () => {
        navigate("/"); 
    };

    return (
        <div className="WaiterSidebar">
            <div><a onClick={handleOrderRequestsClick}>Order Requests</a></div>
            <div><a onClick={handleAssistanceRequestClick}>Assistance Requests</a></div>
            <div><a onClick={handleSignOutClick}>Sign Out</a></div>
        </div>
    );
};