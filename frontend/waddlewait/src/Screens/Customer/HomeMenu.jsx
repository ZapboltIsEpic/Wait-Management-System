import React from 'react';
import axios from 'axios';
import './CustomerStyle.css'
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
import {
  NotificationImportant,
  ShoppingCart,
  DeleteOutline
} from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';

function Item({ item, cart, setCart }) {
  const [showNotification, setShowNotification] = React.useState(false);
  const [showPopUpItem, setShowPopUpItem] = React.useState(false);

  const handleAddToCart = () => {
    var newCart = cart
    newCart.push(item)
    setCart(newCart)

    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);

    setShowPopUpItem(false)
  };

  const handlePopUpItem = () => {
    setShowPopUpItem(true)
  }

  return (
    <Card sx={{ width: 350, height: 300 }}>
      <Grid onClick={handlePopUpItem}>
        <CardMedia
          sx={{ height: 180 }}
          image={item.image}
          title={item.name}
          />
        <CardContent
          sx={{paddingTop: 1, paddingBottom: 1}}
        >
          <Typography gutterBottom>
            {item.name}
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

      <Dialog
        open={showPopUpItem}
        onClose={() => setShowPopUpItem(false)}
      >
        <Card>
          <Grid onClick={handlePopUpItem}>
            <CardMedia
              sx={{ height: 250 }}
              image={item.image}
              title={item.name}
              />
            <CardContent>
              <Typography variant="h4">
                {item.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
            <CardContent sx={{ height: 250}}>
              <Typography variant="body1">
                Ingredients: {item.ingredients}
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
        </Card>
      </Dialog>

    </Card>
  );
}

