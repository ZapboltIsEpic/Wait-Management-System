import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer } from '@mui/material';
import { ManagerSidebar } from './layout/ManagerSidebar';
import axios from 'axios';

function ManagerMenu() {
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
    const [categoryName, setCategoryName] = React.useState('');

	const toggleDrawer = (isOpen) => () => {
		setOpen(isOpen);
	};

    const addMenuCategory = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/menu/categories/ ', {
            "name": categoryName
            })
            .then(response => {
            console.log(response.json);
            })
            .catch(error => {
            console.log(error);
        });
    }

    const addMenuItem = () => {
    }

	return (
		<div className="App">
			<Button onClick={toggleDrawer(true)}>Open drawer</Button>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				{ <ManagerSidebar />}
			</Drawer>
			<form onSubmit={addMenuCategory}>
                <input 
                    type="text" 
                    value={categoryName} 
                    onChange={e => setCategoryName(e.target.value)} 
                    placeholder="Enter category name"
                />
                <input type="submit" value="Add Menu Category" />
            </form>
            <Button onClick={addMenuItem}>Add Menu Item</Button>
			
		</div>
	);
}

export default ManagerMenu;