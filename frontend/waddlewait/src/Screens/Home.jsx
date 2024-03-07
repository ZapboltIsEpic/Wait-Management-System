import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  
  const navigateTo = (link) => {
    navigate(link);
  }

  return (
    <div className="App">
        <p>
          This is Home <code>src/App.js</code> and save to reload.
        </p>
      <Button 
        variant='outlined'
        onClick={() => {navigateTo('/customer/table-selection')}}
      >
          Go to Table selection
      </Button><Button 
        variant='outlined'
        onClick={() => {navigateTo('/staff/login')}}
      >
          Staff Login
      </Button>
    </div>
  );
}

export default Home;
  