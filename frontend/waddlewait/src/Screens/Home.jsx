import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    return (
      <div className="App">
          <p>
            This is Home <code>src/App.js</code> and save to reload.
          </p>
        <Button variant='outlined'
            onClick={() => navigate('/customer/table-selection')}
        >
            Go to Table selection
        </Button>
      </div>
    );
  }

export default Home;
  