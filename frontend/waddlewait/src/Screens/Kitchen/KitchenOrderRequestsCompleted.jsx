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

function MakeOrder({order}) {
  let orderNumber = "Order number " + order.id
  let tableNumber = "Table no " + order.table
  let tableItems = order.items

  return (
    <Card className="order-card" sx={{ minWidth: 400, maxHeight: 400, maxWidth: 400}}>
      <CardHeader
        title={orderNumber}
        subheader={tableNumber}
      />
      <CardContent className="order-card-contents">
        <div>
          {tableItems.map((tableItem, key) => (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '10px 0'}} key={key}>
              <p> {tableItem.quantity} orders of Item {tableItem.item}</p>
            </div>
          ))}
        </div>
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

  useEffect(() => {
    axios.get('http://localhost:8000/kitchenstaff/completed')
      .then(response => {
        setOrderRequests(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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
        {orderRequests.map((order, index) => (
          <MakeOrder key={index} order={order}/>
        ))}
      </div>
    </div>
  );
}

export default KitchenOrderRequestsCompleted;