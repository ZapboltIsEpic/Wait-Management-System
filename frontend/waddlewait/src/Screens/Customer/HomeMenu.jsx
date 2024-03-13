import React from 'react';
import {
  Tabs,
  Tab,
  TabContext,
  TabList,
  TabPanel,
  Typography,
  Box,
  Button,
  // ShoppingCartIcon,
  Card,
  CardActions,
  CardContent,
  CardMedia
} from '@mui/material';
import PropTypes from 'prop-types';


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

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
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

      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} 
          onChange={handleChange}
        >
          {cates.map((cate, index) => (
            <Tab label={cate} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {cates.map((cate, cIndex) => (
        <CustomTabPanel value={value} index={cIndex}>
          {items.map((item, index) => (
            <Items item={items[index]} />
          ))}
        </CustomTabPanel>
      ))} */}


      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </>
  );
}

export default HomeMenu;