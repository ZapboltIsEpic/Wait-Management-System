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

function MakeAssistance({ assistanceRequest, setAssistanceRequestAccepted, setAcceptedAssistanceRequest }) {
  const handleAcceptRequest = () => {
    axios.put('http://localhost:8000/assistance/notifications/accepted', {
      "tableNumber": assistanceRequest.tableNumber, 
      "staffName": assistanceRequest.staffName,
      "tableStatus": assistanceRequest.tableStatus
    })
    .then(response => {
      console.log(response.json);
    })
    .catch(error => {
      console.log(error);
    });
    setAssistanceRequestAccepted(true);
    setAcceptedAssistanceRequest(assistanceRequest);
  }

  // or orderRequest.wait_staff_assigned == is not me
  if (assistanceRequest.tableStatus) {
    return null;
  }
  return (
    <Card className="order-card" sx={{ minWidth: 300, maxHeight: 400, maxWidth: 300}}>
      <CardHeader
        title={"Table no " + assistanceRequest.tableNumber}
      />
      <CardContent className="order-card-contents">
        <Typography color="text.secondary">
          Kitchen Staff: {assistanceRequest.staffName}
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

function WaiterAssistanceRequests() {
  const [acceptedAssistanceRequest, setAcceptedAssistanceRequest] = useState(null);
  const [assistanceRequestAccepted, setAssistanceRequestAccepted] = useState(false);
  const [assistanceRequests, setAssistanceRequests] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);

	const toggleDrawer = (isOpen) => () => {
		setOpenDrawer(isOpen);
	};

  const callManager = () => {
    // call manager
  };

  const handleCompletedAssistanceRequest = () => {
    axios.put('http://localhost:8000/assistance/notifications/completed', {
      "tableNumber": acceptedAssistanceRequest.tableNumber, 
      "staffName": acceptedAssistanceRequest.staffName,
      "tableStatus": acceptedAssistanceRequest.tableStatus,
    })
    .then(response => {
      console.log(response.json);
    })
    .catch(error => {
      console.log(error);
    });
    setAssistanceRequestAccepted(false);
    setAcceptedAssistanceRequest(null);
    window.location.reload();
  }

  useEffect(() => {
    axios.get('http://localhost:8000/assistance/requests')
      .then(response => {
        setAssistanceRequests(response.data);
        console.log(response.data);
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
        {
          assistanceRequestAccepted 
            ? (
              <div>
                <h1>Assistance Request Table {acceptedAssistanceRequest.tableNumber} </h1>
                <p>Staff Name: {acceptedAssistanceRequest.staffName}</p>
                <Button onClick={callManager}>Call Manager</Button>
                <Button onClick={handleCompletedAssistanceRequest} autoFocus>
                  Complete
                </Button>
              </div>
            ) 
            : (
              // This will be displayed if assistance_request_accepted is false
              <div>
                <h1>Assistance Requests</h1>
                <div className="assistance-requests-container">
                  {assistanceRequests.map((request, index) => (
                    <MakeAssistance key={index} 
                    assistanceRequest={request}
                    setAssistanceRequestAccepted={setAssistanceRequestAccepted}
                    setAcceptedAssistanceRequest={setAcceptedAssistanceRequest} />
                  ))}
                </div>
              </div>
            )
        }
    </div>
  );
}

export default WaiterAssistanceRequests;