function Items({ items, cateId, cart, setCart }) {
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
            <Item item={item} cart={cart} setCart={setCart}/>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

function Cart({ cart, setCart, orders, setOrders, showCart, setShowCart, setOrder, showOrders, setShowOrders, setBill, tableNum}) {
  const handleOrder = () => {
    setShowCart(false)
    axios.post('http://127.0.0.1:8000/customer/order', {
      table: tableNum,
      items: cart
    });
    setOrder(true)
    setShowCart(false)
    setCart([])

    setOrders(orders.concat(cart))
  }
  
  
  const handleDeleteItem = (itemIndex) => {
    var newCart = [...cart]
    newCart.splice(itemIndex,1)
    setCart(newCart)
  }
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
      <DialogTitle>
        <Typography fontSize="20px" >Cart</Typography>
        <IconButton onClick={() => setShowCart(false)} sx={{ position: 'absolute', right: 5, top: 5 }}>
          <ClearIcon />
        </IconButton>
        <Button
          variant="contained"
          color='warning'
          onClick={() => setShowOrders(true)}
          size="small" 
        >
          View Orders
        </Button>
        <Orders 
          orders={orders}
          showOrders={showOrders} 
          setShowOrders={setShowOrders} 
          setBill={setBill} 
          tableNum={tableNum}
        />
      </DialogTitle>
      <DialogContent>
        
      <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item, itemIndex) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">${item.price}</TableCell>
                  <TableCell align="right">
                    <DeleteOutline onClick={() => handleDeleteItem(itemIndex)}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Box sx={{ 
          display: 'auto',
          width: '100%' 
        }}
        >
          { cart.length === 0 ? (
            <Button disabled color='warning' variant="contained">
              Order
            </Button>
          ):(
            <Button onClick={handleOrder} color='warning' variant="contained">
              Order
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
}

function Orders ({ showOrders, setShowOrders, setBill, tableNum }) {
  const [orders, setOrders] = React.useState([])
  const [total, setTotal] = React.useState(0)
  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/customer/ordered/${tableNum}`);
        const data = response.data;
        setOrders(data)
        setTotal(data.reduce((acc, currentValue) => acc + currentValue.price, 0))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchOrders();
  }, []);

  const handleBill = () => {
    axios.post('http://127.0.0.1:8000/customer/bill', {
      table: tableNum,
    });
    setBill(true)
    setShowOrders(false)
  }

  return (
    <Dialog
      open={showOrders} 
      onClose={() => setShowOrders(false)} 
      PaperProps={{
        sx: {
          width: '80%',
          height: '80%'
        },
      }}
    >
      <DialogTitle>Orders
      <IconButton onClick={() => setShowOrders(false)} sx={{ position: 'absolute', right: 5, top: 5 }}>
          <ClearIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
      <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item["name"]}</TableCell>
                  <TableCell>${item["price"]}</TableCell>
                  <TableCell>{item["quantity"]}</TableCell>
                  <TableCell>{item["status"]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Box sx={{ 
          display: 'auto',
          width: '100%' 
        }}
        >
          { orders.length === 0 ? (
            <Button disabled color='warning' variant="contained">
              Bill
            </Button>
          ):(
            <Button onClick={handleBill} color='warning' variant="contained">
              Bill
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
}

function HomeMenu() {
  const [cateId, setCateId] = React.useState(1)

  // Table Selection variables
  const [groupSize, setGroupSize] = React.useState('')
  const [tableNum, setTableNum] = React.useState('')
  const [showError, setShowError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")
  const [tableData, setTableData] = React.useState([]);
  const [currentTables, setCurrentTables] = React.useState([]);
  const [confirmTable, setConfirmTable] = React.useState('')

  // Menu variables
  const [assistance, setAssistance] = React.useState(false);
  const [showOrders, setShowOrders] = React.useState(false)
  const [showCart, setShowCart] = React.useState(false);
  const [bill, setBill] = React.useState(false)
  const [order, setOrder] = React.useState(false)
  const [categories, setCategories] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [cart, setCart] = React.useState([]);
  const [orders, setOrders] = React.useState([])

  const navigate = useNavigate();
	const navigateTo = (link) => {
		navigate(link);
	}

  React.useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/tables');
        const data = response.data;
        let newData = [];
        data.forEach(table => {
          // Check if table is used
          if (table.table_in_use === false) {
            newData.push(table);
          }

        })
        setTableData(newData);
        setCurrentTables(newData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTables();
  }, []);

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

  // Table Selection helpers
  const changeGroupSize = (event) => {
    setGroupSize(event.target.value);
    setTableNum('');
    setShowError(false);
    // Change available tables
    let filteredTables = [];
    tableData.forEach(table => {
      if (table.seats_max >= event.target.value) {
        filteredTables.push(table);
      }
    })
    setCurrentTables(filteredTables);
  };

  const changeTableNum = (event) => {
    setTableNum(event.target.value);
  };

  const handleConfirm = () => {
    if (tableNum && groupSize && groupSize > 0) {
      // When table is used, set post request
      setConfirmTable(tableNum)
      axios.put('http://127.0.0.1:8000/table/reserve', {
        table: tableNum,
      });
    } else if (tableNum === '' && groupSize <= 0) {
      setErrorMessage("Please enter your group size and select the table number.")
    } else if (groupSize <= 0) {
      setErrorMessage("Please enter your group size.")
    } else if (tableNum === '') {
      setErrorMessage("Please select a Table Number.")
    }
    setShowError(true);
  };

  // Menu helpers
  const handleChangeTab = (event, newCateId) => {
    setCateId(newCateId);
  };
  
  const handleAssistance = () => {
    axios.post('http://127.0.0.1:8000/customer/assistance', {
      "table": tableNum
    })
    .catch(error => {
      console.log(error);
      console.log("Assistance has already been called!")
    });

    setAssistance(true)
  }

  return (
    <>
      {confirmTable === '' ? (
        // Table Selection
        <div className="customer-screen">
          <div className="customer-container">
          <h1>
            Table Selection
          </h1>
          
          <p>
            Please select your group size and a table number
          </p>
          <Grid container spacing={5} style={{ marginTop: '5px', marginBottom: '10px', justifyContent: 'center' }}>
            <Grid item>
              <FormControl fullWidth>
                <TextField
                  id="groupSizeField"
                  label="Group Size"
                  type="number"
                  inputProps={{
                    min: 1
                  }}
                  value={groupSize}
                  onChange={changeGroupSize}
                  sx={{ width: 150 }}
                />
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl fullWidth>
                <InputLabel id="groupSizeLabel">Table Number</InputLabel>
                <Select 
                  labelId="tableNumField"
                  label="Table Number" 
                  type="number"
                  value={tableNum}
                  onChange={changeTableNum}
                  sx={{ width: 150 }}
                >
                  {currentTables.length > 0 ? (
                    currentTables.map((item, index) => (
                      <MenuItem key={index} value={item.table_number}>{item.table_number}</MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No tables available</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <div className="table-button-container">
            <Button variant="outlined" onClick={() => navigate('/')} className="custom-button" color='warning' >
              Back
            </Button>
            <Button variant="contained" onClick={handleConfirm} className="custom-button" color='warning' >
              Confirm
            </Button>

          </div>

          {showError && (
            <>
              <Alert severity="error" sx={{ width: '100%' }}>
                {errorMessage}
              </Alert>
            </>
          )}
          </div>
        </div>
      ):(
      // Menu
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
              onClick={() => setShowCart(true)}
              >
              Cart
            </Button>
            <Cart 
              cart={cart}
              setCart={setCart}
              orders={orders}
              setOrders={setOrders}
              showCart={showCart} 
              setShowCart={setShowCart} 
              setOrder={setOrder} 
              showOrders={showOrders}
              setShowOrders={setShowOrders}
              setBill={setBill}
              tableNum={confirmTable}
            />

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

            <Snackbar open={order} autoHideDuration={8000} onClose={() => setOrder(false)}>
              <Alert
                onClose={() => setBill(false)}
                severity="info"
                variant="filled"
                sx={{ width: '100%' }}
              >
                Your order is been place. Please wait for your meal!
              </Alert>
            </Snackbar>

          </Box>
        </h1>

        <TabContext value={String(cateId)}>
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
        </TabContext>
      </>
    )}
  </>
  );
}

export default HomeMenu;