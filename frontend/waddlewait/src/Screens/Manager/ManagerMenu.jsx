import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer } from '@mui/material';
import { ManagerSidebar } from './layout/ManagerSidebar';
import axios from 'axios';
import TextField from '@mui/material/TextField';

function ManagerMenu() {
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
    const [categoryName, setCategoryName] = React.useState('');

	const toggleDrawer = (isOpen) => () => {
		setOpen(isOpen);
	};

    const addMenuCategory = (event) => {
			event.preventDefault();
			console.log(categoryName)
			axios.post('http://localhost:8000/menu/categories', {
				"name": categoryName
				})
				.then(response => {
				console.log(response);
				})
				.catch(error => {
				console.log(error);
			});
    }

		
		const [name, setName] = React.useState("");
		const [description, setDescription] = React.useState("");
		const [price, setPrice] = React.useState("");
		const [category, setCategory] = React.useState("");

    const addMenuItem = () => {
			axios.post('http://localhost:8000/menu/addnew/', {
				"name": name,
				"description": description,
				"price": price,
				"image": "menu_images/app3_crispycorn.jpg",
				"category": category
				})
				.then(response => {
				console.log(response);
				})
				.catch(error => {
				console.log(error);
			});

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
				<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '600px', alignContent: 'center'}}>
					<TextField style={{margin: '10px'}} id="outlined-basic" label="Name" variant="outlined" onChange={(e) => setName(e.target.value)}/>
					<TextField style={{margin: '10px'}} id="outlined-basic" label="Description" variant="outlined" onChange={(e) => setDescription(e.target.value)}/>
					<TextField style={{margin: '10px'}} id="outlined-basic" label="Price" variant="outlined" onChange={(e) => setPrice(e.target.value)}/>
					<TextField style={{margin: '10px'}} id="outlined-basic" label="Category" variant="outlined" onChange={(e) => setCategory(e.target.value)}/>
				</div>
			
		</div>
	);
}

export default ManagerMenu;