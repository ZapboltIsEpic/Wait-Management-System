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
	const [categoryDialog, setCategoryDialog] = React.useState(false);

	const toggleDrawer = (isOpen) => () => {
		setOpen(isOpen);
	};
	
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
				setItems(data['menuItems'])
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchMenu();
	}, [categories]);


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
					<Button
						variant="outlined"	
						color='warning'
						sx={{marginRight: '20px'}}
						onClick={() => {setCategoryDialog(true)}}
					>
						Add Category
					</Button>
				</Box>
				{categories.map((cate) => (
					<TabPanel value={String(cate.id)} key={cate.id}>
						<Items items={items} cateId={cate.id}/>
					</TabPanel>
				))}
			</TabContext>
			<CategoryDialog
				open={categoryDialog}
				onClose={setCategoryDialog}
				categories={categories}
				setCategories={setCategories}
			/>
		</div>
	)
}

function Items({ items, cateId}) {
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
            <Item item={item}/>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

function Item({ item}) {
  const [showPopUpItem, setShowPopUpItem] = React.useState(false);


  const handlePopUpItem = () => {
    setShowPopUpItem(true)
  }

  return (
    <Card sx={{ width: 350, height: 300 }}>
      <Grid onClick={handlePopUpItem}>
        <CardMedia
          sx={{ height: 140 }}
          image={item.image}
          title={item.name}
          />
        <CardContent>
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
        <Typography variant="body1" color="textSecondary">
          $ {item.price}
        </Typography>
      </Box>
      </CardActions>

      <Dialog
        open={showPopUpItem}
        onClose={() => setShowPopUpItem(false)}
      >
        <Card sx={{ width: 700, height: 600 }}>
          <Grid onClick={handlePopUpItem}>
            <CardMedia
              sx={{ height: 250 }}
              image={item.image}
              title={item.name}
              />
            <CardContent sx={{ height: 250 }}>
              <Typography variant="h4">
                {item.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
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
              width: '580px' 
            }}
          >
            <Typography variant="body1" color="textSecondary">
              $ {item.price}
            </Typography>
          </Box>
          </CardActions>
        </Card>
      </Dialog>

    </Card>
  );
}

function CategoryDialog(props) {
  const { onClose, open, categories, setCategories} = props;

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

				// Update local display
				let newCategories = [...categories, categoryName]
				setCategories(newCategories)

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

export default ManagerMenu;