import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <h1 >
        Select your page:
      </h1>

      <Grid container spacing={5} style={{ justifyContent: 'center' }}>
        <Grid item>
          <Button 
            variant='outlined'
            onClick={() => navigate('/staff/login')}
            color='warning'
          >
            Staff Login
          </Button>
        </Grid>

        <Grid item>
          <Button 
            variant='outlined'
            onClick={() => navigate('/customer/table-selection')}
            color='warning'
          >
            Costumer
          </Button>
        </Grid>
      </Grid>

    </>
  );
}

export default Home;
  