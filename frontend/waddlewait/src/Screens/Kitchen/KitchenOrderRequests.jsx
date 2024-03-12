import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer } from '@mui/material';
import { KitchenSidebar } from './layout/KitchenSidebar';

function KitchenOrderRequests() {
  const [orderRequests, setOrderRequests] = useState([]);

	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (isOpen) => () => {
		setOpen(isOpen);
	};

  // useEffect(() => {
  //   axios.get('http://localhost:8000/api/kitchen/order-requests')
  //     .then(response => {
  //       setOrderRequests(response.data.table_number);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

	// temporary code
	React.useEffect(() => {	
    axios.get('http://localhost:8000/table/1')
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
            { <KitchenSidebar />}
        </Drawer>
        <h1>Order Requests</h1>
        <p>{orderRequests}</p>
    </div>
  );
}

export default KitchenOrderRequests;