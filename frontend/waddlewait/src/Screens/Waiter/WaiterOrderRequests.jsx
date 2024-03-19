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

function WaiterOrderRequests() {
  const [orderRequests, setOrderRequests] = useState([]);

  const [alerts, setAlerts] = useState([]);

  const [shouldContinue, setShouldContinue] = useState(false);

    useEffect(() => {
        const getAlerts = () => {
            if (!shouldContinue) {
                return;
            }
            axios.get('http://localhost:8000/api/waiter/order-requests-alerts')
                .then(response => {
                    setAlerts(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    
        getAlerts(); 
        const interval = setInterval(getAlerts, 1000); 
        if (alerts.length > 0) {
            setShouldContinue(false);
        }
    
        return () => {
            clearInterval(interval);
        }
    }, [])

	const [openDrawer, setOpenDrawer] = React.useState(false);

    const [openAlert, setOpenAlert] = React.useState(false);

	const toggleDrawer = (isOpen) => () => {
		setOpenDrawer(isOpen);
	};

    const handleClose = () => {
        setOpenAlert(false);
    };

//   useEffect(() => {
//     axios.get('http://localhost:8000/api/waiter/order-requests')
//       .then(response => {
//         setOrderRequests(response.data.table_number);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);

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
    </div>
  );
}

export default WaiterOrderRequests;