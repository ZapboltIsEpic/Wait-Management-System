import React from 'react';
import axios from 'axios';
import {
  Tab,
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
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Table, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody
} from '@mui/material';
import {
  TabList,
  TabPanel,
  TabContext
} from '@mui/lab';
import {
  NotificationImportant,
  ShoppingCart
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

var cart = []

function Item({ item, setShowPopUpItem }) {
  const [showNotification, setShowNotification] = React.useState(false);

  const handleAddToCart = () => {
    cart.push(item)

    // axios.post('http://127.0.0.1:8000/customer/order', {
    //   tableNumber: 1,
    //   items: [{item_id: 1, quantity: 1}, {item_id: 2, quantity: 2}],
    //   bill: ''
    // });

    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const handlePopUpItem = () => {
    setShowPopUpItem(true)
    console.log('click')
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
        <Button 
          size="small" 
          color='warning'
          endIcon={<ShoppingCart />}
          onClick={handleAddToCart}
        >
          Add
        </Button>
      </Box>
      </CardActions>
      <Snackbar
        open={showNotification}
        autoHideDuration={2000}
        onClose={() => setShowNotification(false)}
      >
        <Alert
          onClose={() => setShowNotification(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {`${item.name} added to cart`}
        </Alert>
      </Snackbar>


    </Card>
  );
}

function PopUpItem() {
  return (<>
  
  </>);
}

function Items({ items, cateId, showPopUpItem, setShowPopUpItem}) {
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
            <Item item={item} showPopUpItem={showPopUpItem} setShowPopUpItem={setShowPopUpItem}/>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

function Cart({ showCart, setShowCart, setBill }) {
  const handleBill = () => {
    setShowCart(false)
    setBill(true)
  }

  var items = cart
  return (
    <Dialog 
      open={showCart} 
      onClose={() => setShowCart(false)} 
      PaperProps={{
        sx: {
          width: '80%',
          height: '80%'
        },
      }}
    >
      <DialogTitle>Your Order</DialogTitle>
      <DialogContent>
      <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">${item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          width: '100%' 
        }}
        >
          <Button onClick={handleBill} color='warning' variant="contained">
            Bill
          </Button>
          <Button onClick={() => setShowCart(false)} color='warning'>
            Close
          </Button>
          
        </Box>
      </DialogActions>
    </Dialog>
  );
}

function HomeMenu() {
  const [value, setValue] = React.useState(1)
  const [assistance, setAssistance] = React.useState(false);
  const [showPopUpItem, setShowPopUpItem] = React.useState(false);
  const [showCart, setShowCart] = React.useState(false);
  const [bill, setBill] = React.useState(false)
  const [categories, setCategories] = React.useState([]);
  const [items, setItems] = React.useState([]);

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
  }, []);

  const handleOpenCart = () => {
    setShowCart(true);
  };
  
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleAssistance = () => {
    // axios.post('http://127.0.0.1:8000/assistance', {
    //   tableNumber: 1
    // });
    setAssistance(true)
  }

  const navigate = useNavigate();

	const navigateTo = (link) => {
		navigate(link);
	}

  return (
    <>
      <h1>
        Welcome! Please select your meal!

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginX: 2}}>
          <Button
            variant="contained"
            color='warning'
            endIcon={<NotificationImportant />}
            onClick={handleAssistance}
            >
            Assistance 
          </Button>
          <Snackbar open={assistance} autoHideDuration={3000} onClose={() => setAssistance(false)}>
            <Alert
              onClose={() => setAssistance(false)}
              severity="info"
              variant="filled"
              sx={{ width: '100%' }}
            >
              A waiter will be with you shortly!
            </Alert>
          </Snackbar>
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
          <Button
            variant="contained"
            color='warning'
            endIcon={<ShoppingCart />}
            onClick={handleOpenCart}
            >
            Orders 
          </Button>
          <Cart showCart={showCart} setShowCart={setShowCart} setBill={setBill} />
          <PopUpItem showPopUpItem={showPopUpItem} setShowPopUpItem={setShowPopUpItem} />
          <Snackbar open={bill} autoHideDuration={8000} onClose={() => setBill(false)}>
            <Alert
              onClose={() => setBill(false)}
              severity="info"
              variant="filled"
              sx={{ width: '100%' }}
            >
              A waiter is coming with the bill. Thank you for dining with us!
            </Alert>
          </Snackbar>
        </Box>
      </h1>

      <TabContext value={String(value)}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList value={String(value)} 
            onChange={handleChangeTab}
            backgroundcolor="warning"
          >
            {categories.map((cate) => (
              <Tab key={cate.id} label={cate.name} value={String(cate.id)} />
            ))}
          </TabList>
        </Box>
        {categories.map((cate) => (
          <TabPanel value={String(cate.id)} key={cate.id}>
            <Items items={items} cateId={cate.id} PopUpItem={showPopUpItem} setShowPopUpItem={setShowPopUpItem}/>
          </TabPanel>
        ))}

      </TabContext>
    </>
  );
}

export default HomeMenu;