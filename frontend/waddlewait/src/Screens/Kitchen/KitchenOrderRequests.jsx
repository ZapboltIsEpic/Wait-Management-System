import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer } from '@mui/material';
import { KitchenSidebar } from './layout/KitchenSidebar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
// import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import './kitchen.css'

function MakeOrder({order, getOrders, setOrders}) {

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
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '10px 0'}} key={key}>
              <p> {tableItem.quantity} orders of Item {tableItem.item}</p>
              <ItemStatus orderId={order.id} itemId={tableItem.id} itemPrepare={tableItem.is_preparing} itemReady={tableItem.is_ready}/>
            </div>
          ))}
        </div>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => {
            axios.put(`http://localhost:8000/kitchenstaff/complete/${order.id}`)
            .catch(error => {
              console.log(error);
            });
            let currentOrders = getOrders()
            setOrders(currentOrders => currentOrders.filter(currentOrder => currentOrder.id !== order.id));
            
          }}
        >
          Complete
        </Button>
      </CardContent>
    </Card>
  )
}

function ItemStatus({orderId, itemId, itemPrepare, itemReady}) {
  let findStatus = "Not Started";
  if (itemReady == true) {
    findStatus = "Ready";
  } else if (itemPrepare == true) {
    findStatus = "Preparing";
  } else {
    findStatus = "Not Started";
  }

  const [status, setStatus] = useState(findStatus);

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    if (status === "Preparing") {
      axios.put(`http://localhost:8000/kitchenstaff/prepare/${orderId}/${itemId}`)
      .catch(error => {
        console.log(error);
      });
    } else if (status === "Ready") {
      axios.put(`http://localhost:8000/kitchenstaff/ready/${orderId}/${itemId}`)
      .catch(error => {
        console.log(error);
      });
    }
  }, [status])

  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Status</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={status}
        label="status"
        onChange={handleStatus}
      >
        <MenuItem value={"Not Started"}>Not Started</MenuItem>
        <MenuItem value={"Preparing"}>Preparing</MenuItem>
        <MenuItem value={"Ready"}>Ready</MenuItem>
      </Select>
    </FormControl>
  )

}

function KitchenOrderRequests() {
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
    axios.get('http://localhost:8000/kitchenstaff/pending ')
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
      <h1>Order Requests</h1>
      <div className="kitchen-orders-container">
        {orderRequests.map((order, index) => (
          <MakeOrder key={index} order={order} getOrders={orderRequests} setOrders={setOrderRequests}/>
        ))}
      </div>
    </div>
  );
}

export default KitchenOrderRequests;