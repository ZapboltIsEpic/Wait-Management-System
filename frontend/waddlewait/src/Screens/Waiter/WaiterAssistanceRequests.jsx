import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { WaiterSidebar } from './layout/WaiterSidebar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

function MakeOrder() {
  const [status, setStatus] = useState("Not Started");

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

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
        <FormControl fullWidth>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              axios.put('http://localhost:8000/assistance/notifications/accepted', {
                "tableNumber": 1, 
                "staffName": "Bob", 
                "tableStatus": false, 
              })
              .then(response => {
                  // Handle response
              })
              .catch(error => {
                  // Handle error
        });
            }}
        >
            Accept
        </Button>
        </FormControl>
        {status === 'Ready' && (
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => {
            
          }}
        >
          Close
        </Button>
      )}
      </CardContent>
    </Card>
  )
}

function WaiterAssistanceRequests() {
  const [orderRequests, setOrderRequests] = useState([]);

	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (isOpen) => () => {
		setOpen(isOpen);
	};

  useEffect(() => {
    axios.get('http://localhost:8000/assistance/requests')
      .then(response => {
        response.data.forEach(item => {
          console.log(item.tableNumber, item.staffName, item.tableStatus);
        });
        setOrderRequests(response.data.table_number);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
        <Button onClick={toggleDrawer(true)}>Open drawer</Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
            { <WaiterSidebar />}
        </Drawer>
        <h1>Assistance Requests</h1>
        <p>{orderRequests}</p>
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

export default WaiterAssistanceRequests;