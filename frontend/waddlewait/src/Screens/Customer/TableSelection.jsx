import * as React from 'react';
import './CustomerStyle.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

function TableSelection() {
  const navigate = useNavigate();

  const [groupSize, setGroupSize] = React.useState('')
  const [tableNum, setTableNum] = React.useState('')
  const [showError, setShowError] = React.useState(false)

  const changeGroupSize = (event) => {
    setGroupSize(event.target.value);
  };

  const changeTableNum = (event) => {
    setTableNum(event.target.value);
  };

  const handleConfirm = () => {
    if (tableNum && groupSize && groupSize > 0) {
      navigate('/customer/home-menu')
    } else {
      setShowError(true);
    }
  };

  return (
    <>
      <h1 >
        Table Selection
      </h1>

      <Grid container spacing={5} style={{ justifyContent: 'center' }}>
        <Grid item>
          <FormControl fullWidth>
            <TextField
              id="groupSizeField"
              label="Group Size"
              type="number"
              value={groupSize}
              onChange={changeGroupSize}
              sx={{ width: 150 }}
            />
          </FormControl>
        </Grid>

        <Grid item>
            <FormControl fullWidth>
              <InputLabel id="groupSizeLabel">Table Number</InputLabel>
              <Select 
              labelId="tableNumField"
              label="Table Number" 
              type="number"
              value={tableNum}
              onChange={changeTableNum}
              sx={{ width: 150 }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
            </Select>
            </FormControl>
        </Grid>
      </Grid>

      <br />

      <Button variant="contained" onClick={handleConfirm} className="custom-button" color='warning' >
        Confirm
      </Button>

      <br /><br />

      {showError && (
        <>
          <Alert severity="error" sx={{ width: '100%' }}>
            Please fill in the 'Group Size' and 'Table Number' correctly.
          </Alert>
        </>
      )}
    </>
  );
}
    
export default TableSelection