import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer } from '@mui/material';
import { KitchenSidebar } from './layout/KitchenSidebar';
import './kitchen.css'


function KitchenMain() {
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
			<div className="kitchen-header-bar">
        <Button onClick={toggleDrawer(true)}>Open drawer</Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
            { <KitchenSidebar />}
        </Drawer>
				<Button onClick={toggleSignOut}>Sign Out</Button>
      </div>
			<p>
				This is the Kitchen Main Screen <code>src/App.js</code> and save to reload.
			</p>
		</div>
	);
}

export default KitchenMain;