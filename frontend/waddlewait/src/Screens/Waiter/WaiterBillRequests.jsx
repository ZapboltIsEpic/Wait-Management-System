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

function MakeBill({ billRequest, setBillRequestAccepted, setAcceptedBillRequest}) {
  const handleAcceptRequest = () => {
    setBillRequestAccepted(true);
    setAcceptedBillRequest(billRequest);
  }

  return (
    <Card className="order-card" sx={{ minWidth: 300, maxHeight: 400, maxWidth: 300}}>
      <CardHeader
        title={"Table no " + billRequest.table}
      />
      <CardContent className="order-card-contents">
        <Typography color="text.secondary">
          {"Bill: " + billRequest.total_amount}
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

function WaiterBillRequests() {
  const [acceptedBillRequest, setAcceptedBillRequest] = useState(null);
  const [billRequestAccepted, setBillRequestAccepted] = useState(false);
  const [billRequests, setBillRequests] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = (isOpen) => () => {
        setOpenDrawer(isOpen);
    };

    useEffect(() => {
      function checkBills() {
        axios.get('http://localhost:8000/orders/checkout')
        .then(response => {
          console.log(response.data)
          setBillRequests(response.data);
        })
        .catch(error => {
          console.log(error);
        });
      }

      const notificationLoop = setInterval(checkBills, 4000);

      // Cleanup function to stop the loop when the component unmounts
      return () => clearInterval(notificationLoop);
    }, []);

    const handleCompletedOrderRequest = () => {
      axios.delete(`http://127.0.0.1:8000/orders/delete/checkout/${acceptedBillRequest.table}/`)
      .then(response => {
        console.log(response.json);
      })
      .catch(error => {
        console.log(error);
      });
      setBillRequestAccepted(false);
      setAcceptedBillRequest(null);
    }

    const callManager = () => {
      // call manager
    };

  return (
    <div className="App">
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
          { <WaiterSidebar />}
      </Drawer>
      {
        billRequestAccepted 
          ? (
            <div>
              <h1>Bill Request for Table {acceptedBillRequest.table} </h1>
              <p>Items:</p>
              <p>{acceptedBillRequest.items.map((item, index) => (
                <span key={index}>{item.name} x {item.quantity} = {item.price*item.quantity} </span>
              ))}
              </p>
              <p>Total: {acceptedBillRequest.total_amount}</p>
              <Button onClick={callManager}>Call Manager</Button>
              <Button onClick={handleCompletedOrderRequest} autoFocus>
                Complete
              </Button>
            </div>
          ) 
          : (
            <div>
              <h1>Bill Requests</h1>
              <div className="order-requests-container">
              {billRequests.map((request, index) => (
                  <MakeBill key={index} 
                  billRequest={request}
                  setBillRequestAccepted={setBillRequestAccepted}
                  setAcceptedBillRequest={setAcceptedBillRequest}
                  />
              ))}
              </div>
            </div>
          )
      }
    </div>
  );
}

export default WaiterBillRequests;