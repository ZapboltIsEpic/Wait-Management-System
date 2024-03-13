import React from 'react';
import {
  Tab,
  Typography,
  Box,
  Button,
  // ,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Snackbar
} from '@mui/material';
import {
  TabList,
  TabPanel,
  TabContext
} from '@mui/lab';
import {
  ShoppingCart 
} from '@mui/icons-material';


function Item({ item }) {
  console.log(item.source)
  const [showNotification, setShowNotification] = React.useState(false);

  const handleAddToCart = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <Card sx={{ width: 350, height: 300 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={item.source}
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
      message="Item added to cart"
      autoHideDuration={3000} // Hide notification after 3 seconds
      onClose={() => setShowNotification(false)}
      />
    </Card>
  );
}

function itemExample() {
  var items = []

  const item1 = {};
  item1.name = "Curry"
  item1.source = "/Screens/imgs/curry.png"
  item1.description = "description 1description 1description 1description 1description 1description 1description 1description "
  item1.price = 15.95
  items.push(item1)

  const item2 = {};
  item2.name = "CurryChicken"
  item2.source = ""
  item2.description = "description 2"
  item2.price = 15
  items.push(item2)

  const item3 = {};
  item3.name = "CurryBeef"
  item3.source = ""
  item3.description = "description 3"
  item3.price = 15
  items.push(item3)

  const item4 = {};
  item4.name = "CurryBeef"
  item4.source = ""
  item4.description = "description 4"
  item4.price = 15
  items.push(item4)

  return items
}

function cateExample() {
  return ['Appetizers', 'Mains', 'Desserts', 'Drinks']
}

function HomeMenu() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  var items = itemExample()
  var cates = cateExample()

  return (
    <>
      <h1>
        Welcome! Please select your meal!

        <Box textAlign='auto'>
          <Button
            variant="contained"
            color='warning'
            endIcon={<ShoppingCart />}
            >
            Cart 
          </Button>
        </Box>
      </h1>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList value={value} 
            onChange={handleChange}
          >
            {cates.map((cate, index) => (
              <Tab label={cate} value={index} />
            ))}
          </TabList>
        </Box>
        {cates.map((cate, cIndex) => (
          <TabPanel value={cIndex} key={cIndex}>
            <Grid container spacing={2}>
              {items.map((item, index) => (
                <Grid item key={index}>
                  <Item item={item} />
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        ))}
      </TabContext>
    </>
  );
}

export default HomeMenu;