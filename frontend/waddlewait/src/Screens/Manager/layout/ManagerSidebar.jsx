import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../App.css";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

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
        navigate("/"); 
    };

    const ManagerListItems = [
        { key: 'Menu', value: handleMenuClick },
        { key: 'Categories', value: handleCategoriesClick },
        { key: 'Sign Out', value: handleManageSignOut },
    ];

    return (
		<div className="ManagerSidebar">
			<List>
				{ManagerListItems.map(({key , value}) => (
					<ListItem className="list-item" key={key}>	
						<ListItemButton className="list-button" onClick={value} 
							sx={{'&:hover': {
									backgroundColor: '#fdfaf6',	
									color: '#dd6800'
								}
							}}
						>
							<ListItemText primary={key} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</div>
	);
    // return (
    //     <div className="ManagerSidebar">
    //         <div><a onClick={handleDashboardClick}>Dashboard</a></div>
    //         <div><a onClick={handleCategoriesClick}>Categories</a></div>
    //         <div><a onClick={handleMenuClick}>Menu</a></div>
    //         <div><a onClick={handleManageOrderClick}>ManageOrder</a></div>
    //         <div><a onClick={handleManageSignOut}>Sign out</a></div>
    //     </div>
    // );
};