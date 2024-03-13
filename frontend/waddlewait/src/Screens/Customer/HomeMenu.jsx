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
  Snackbar,
  Alert
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

function itemExample() {
  var items = []

  const item1 = {};
  item1.name = "Curry"
  item1.source = "https://www.allrecipes.com/thmb/FL-xnyAllLyHcKdkjUZkotVlHR8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/46822-indian-chicken-curry-ii-DDMFS-4x3-39160aaa95674ee395b9d4609e3b0988.jpg"
  item1.description = "description 1description 1description 1description 1description 1description 1description 1description "
  item1.price = 15.95
  items.push(item1)

  const item2 = {};
  item2.name = "CurryChicken"
  item2.source = "https://www.allrecipes.com/thmb/FL-xnyAllLyHcKdkjUZkotVlHR8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/46822-indian-chicken-curry-ii-DDMFS-4x3-39160aaa95674ee395b9d4609e3b0988.jpg"
  item2.description = "description 2"
  item2.price = 15
  items.push(item2)

  const item3 = {};
  item3.name = "CurryBeef"
  item3.source = "https://www.allrecipes.com/thmb/FL-xnyAllLyHcKdkjUZkotVlHR8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/46822-indian-chicken-curry-ii-DDMFS-4x3-39160aaa95674ee395b9d4609e3b0988.jpg"
  item3.description = "description 3"
  item3.price = 15
  items.push(item3)

  const item4 = {};
  item4.name = "CurryBeef"
  item4.source = "https://www.allrecipes.com/thmb/FL-xnyAllLyHcKdkjUZkotVlHR8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/46822-indian-chicken-curry-ii-DDMFS-4x3-39160aaa95674ee395b9d4609e3b0988.jpg"
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
            backgroundColor="warning"
          >
            {cates.map((cate, index) => (
              <Tab label={cate} value={index} />
            ))}
          </TabList>
        </Box>
        {cates.map((cate, cIndex) => (
          <TabPanel value={cIndex} key={cIndex}>
            <Grid container spacing={4} justifyContent="center" alignItems="center">
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