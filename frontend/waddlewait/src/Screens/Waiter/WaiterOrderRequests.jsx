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

function MakeOrder({ orderRequest }) {

  const handleAcceptRequest = () => {
    axios.put('http://localhost:8000/orders/delivernotifications/accepted', {
      "table": orderRequest.table, 
      "items": orderRequest.items, 
      "ready_to_serve": orderRequest.ready_to_serve, 
      "is_complete": orderRequest.is_complete, 
      // should be the waiter's name
      "wait_staff_assigned": "yijun", 
      "deliver": orderRequest.deliver, 
      "bill": orderRequest.bill, 
    })
    .then(response => {
      console.log(response.json);
    })
    .catch(error => {
      console.log(error);
    });

    useNavigate("/waiter/order-request");
  }

  // or orderRequest.wait_staff_assigned == is not me
  if (orderRequest.is_complete) {
    return null;
  }
  return (
    <Card className="order-card" sx={{ minWidth: 300, maxHeight: 400, maxWidth: 300}}>
      <CardHeader
        title={"Table no" + orderRequest.table}
      />
      <CardContent className="order-card-contents">
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Order details
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {orderRequest.items}
        </Typography>
        <Typography color="text.secondary">
          Notes
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
  const [orderRequests, setOrderRequests] = useState([]);

  const [alerts, setAlerts] = useState([]);

  const [shouldContinue, setShouldContinue] = useState(false);

  // alerts not implemented yet for other users
  // useEffect(() => {
  //     const getAlerts = () => {
  //         if (!shouldContinue) {
  //             return;
  //         }
  //         axios.get('http://localhost:8000/api/waiter/order-requests-alerts')
  //             .then(response => {
  //                 setAlerts(response.data);
  //             })
  //             .catch(error => {
  //                 console.log(error);
  //             });
  //     }
  
  //     getAlerts(); 
  //     const interval = setInterval(getAlerts, 1000); 
  //     if (alerts.length > 0) {
  //         setShouldContinue(false);
  //     }
  
  //     return () => {
  //         clearInterval(interval);
  //     }
  // }, [])

	const [openDrawer, setOpenDrawer] = React.useState(false);

  const [openAlert, setOpenAlert] = React.useState(false);

	const toggleDrawer = (isOpen) => () => {
		setOpenDrawer(isOpen);
	};

  const handleClose = () => {
      setOpenAlert(false);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/orders/requests')
      .then(response => {
        setOrderRequests(response.data);
        response.data.forEach(item => {
          console.log(item.table, item.items, item.ready_to_serve, item.is_complete, item.wait_staff_assigned, item.deliver, item.bill);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const addAlert = () => {
      setAlerts({data: "New order request"});
      console.log(alerts);
      setOpenAlert(true);
      console.log(alerts.length)
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
        <h1>Order Requests</h1>
        <p>{orderRequests}</p>
        <div className="order-requests-container">
          {orderRequests.map((request, index) => (
            <MakeOrder key={index} orderRequest={request} />
          ))}
        </div>
    </div>
  );
}

export default WaiterOrderRequests;