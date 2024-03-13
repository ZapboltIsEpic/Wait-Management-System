import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


function Items({ item }) {
  console.log(item)
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

function HomeMenu() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const item = {};
  item.name = "Curry"
  item.source = "/Users/a040/Desktop/COMP3900/capstone-project-3900h11a_chunkypenguins/frontend/waddlewait/src/Screens/imgs/curry.png"

  return (
    <>
      <h1>
        Welcome! Please select your meal!

        <Button
          variant="contained"
          // endIcon={<ShoppingCartIcon />}
        >
          Go to ../c
        </Button>
      </h1>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Category One" {...a11yProps(0)} />
          <Tab label="Category Two" {...a11yProps(1)} />
          <Tab label="Category Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* Render Items as a component */}
        <Items item={item} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </>
  );
}

export default HomeMenu;