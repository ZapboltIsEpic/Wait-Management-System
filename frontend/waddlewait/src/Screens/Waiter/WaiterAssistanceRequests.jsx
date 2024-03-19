import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { WaiterSidebar } from './layout/WaiterSidebar';

function WaiterAssistanceRequests() {
  const [orderRequests, setOrderRequests] = useState([]);

  const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const getAlerts = () => {
            axios.get('http://localhost:8000/api/waiter/order-requests-alerts')
                .then(response => {
                    setAlerts(response.data);
                })
        }
    
        getAlerts(); 
        const interval = setInterval(getAlerts, 1000); 
    
        return () => {
            clearInterval(interval);
        }
    }, [])

	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (isOpen) => () => {
		setOpen(isOpen);
	};

  useEffect(() => {
    axios.get('http://localhost:8000/api/waiter/order-requests')
      .then(response => {
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
        <h1>Order Requests</h1>
        <p>{orderRequests}</p>
    </div>
  );
}

export default WaiterAssistanceRequests;