import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer, Alert, Snackbar } from '@mui/material';
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
    <Card className="order-card" sx={{ minWidth: 400, maxHeight: 500, maxWidth: 400}}>
      <CardHeader
        title={orderNumber}
        subheader={tableNumber}
      />
      <CardContent className="order-card-contents">
        <div>
          {tableItems.map((tableItem, key) => (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '10px 0', overflowY: 'auto'}} key={key}>
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
            .then(() => {
              let currentOrders = getOrders;
              let filteredOrders = currentOrders.filter(currentOrder => currentOrder.id !== order.id);
              setOrders(filteredOrders);
            })
            .catch(error => {
              console.log(error);
            });
            
            // Send notification
            axios.put('http://localhost:8000/orders/delivernotifications', {
              "table": order.table, 
              "ready_to_serve": true, 
              "is_complete": false, 
              "wait_staff_assigned": "yijun", 
              "deliver": false, 
              "bill": "45.00", 
              "created_at": "today"
            })
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
            

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
    <FormControl style={{margin: '10px'}}>
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
  
  const [newOrder, setNewOrder] = React.useState(false);
  const [lastOrder, setLastOrder] = useState({})
  const [checkLast, setCheckLast] = useState({})

  useEffect(() => {
    axios.get('http://localhost:8000/kitchenstaff/pending ')
      .then(response => {
        setOrderRequests(response.data);
        
        if (checkLast != lastOrder) {
          if (checkLast.id + 1 == lastOrder.id) {
            setNewOrder(true);
          }
        }
        setCheckLast(lastOrder)
      })
      .catch(error => {
        console.log(error);
      });
    }, [lastOrder]);
    
    

  useEffect(() => {
    function checkNotifications() {
      axios.get('http://localhost:8000/kitchenstaff/new')
      .then(response => {
        setLastOrder(response.data) 
      })
      .catch(error => {
        console.log(error);
      });
    }

    const notificationLoop = setInterval(checkNotifications, 4000);

    // Cleanup function to stop the loop when the component unmounts
    return () => clearInterval(notificationLoop);
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
      <Snackbar open={newOrder} autoHideDuration={3000} 
        onClose={() => {
          setNewOrder(false)}
        }
      >
        <Alert
          onClose={() => setNewOrder(false)}
          severity="info"
          variant="filled"
          sx={{ width: '100%' }}
        >
          A new order has arrived!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default KitchenOrderRequests;