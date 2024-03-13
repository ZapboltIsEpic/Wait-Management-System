import React from 'react';
import {
  Tab,
  Typography,
  Box,
  Button,
  // ShoppingCartIcon,
  Card,
  CardActions,
  CardContent,
  CardMedia
} from '@mui/material';
import {
  TabList,
  TabPanel,
  TabContext
} from '@mui/lab';


function Items({ item }) {
  return (
    <Card sx={{ width: 350, height: 300 }}>
      <CardMedia
        sx={{ height: 140 }}
        src={item.source}
        title={item.name}
      />
      <CardContent>
        <Typography gutterBottom>
          {item.name}
        </Typography>
        <Typography color="text.secondary" sx={{ height: 50 }} >
          Ingredient of Curry
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          color='warning'
        >
          Add to Order
        </Button>
      </CardActions>
    </Card>
  );
}

function itemExample() {
  var items = []

  const item1 = {};
  item1.name = "Curry"
  item1.source = "/Users/a040/Desktop/COMP3900/capstone-project-3900h11a_chunkypenguins/frontend/waddlewait/src/Screens/imgs/curry.png"
  items.push(item1)

  const item2 = {};
  item2.name = "CurryChicken"
  item2.source = "/Users/a040/Desktop/COMP3900/capstone-project-3900h11a_chunkypenguins/frontend/waddlewait/src/Screens/imgs/curry.png"
  items.push(item2)

  const item3 = {};
  item3.name = "CurryBeef"
  item3.source = "/Users/a040/Desktop/COMP3900/capstone-project-3900h11a_chunkypenguins/frontend/waddlewait/src/Screens/imgs/curry.png"
  items.push(item3)

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

        <Button
          variant="contained"
          color='warning'
          // endIcon={<ShoppingCartIcon />}
        >
          Cart
        </Button>
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
          <TabPanel value={value} index={cIndex}>
            {items.map((item, index) => (
              <Items item={items[index]} />
            ))}
          </TabPanel>
        ))}
      </TabContext>
    </>
  );
}

export default HomeMenu;