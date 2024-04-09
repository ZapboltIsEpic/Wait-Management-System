import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer, Alert, Snackbar } from '@mui/material';
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
      "order": orderRequest.order, 
      "item": orderRequest.item, 
      // should be the waiter's name
      "wait_staff_assigned": "yijun", 
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

  if (orderRequest.deliver || !orderRequest.is_ready) {
    return null;
  }

  return (
    <Card className="order-card" sx={{ minWidth: 300, maxHeight: 400, maxWidth: 300}}>
      <CardHeader
        title={"Order no " + orderRequest.order_id}
      />
      <CardContent className="order-card-contents">
        <Typography color="text.secondary">
          Item: {orderRequest.item_name}
        </Typography>
        <Typography color="text.secondary">
          Quantity: {orderRequest.quantity}
        </Typography>
        <Typography color="text.secondary">
          {"Table no " + orderRequest.table_number}
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
	const [openDrawer, setOpenDrawer] = React.useState(false);

  const [latestOrderRequest, setLatestOrderRequest] = useState({})
  const [latestAccepetedOrderRequest, setLatestAccepetedOrderRequest] = useState({})
  const [newNotification, setNewNotification] = React.useState(false);
  const [notification, setNotification] = React.useState('');

	const toggleDrawer = (isOpen) => () => {
		setOpenDrawer(isOpen);
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

  const handleCompletedOrderRequest = () => {
    axios.put('http://localhost:8000/orders/delivernotifications/completed', {
      "order": acceptedOrderRequest.order, 
      "item": acceptedOrderRequest.item, 
      "deliver": acceptedOrderRequest.deliver, 
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

  useEffect(() => {
    function checkNotifications() {
      axios.get('http://localhost:8000/orders/delivernotifications/notificationcheck')
      .then(response => {
        if (Object.keys(latestOrderRequest).length !== 0 && latestOrderRequest.most_recent_item_made_time !== response.data.most_recent_item_made_time) {
          setNewNotification(true);
          setNotification("New order request " + response.data.order + " by table " + response.data.table);
          axios.get('http://localhost:8000/orders/deliverrequests')
          .then(response => {
            setOrderRequests(response.data);
          })
          .catch(error => {
            console.log(error);
          });
        }
        setLatestOrderRequest(response.data);
      })
      .catch(error => {
        console.log(error);
      });

      axios.get('http://localhost:8000/orders/delivernotifications/accepted/notificationcheck')
      .then(response => {
        // console.log(response.data, "hi")
        if (latestAccepetedOrderRequest != {} && latestAccepetedOrderRequest.most_recent_wait_staff_assigned_time !== response.data.most_recent_wait_staff_assigned_time) {
          console.log(latestAccepetedOrderRequest, response.data)
          setNewNotification(true);
          setNotification("Order request " + response.data.order + " for table " + response.data.table + " was accepted");

          axios.get('http://localhost:8000/orders/deliverrequests')
          .then(response => {
            const filteredRequests = response.data.filter(request => request.wait_staff_assigned === null);
            setOrderRequests(filteredRequests);
          })
          .catch(error => {
            console.log(error);
          });
        }
        setLatestAccepetedOrderRequest(response.data);
      })
      .catch(error => {
        console.log("Error", error.response.status, error.response.data);
      });
    }

    const notificationLoop = setInterval(checkNotifications, 4000);

    // Cleanup function to stop the loop when the component unmounts
    return () => clearInterval(notificationLoop);
  }, [latestOrderRequest, latestAccepetedOrderRequest]);

  return (
    <div className="App">
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
          { <WaiterSidebar />}
      </Drawer>
      {
        orderRequestAccepted 
          ? (
            <div>
              <h1>Order Request {acceptedOrderRequest.order} Table {acceptedOrderRequest.table} </h1>
              <p>Item: {acceptedOrderRequest.item}</p>
              <p>Quantity: {acceptedOrderRequest.quantity}</p>
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
      <Snackbar open={newNotification} autoHideDuration={3000} 
          onClose={() => {
            setNewNotification(false)}
          }
        >
          <Alert
            onClose={() => setNewNotification(false)}
            severity="info"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification}
          </Alert>
        </Snackbar>
    </div>
  );
}

export default WaiterOrderRequests;