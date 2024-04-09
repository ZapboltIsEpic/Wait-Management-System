import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Tab,
  Tabs,
  Typography,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Snackbar,
  Alert,
	Drawer,
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Table, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import {
  TabPanel,
  TabContext
} from '@mui/lab';
import { ManagerSidebar } from './layout/ManagerSidebar';
import axios from 'axios';

function ManagerMenu() {
	const navigate = useNavigate();
	const navigateTo = (link) => {
		navigate(link);
	}
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

		const [categories, setCategories] = React.useState([]);
		React.useEffect(() => {
			const fetchMenu = async () => {
				try {
					const response = await axios.get('http://127.0.0.1:8000/menu');
					const data = response.data;
					setCategories(data['categories'])
					// setItems(data['menuItems'])
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			};
			fetchMenu();
		}, []);


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
		<>
			<h1>
				Welcome! Please select your meal!
				<Box sx={{ display: 'flex', justifyContent: 'space-between', marginX: 2}}>
					<div>
						<Button 
							variant="outlined"
							onClick={() => {
								navigateTo('/');
							}}
							className="button"
							color='warning'
						>
							Exit
						</Button>
					</div>

				</Box>
			</h1>

			{/* <TabContext value={String(cateId)}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={String(cateId)} 
						onChange={handleChangeTab}
						textColor="inherit"
						indicatorColor="inherit"
					>
						{categories.map((cate) => (
							<Tab key={cate.id} label={cate.name} value={String(cate.id)} />
						))}
					</Tabs>
				</Box>
				{categories.map((cate) => (
					<TabPanel value={String(cate.id)} key={cate.id}>
						<Items items={items} cateId={cate.id} cart={cart} setCart={setCart} />
					</TabPanel>
				))}
			</TabContext> */}
		</>
	)

	// return (
	// 	<div className="App">
	// 		<Button onClick={toggleDrawer(true)}>Open drawer</Button>
	// 		<Drawer open={open} onClose={toggleDrawer(false)}>
	// 			{ <ManagerSidebar />}
	// 		</Drawer>
	// 		<form onSubmit={addMenuCategory}>
	// 			<input 
	// 				type="text" 
	// 				value={categoryName} 
	// 				onChange={e => setCategoryName(e.target.value)} 
	// 				placeholder="Enter category name"
	// 			/>
	// 			<input type="submit" value="Add Menu Category" />
	// 			</form>
	// 			<Button onClick={addMenuItem}>Add Menu Item</Button>
	// 			<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '600px', alignContent: 'center'}}>
	// 				<TextField style={{margin: '10px'}} id="outlined-basic" label="Name" variant="outlined" onChange={(e) => setName(e.target.value)}/>
	// 				<TextField style={{margin: '10px'}} id="outlined-basic" label="Description" variant="outlined" onChange={(e) => setDescription(e.target.value)}/>
	// 				<TextField style={{margin: '10px'}} id="outlined-basic" label="Price" variant="outlined" onChange={(e) => setPrice(e.target.value)}/>
	// 				<TextField style={{margin: '10px'}} id="outlined-basic" label="Category" variant="outlined" onChange={(e) => setCategory(e.target.value)}/>
	// 			</div>
			
	// 	</div>
	// );
}

export default ManagerMenu;