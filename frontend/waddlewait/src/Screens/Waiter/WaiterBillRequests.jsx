import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer, Alert, Snackbar, CardMedia } from '@mui/material';
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

function MakeBill({ billRequest }) {
  // check if bill is already addressed

  return (
    <Card className="order-card" sx={{ minWidth: 300, maxHeight: 400, maxWidth: 300}}>
      <CardHeader
        title={"Table no " + 1}
      />
      <CardContent className="order-card-contents">
        <Typography color="text.secondary">
          {"Bill: " + billRequest.bill}
        </Typography>
        <FormControl fullWidth>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
            //   handleAcceptRequest();
            }}
        >
          Accept
        </Button>
        </FormControl>
      </CardContent>
    </Card>
  )
}

function WaiterBillRequests() {
  const [billRequests, setBillRequests] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = (isOpen) => () => {
        setOpenDrawer(isOpen);
    };

    // API which is called every few seconds
    // Check if a bill request exists

    // Call this one when u find something
    // Find a new bill requests
    useEffect(() => {
      // SHOULD BE ALL BILLS OR SMTH
      axios.get('http://localhost:8000/orders/checkout/3')
        .then(response => {
          console.log(response.data)
          setBillRequests(response.data.orders);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

  return (
    <div className="App">
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
          { <WaiterSidebar />}
      </Drawer>
        <div>
            <h1>Bill Requests</h1>
            <div className="order-requests-container">
            {/* {billRequests.map((request, index) => (
                <MakeBill key={index} 
                billRequest={request}
                />
            ))} */}
            {billRequests.map((request, index) => (
                <div key={index}>
                  <p>Quantity:{request.quantity}</p>
                  <p>Name:{request.name}</p>
                  <p>Description:{request.description}</p>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={request.image}
                    title={request.name}
                  />
                </div>
            ))}
            </div>
        </div>
    </div>
  );
}

export default WaiterBillRequests;