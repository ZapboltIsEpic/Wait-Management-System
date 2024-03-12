import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer } from '@mui/material';
import { WaiterSidebar } from './layout/WaiterSidebar';

function WaiterMain() {
	const navigate = useNavigate();

	const [open, setOpen] = React.useState(false);

	const navigateTo = (link) => {
		navigate(link);
	}

	const toggleDrawer = (isOpen) => () => {
		setOpen(isOpen);
	};

	const toggleSignOut = () => {
		navigate("/staff/login");
	};

	return (
		<div className="App">
			<Button onClick={toggleDrawer(true)}>Open drawer</Button>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				{ <WaiterSidebar />}
			</Drawer>
			<p>
				This is the Waiter Main Screen <code>src/App.js</code> and save to reload.
			</p>
			<Button onClick={toggleSignOut}>Sign Out</Button>
		</div>
	);
}

export default WaiterMain;