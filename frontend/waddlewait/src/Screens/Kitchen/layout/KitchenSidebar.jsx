import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../App.css";

export const KitchenSidebar = () => {
	const navigate = useNavigate();

	const handleOrderRequestsClick = () => {
		navigate('/kitchen/order-requests'); 
	};

	const handleCompletedRequestsClick = () => {
		navigate('/kitchen/completed-requests'); 
	};

	const handleKitchenMainClick = () => {
		navigate('/kitchen/main'); 
	};

	return (
		<div className="KitchenSidebar">
			<div><a onClick={handleKitchenMainClick}>Kitchen main</a></div>
			<div><a onClick={handleOrderRequestsClick}>Order Requests</a></div>
			<div><a onClick={handleCompletedRequestsClick}>Completed Requests</a></div>
		</div>
	);
};