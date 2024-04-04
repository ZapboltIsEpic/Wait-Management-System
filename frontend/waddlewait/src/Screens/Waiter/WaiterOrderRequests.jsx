import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { WaiterSidebar } from './layout/WaiterSidebar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

function MakeOrder({ orderRequest, setOrderRequestAccepted, setAcceptedOrderRequest}) {
  const handleAcceptRequest = () => {
    axios.put('http://localhost:8000/orders/delivernotifications/accepted', {
      "table": orderRequest.table, 
      "ready_to_serve": orderRequest.ready_to_serve, 
      "is_complete": orderRequest.is_complete, 
      // should be the waiter's name
      "wait_staff_assigned": "yijun", 
      "deliver": orderRequest.deliver, 
      "bill": orderRequest.bill, 
      "created_at": orderRequest.created_at,
    })
    .then(response => {
      console.log(response.json);
    })
    .catch(error => {
      console.log(error);
    });
    setOrderRequestAccepted(true);
    setAcceptedOrderRequest(orderRequest);
  }

  if (orderRequest.deliver || orderRequest.is_complete) {
    return null;
  }
  return (
    <Card className="order-card" sx={{ minWidth: 300, maxHeight: 400, maxWidth: 300}}>
      <CardHeader
        title={"Table no " + orderRequest.table}
      />
      <CardContent className="order-card-contents">
        <Typography color="text.secondary">
          Time Created: {orderRequest.created_at}
        </Typography>
        <FormControl fullWidth>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              handleAcceptRequest();
            }}
        >
          Accept
        </Button>
        </FormControl>
      </CardContent>
    </Card>
  )
}

function WaiterOrderRequests() {
  const [acceptedOrderRequest, setAcceptedOrderRequest] = useState(null);
  const [orderRequestAccepted, setOrderRequestAccepted] = useState(false);
  const [orderRequests, setOrderRequests] = useState([]);
  const [alerts, setAlerts] = useState([]);
	const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

	const toggleDrawer = (isOpen) => () => {
		setOpenDrawer(isOpen);
	};

  const handleClose = () => {
      setOpenAlert(false);
  };

  const callManager = () => {
    // call manager
  };

  useEffect(() => {
    axios.get('http://localhost:8000/orders/deliverrequests')
      .then(response => {
        setOrderRequests(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // implement alert by just checking ready_to_serve is true and not on page ig kinda hard actually

  const addAlert = () => {
      setAlerts({data: "New order request"});
      console.log(alerts);
      setOpenAlert(true);
      console.log(alerts.length)
  }

  const handleCompletedOrderRequest = () => {
    axios.put('http://localhost:8000/orders/delivernotifications/completed', {
      "table": acceptedOrderRequest.table, 
      "ready_to_serve": acceptedOrderRequest.ready_to_serve, 
      "is_complete": acceptedOrderRequest.is_complete, 
      // should be the waiter's name
      "wait_staff_assigned": "yijun", 
      "deliver": acceptedOrderRequest.deliver, 
      "bill": acceptedOrderRequest.bill, 
      "created_at": acceptedOrderRequest.created_at,
    })
    .then(response => {
      console.log(response.json);
    })
    .catch(error => {
      console.log(error);
    });
    setOrderRequestAccepted(false);
    setAcceptedOrderRequest(null);
    window.location.reload();
  }

  return (
    <div className="App">
        <Button onClick={addAlert}>Add alert manually before API implemented</Button>
        <Dialog
            open={openAlert}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          {"Order Request Alert"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alerts.data}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Decline</Button>
          <Button onClick={handleClose} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>

      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
          { <WaiterSidebar />}
      </Drawer>
      {
        orderRequestAccepted 
          ? (
            <div>
              <h1>Order Request Table {acceptedOrderRequest.table_number} </h1>
              <p>Created at: {acceptedOrderRequest.created_at}</p>
              <Button onClick={callManager}>Call Manager</Button>
              <Button onClick={handleCompletedOrderRequest} autoFocus>
                Complete
              </Button>
            </div>
          ) 
          : (
            <div>
              <h1>Order Requests</h1>
              <div className="order-requests-container">
                {orderRequests.map((request, index) => (
                  <MakeOrder key={index} 
                  orderRequest={request}
                  setOrderRequestAccepted={setOrderRequestAccepted}
                  setAcceptedOrderRequest={setAcceptedOrderRequest} />
                ))}
              </div>
            </div>
          )
      }
    </div>
  );
}

export default WaiterOrderRequests;