import React from 'react';
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

var cart = []

function Item({ item }) {
  const [showNotification, setShowNotification] = React.useState(false);

  const handleAddToCart = () => {
    cart.push(item)
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <Card sx={{ width: 350, height: 300 }}>
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
          $ {item.price.toFixed(2)}
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

function Items({ items, cateId }) {
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
            <Item item={item} />
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
                  <TableCell align="right">${item.price.toFixed(2)}</TableCell>
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

function itemExample() {
  var items = []

  // {"id", "name", "description", "price",”image” "category": { "id", "name"} } 
  const item0 = {};
  item0.id = 0
  item0.name = "Easy Appetizers"
  item0.image = "https://insanelygoodrecipes.com/wp-content/uploads/2021/05/antipasto-skewers-with-basil-1.jpg"
  item0.description = "description 0description 0description 0description 0description 0description 0description 0description "
  item0.price = 5.95
  item0.category = { "id":0, "name":"Appetizers"}
  items.push(item0)
  

  const item1 = {};
  item1.id = 1
  item1.name = "Curry"
  item1.image = "https://www.allrecipes.com/thmb/FL-xnyAllLyHcKdkjUZkotVlHR8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/46822-indian-chicken-curry-ii-DDMFS-4x3-39160aaa95674ee395b9d4609e3b0988.jpg"
  item1.description = "description 1description 1description 1description 1description 1description 1description 1description "
  item1.price = 15.95
  item1.category = { "id":1, "name":"Mains"}
  items.push(item1)

  const item2 = {};
  item2.id = 2
  item2.name = "Curry Chicken"
  item2.image = "https://www.allrecipes.com/thmb/FL-xnyAllLyHcKdkjUZkotVlHR8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/46822-indian-chicken-curry-ii-DDMFS-4x3-39160aaa95674ee395b9d4609e3b0988.jpg"
  item2.description = "description 2"
  item2.price = 15.95
  item2.category = { "id":1, "name":"Mains"}
  items.push(item2)

  const item3 = {};
  item3.id = 3
  item3.name = "Curry Beef"
  item3.image = "https://www.allrecipes.com/thmb/FL-xnyAllLyHcKdkjUZkotVlHR8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/46822-indian-chicken-curry-ii-DDMFS-4x3-39160aaa95674ee395b9d4609e3b0988.jpg"
  item3.description = "description 3"
  item3.price = 15.95
  item3.category = { "id":1, "name":"Mains"}
  items.push(item3)

  const item4 = {};
  item4.id = 4
  item4.name = "Curry Seafood"
  item4.image = "https://www.allrecipes.com/thmb/FL-xnyAllLyHcKdkjUZkotVlHR8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/46822-indian-chicken-curry-ii-DDMFS-4x3-39160aaa95674ee395b9d4609e3b0988.jpg"
  item4.description = "description 4"
  item4.price = 18.95
  item4.category = { "id":1, "name":"Mains"}
  items.push(item4)

  const item5 = {};
  item5.id = 5
  item5.name = "Ice Cream"
  item5.image = "https://www.allrecipes.com/thmb/pH8hoFfytcOT9XVK1DSmxv3L0OU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/140877-easy-eggless-strawberry-ice-cream-ddmfs-3x4-1-092e4d11b59049c8b3843014ea3c57f2.jpg"
  item5.description = "description 5"
  item5.price = 15
  item5.category = { "id":2, "name":"Desserts"}
  items.push(item5)

  return items
}

function cateExample() {
  var cate = []

  var cate0 = {}
  cate0.id = 0
  cate0.name = "Appetizers"
  cate.push(cate0)

  var cate1 = {}
  cate1.id = 1
  cate1.name = "Mains"
  cate.push(cate1)

  var cate2 = {}
  cate2.id = 2
  cate2.name = "Desserts"
  cate.push(cate2)

  var cate3 = {}
  cate3.id = 3
  cate3.name = "Drinks"
  cate.push(cate3)
  
  return cate
}

function HomeMenu() {
  const [value, setValue] = React.useState(0)
  const [assistant, setAssistant] = React.useState(false);
  const [showCart, setShowCart] = React.useState(false);
  const [bill, setBill] = React.useState(false)


  const handleOpenCart = () => {
    setShowCart(true);
  };
  
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  var items = itemExample()
  var cates = cateExample()

  return (
    <>
      <h1>
        Welcome! Please select your meal!

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginX: 2}}>
          <Button
            variant="contained"
            color='warning'
            endIcon={<NotificationImportant />}
            onClick={() => setAssistant(true)}
            >
            Assistant 
          </Button>
          <Snackbar open={assistant} autoHideDuration={3000} onClose={() => setAssistant(false)}>
            <Alert
              onClose={() => setAssistant(false)}
              severity="info"
              variant="filled"
              sx={{ width: '100%' }}
            >
              A waiter will be with you shortly!
            </Alert>
          </Snackbar>
          <Button
            variant="contained"
            color='warning'
            endIcon={<ShoppingCart />}
            onClick={handleOpenCart}
            >
            Orders 
          </Button>
          <Cart showCart={showCart} setShowCart={setShowCart} setBill={setBill} />
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

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList value={value} 
            onChange={handleChangeTab}
            backgroundcolor="warning"
          >
            {cates.map((cate) => (
              <Tab key={cate.id} label={cate.name} value={cate.id} />
            ))}
          </TabList>
        </Box>
        {cates.map((cate) => (
          <TabPanel value={cate.id} key={cate.id}>
            <Items items={items} cateId={cate.id} />
          </TabPanel>
        ))}

      </TabContext>
    </>
  );
}

export default HomeMenu;