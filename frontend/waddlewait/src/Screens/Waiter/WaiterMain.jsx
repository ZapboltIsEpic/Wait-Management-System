import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer } from '@mui/material';
import { WaiterSidebar } from './layout/WaiterSidebar';
import './waiter.css';

function WaiterMain() {
	const navigate = useNavigate();

	const toggleSignOut = () => {
		navigate("/staff/login");
	};

	return (
		<div className="App">
			<Drawer 
			variant="permanent"
			anchor="left"
			>
				{ <WaiterSidebar />}
			</Drawer>
			<div className="main-content">
				<h1> Wait Staff </h1>
				<div>
				<Button 
					variant="outlined"
					onClick={() => {
					navigate('/');
					}}
					className="button"
					color='warning'
				>
					Exit
				</Button>
				</div>
				<p>
					This is the Waiter Main Screen <code>src/App.js</code> and save to reload.
				</p>
			</div>
		</div>
	);
}

export default WaiterMain;