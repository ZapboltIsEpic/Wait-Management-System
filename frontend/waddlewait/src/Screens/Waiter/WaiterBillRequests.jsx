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
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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
  const navigate = useNavigate();

  const [acceptedBillRequest, setAcceptedBillRequest] = useState(null);
  const [billRequestAccepted, setBillRequestAccepted] = useState(false);
  const [billRequests, setBillRequests] = useState([]);
  
    // Call Checkout API for bills immediately upon opening tab
    useEffect(() => {
      axios.get('http://localhost:8000/orders/checkout')
      .then(response => {
        setBillRequests(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }, []);


    // Call Checkout API every 4 seconds
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

    const handleCompletedBillRequest = () => {
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
      <Drawer 
        variant="permanent"
        anchor="left"
      >
      { <WaiterSidebar />}
      </Drawer>
      <div className="main-content">
        {
          billRequestAccepted 
            ? (
              <div className="bill-for-waiters">
                <DialogContent dividers>
                  <h1>Bill Request for Table {acceptedBillRequest.table} </h1>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TableContainer style={{ height: 420 }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Total Price</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {acceptedBillRequest.items.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>${item.price}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.quantity*item.price.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                  <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                    Total: ${acceptedBillRequest.total_amount.toFixed(2)}
                  </Typography>
                </DialogContent>
                <DialogActions sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                  <Box sx={{ width: '100%' }}>
                    <div className="bottom-button">
                      <Button onClick={handleCompletedBillRequest} color="warning" variant="contained">
                        Complete
                      </Button>
                    </div>
                  </Box>
                </DialogActions>
              </div>
            ) 
            : (
              <div>
                <h1>Bill Requests</h1>
                <hr />
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
    </div>
  );
}

export default WaiterBillRequests;