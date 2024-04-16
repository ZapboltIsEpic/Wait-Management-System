import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../App.css";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

export const WaiterSidebar = () => {
    const navigate = useNavigate();

    const handleOrderRequestsClick = () => {
        navigate("/waiter/order-requests"); 
    };

    const handleAssistanceRequestClick = () => {
        navigate("/waiter/assistance-requests"); 
    };

    const handleBillRequestsClick = () => {
        navigate("/waiter/bill-requests"); 
    };

    const handleSignOutClick = () => {
        navigate("/"); 
    };

    return (
        <div className="WaiterSidebar">
            <List>
                <ListItem>
                    <ListItemButton onClick={handleOrderRequestsClick}>
                        <ListItemText primary="Order Requests" />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={handleAssistanceRequestClick}>
                        <ListItemText primary="Assistance Requests" />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={handleBillRequestsClick}>
                        <ListItemText primary="Bill Requests" />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={handleSignOutClick}>
                        <ListItemText primary="Sign Out" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );
};