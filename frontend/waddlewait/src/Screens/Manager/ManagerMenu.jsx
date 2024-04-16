import React, { useState } from 'react';
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
import './manager.css'

function ManagerMenu() {
	const navigate = useNavigate();
	const navigateTo = (link) => {
		navigate(link);
	}
	const [open, setOpen] = React.useState(false);
	const [categoryDialog, setCategoryDialog] = React.useState(false);
	const [addMenuDialog, setAddMenuDialog] = React.useState(false);

	const toggleDrawer = (isOpen) => () => {
		setOpen(isOpen);
	};
	
	const [name, setName] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [price, setPrice] = React.useState("");
	const [category, setCategory] = React.useState("");

	const [categories, setCategories] = React.useState([]);
	const [hasChange, setNewChange] = React.useState(false);
	React.useEffect(() => {
		const fetchMenu = async () => {
			try {
				const response = await axios.get('http://127.0.0.1:8000/menu');
				const data = response.data;
				setCategories(data['categories'])
				setItems(data['menuItems'])

				if (hasChange == true) {
					setNewChange(false);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchMenu();
	}, [hasChange]);


	// const addMenuItem = () => {
	// 	axios.post('http://localhost:8000/menu/addnew/', {
	// 		"name": name,
	// 		"description": description,
	// 		"price": price,
	// 		"image": "menu_images/app3_crispycorn.jpg",
	// 		"category": category
	// 		})
	// 		.then(response => {
	// 		console.log(response);
	// 		})
	// 		.catch(error => {
	// 		console.log(error);
	// 	});
	// }
	
	const [cateId, setCateId] = React.useState(1)
	const [items, setItems] = React.useState([]);

	const handleChangeTab = (event, newCateId) => {
		setCateId(newCateId);
	};

	return (
		<div>
			<Button onClick={toggleDrawer(true)}>Open drawer</Button>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				{ <ManagerSidebar />}
			</Drawer>
			<TabContext value={String(cateId)}>
				<Box sx={{paddingY: '5px', borderBottom: 1, borderColor: 'divider', justifyContent: 'space-between', display: 'flex', flexDirection: 'row'}}>
					<Tabs sx={{marginLeft: '20px' }}value={String(cateId)} 
						onChange={handleChangeTab}
						textColor="inherit"
						indicatorColor="inherit"
					>
						{categories.map((cate) => (
							<Tab key={cate.id} label={cate.name} value={String(cate.id)} />
						))}
					</Tabs>
					<Box>
						<Button
							variant="outlined"	
							color='warning'
							sx={{marginRight: '20px'}}
							onClick={() => {
								setAddMenuDialog(true)
							}}
						>
							Add Menu Item
						</Button>
						<Button
							variant="outlined"	
							color='warning'
							sx={{marginRight: '20px'}}
							onClick={() => {setCategoryDialog(true)}}
						>
							Add Category
						</Button>
					</Box>
				</Box>
				{categories.map((cate) => (
					<TabPanel value={String(cate.id)} key={cate.id}>
						<Items items={items} cateId={cate.id} setNewChange={setNewChange} categories={categories}/>
					</TabPanel>
				))}
			</TabContext>
			<CategoryDialog
				open={categoryDialog}
				onClose={setCategoryDialog}
				setNewChange={setNewChange}
			/>
			<AddMenuDialog
				open={addMenuDialog}
				onClose={setAddMenuDialog}
				setNewChange={setNewChange}
				categories={categories}
			/>
		</div>
	)
}

function Items({ items, cateId, setNewChange, categories}) {
  var cateItems = [];

  for (var index in items) {
    var item = items[index];
    if (item.category.id === cateId) {
        cateItems.push(item);
    }
	}

  return (
    <>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {cateItems.map((item) => (
          <Grid item key={item.id}>
            <Item item={item} setNewChange={setNewChange} categories={categories}/>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

function Item({item, setNewChange, categories}) {

  const [showPopUpItem, setShowPopUpItem] = React.useState(false);
	const [itemName, setItemName] = React.useState(item.name)
	const [itemDescription, setItemDescription] = React.useState(item.description)
	const [itemPrice, setItemPrice] = React.useState(item.price)

	const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

	const handleItemDescriptionChange = (event) => {
    setItemDescription(event.target.value);
  };

	const handleItemPriceChange = (event) => {
		if (/^\d+(\.?\d{0,2})?$/.test(event.target.value)) {
			setItemPrice(event.target.value);
    }
  };

  const handlePopUpItem = () => {
    setShowPopUpItem(true)
  }

  const [file, setFile] = React.useState("")
  const handleFileChange = (event) => {
		setFile(event.target.files[0])
  }

	const [category, setCategory] = React.useState(item.category.id);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

	const handleTriggerFileChange = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <Card sx={{ width: 350, height: 300 }}>
      <Grid onClick={handlePopUpItem}>
        <CardMedia
          sx={{ height: 140 }}
          image={item.image}
          title={item.name}
          />
        <CardContent
					sx={{paddingTop: 1, paddingBottom: 1}}
				>
          <Typography gutterBottom>
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ height: 50 }} >
            {item.description}
          </Typography>
        </CardContent>
      </Grid>
		<CardActions>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          width: '100%' 
        }}
      >
				<Box
					sx={{display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'row',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<Typography variant="body1" color="textSecondary">
					$ {item.price}
					</Typography>
					<Button
						variant="outlined"	
						color='warning'
						onClick={() => {setShowPopUpItem(true)}}
					>
						Edit
					</Button>
				</Box>
			</Box>
		</CardActions>
		<Dialog
			open={showPopUpItem}
			onClose={() => setShowPopUpItem(false)}
		>
        <Card sx={{ width: 600, height: 600 }}>
          <Grid onClick={handlePopUpItem}>
            <CardMedia
              sx={{ height: 250 }}
              image={item.image}
              title={item.name}
					/>
					<CardContent 
						sx={{ 
							height: 250, 
							display: 'flex',
							flexDirection: 'column',
						}}>
						<Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
							<p className="edit-input-label">Name</p>
							<TextField id="outlined-basic" variant="outlined" className="edit-input"
								value={itemName}
								onChange={handleItemNameChange}
							/>
						</Box>
						<Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
							<p className="edit-input-label">Description</p>
							<TextField id="outlined-basic" variant="outlined" className="edit-input"
								value={itemDescription}
								onChange={handleItemDescriptionChange}
							/>
						</Box>
						<Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
							<p className="edit-input-label">Price ($)</p>
							<TextField id="outlined-basic" variant="outlined" className="edit-input"
								value={itemPrice}
								onChange={handleItemPriceChange}
							/>
						</Box>
						<Box sx={{marginTop: '20px'}}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Category</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={category}
									label="Category"
									onChange={handleCategoryChange}
								>
									{categories.map((cate) => (
										<MenuItem key={cate.id} value={cate.name}>{cate.name}</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
					</CardContent>
				</Grid>
          <CardActions>
				<Box 
					sx={{ 
						display: 'flex', 
						justifyContent: 'space-between', 
						alignItems: 'center', 
						width: '580px' 
					}}
				>
					<Button
						variant="outlined"	
						color='warning'
						onClick={() => {
							axios.delete(`http://localhost:8000/menu/modify/${item.id}`)
							.then(() => {
								setShowPopUpItem(false);
								setNewChange(true);
							})
							.catch(error => {
								console.log(error);
							})
						}}
					> Delete Item</Button>
					<input type="file" onChange={handleFileChange} style={{display: 'none'}} id="fileInput"/>
					<Button 
						variant="outlined"	
						color='warning'
						onClick={handleTriggerFileChange}
					>
						{file == "" ? "Choose File" : (file.name)}
					</Button>
					<Button
						variant="outlined"	
						color='warning'
						onClick={() => {
							const formData = new FormData();
							formData.append('name', itemName);
							formData.append('description', itemDescription);
							formData.append('price', itemPrice);
							formData.append('category', category);
							if (file != "") {
								formData.append('image', file);
								formData.append('fileName', file.name);
							}
							axios.put(`http://localhost:8000/menu/modify/${item.id}`, formData, {
							  headers: {
								'Content-Type': 'multipart/form-data',
							  },
							})
							.then(() => {
								setShowPopUpItem(false);
								setNewChange(true);
							})
							.catch(error => {
								console.log(error);
							})
						}}
					> 
						Save Changes
					</Button>
				</Box>
          </CardActions>
        </Card>
      </Dialog>
    </Card>
  );
}

function CategoryDialog(props) {
  const { onClose, open, categories, setNewChange} = props;

  const handleClose = () => {
    onClose(false);
  };

	const [categoryName, setCategoryName] = React.useState('');

	const addMenuCategory = (categoryName) => {

		// Update database
		if (categoryName !== "") {
			axios.post('http://localhost:8000/menu/categories', {
				"name": categoryName
				})
				.then(response => {
				console.log(response);

				setNewChange(true);

				})
				.catch(error => {
				console.log(error);
			});
		}
	}


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Adding New Category</DialogTitle>
			<TextField 
				style={{margin: '10px'}} 
				label="Category Name" 
				variant="outlined" 
				value={categoryName} 
				placeholder="Enter category name" 
				onChange={e => setCategoryName(e.target.value)} 
			/>
			<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
				<Button
					variant="outlined"	
					color='warning'
					onClick={() => {handleClose(false)}}
				>
					Back
				</Button>
				<Button
					variant="outlined"	
					color='warning'
					onClick={() => {
						addMenuCategory(categoryName)

						handleClose(false)
					}}
				>
					Add
				</Button>
			</Box>
    </Dialog>
  );
}

function AddMenuDialog(props) {
  const { onClose, open, categories, setNewChange} = props;

	const [showPopUpItem, setShowPopUpItem] = React.useState(false);
	const [itemName, setItemName] = React.useState("")
	const [itemDescription, setItemDescription] = React.useState("")
	const [itemPrice, setItemPrice] = React.useState("")

	const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

	const handleItemDescriptionChange = (event) => {
    setItemDescription(event.target.value);
  };

	const handleItemPriceChange = (event) => {
		if (/^\d+(\.?\d{0,2})?$/.test(event.target.value)) {
			setItemPrice(event.target.value);
    }
  };

  const handlePopUpItem = () => {
    setShowPopUpItem(true)
  }

  const [file, setFile] = React.useState("")
  const handleFileChange = (event) => {
		setFile(event.target.files[0])
  }
	
  const handleClose = () => {
    onClose(false);
  };

	const handleTriggerFileChange = () => {
    document.getElementById('fileInput').click();
  };

	const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

	const [category, setCategory] = React.useState('');

  return (
    <Dialog
			open={open}
			onClose={handleClose}
		>
        <Card sx={{ width: 600, height: 600 }}>
          <Grid onClick={handlePopUpItem}>
					<CardContent 
						sx={{ 
							height: 250, 
							display: 'flex',
							flexDirection: 'column',
						}}>
						<Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
							<p className="edit-input-label">Name</p>
							<TextField id="outlined-basic" variant="outlined" className="edit-input"
								value={itemName}
								onChange={handleItemNameChange}
							/>
						</Box>
						<Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
							<p className="edit-input-label">Description</p>
							<TextField id="outlined-basic" variant="outlined" className="edit-input"
								value={itemDescription}
								onChange={handleItemDescriptionChange}
							/>
						</Box>
						<Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
							<p className="edit-input-label">Price ($)</p>
							<TextField id="outlined-basic" variant="outlined" className="edit-input"
								value={itemPrice}
								onChange={handleItemPriceChange}
							/>
						</Box>
						<Box sx={{marginTop: '20px'}}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Category</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={category}
									label="Category"
									onChange={handleCategoryChange}
								>
									{categories.map((cate) => (
										<MenuItem key={cate.id} value={cate.id}>{cate.name}</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
					</CardContent>
				</Grid>
          <CardActions>
				<Box 
					sx={{ 
						display: 'flex', 
						justifyContent: 'space-between', 
						alignItems: 'center', 
						width: '580px' 
					}}
				>
					<input type="file" onChange={handleFileChange} style={{display: 'none'}} id="fileInput"/>
					<Button 
						variant="outlined"	
						color='warning'
						onClick={handleTriggerFileChange}
					>
						{file == "" ? "Choose File" : (file.name)}
					</Button>
					<Button
						variant="outlined"	
						color='warning'
						onClick={() => {
							const formData = new FormData();
							formData.append('name', itemName);
							formData.append('description', itemDescription);
							formData.append('price', itemPrice);
							formData.append('category', category);
							if (file != "") {
								formData.append('image', file);
								formData.append('fileName', file.name);
							}
							axios.post(`http://localhost:8000/menu/addnew/`, formData, {
							  headers: {
								'Content-Type': 'multipart/form-data',
							  },
							})
							.then(() => {
								setShowPopUpItem(false);
								setNewChange(true);
							})
							.catch(error => {
								console.log(error);
							})
						}}
					> 
						Add Item
					</Button>
				</Box>
          </CardActions>
        </Card>
      </Dialog>
  );
}

export default ManagerMenu;