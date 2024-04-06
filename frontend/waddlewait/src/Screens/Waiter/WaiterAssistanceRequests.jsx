import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer, Alert, Snackbar } from '@mui/material';
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

  const [latestAssistanceRequest, setLatestAssistanceRequest] = useState({})
  const [latestAccepetedAssistanceRequest, setLatestAccepetedAssistanceRequest] = useState({})
  const [newNotification, setNewNotification] = React.useState(false);
  const [notification, setNotification] = React.useState('');
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

  useEffect(() => {
    function checkNotifications() {
      axios.get('http://localhost:8000/assistance/notificationscheck')
      .then(response => {
        console.log(response.data);
        if (Object.keys(latestAssistanceRequest).length !== 0 && latestAssistanceRequest.most_recent_assistance_request != response.data.most_recent_assistance_request) {
          setNewNotification(true);
          setNotification("New assistance request by table " + response.data.most_recent_assistance_request);
        }
        setLatestAssistanceRequest(response.data);
      })
      .catch(error => {
        console.log(error);
      });

      axios.get('http://localhost:8000/assistance/notifications/acceptedcheck')
      .then(response => {
        console.log(response.data);
        if (latestAccepetedAssistanceRequest != {} && latestAccepetedAssistanceRequest.staff_accepted_time != response.data.staff_accepted_time) {
          setNewNotification(true);
          setNotification("Assistance request for table " + response.data.staff_accepted_time + " accepeted by " + response.data.staff_accepted_time);
        }
        setLatestAccepetedAssistanceRequest(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }

    const notificationLoop = setInterval(checkNotifications, 4000);

    // Cleanup function to stop the loop when the component unmounts
    return () => clearInterval(notificationLoop);
  }, [latestAssistanceRequest, latestAccepetedAssistanceRequest]);

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

export default WaiterAssistanceRequests;