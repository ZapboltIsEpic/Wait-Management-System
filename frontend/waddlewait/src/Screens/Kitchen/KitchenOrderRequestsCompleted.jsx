import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer } from '@mui/material';
import { KitchenSidebar } from './layout/KitchenSidebar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import './kitchen.css'

function MakeOrder() {

  return (
    <Card className="order-card" sx={{ minWidth: 300, maxHeight: 400, maxWidth: 300}}>
      <CardHeader
        title="Order num"
        subheader="Table no"
      />
      <CardContent className="order-card-contents">
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Order details
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Salmon, Tuna, Sashimi
        </Typography>
        <Typography color="text.secondary">
          Notes
        </Typography>
      </CardContent>
    </Card>
  )
}

function KitchenOrderRequestsCompleted() {
  const [orderRequests, setOrderRequests] = useState([]);
  
	const [open, setOpen] = React.useState(false);
  
  const navigate = useNavigate(); 
  const toggleSignOut = () => {
		navigate("/staff/login");
	};

	const toggleDrawer = (isOpen) => () => {
		setOpen(isOpen);
	};

  // useEffect(() => {
  //   axios.get('http://localhost:8000/api/kitchen/order-requests')
  //     .then(response => {
  //       setOrderRequests(response.data.table_number);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <div className="kitchen-header-bar">
        <Button onClick={toggleDrawer(true)}>Open drawer</Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
            { <KitchenSidebar />}
        </Drawer>
        <Button onClick={toggleSignOut}>Sign Out</Button>
      </div>
      <h1>Completed Order Requests</h1>
      <div className="kitchen-orders-container">
        {MakeOrder()}
        {MakeOrder()}
        {MakeOrder()}
        {MakeOrder()}
        {MakeOrder()}
        {MakeOrder()}
        {MakeOrder()}
      </div>
    </div>
  );
}

export default KitchenOrderRequestsCompleted;