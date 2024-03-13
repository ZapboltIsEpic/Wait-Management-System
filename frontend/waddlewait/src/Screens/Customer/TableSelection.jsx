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
import axios from 'axios';


function TableSelection() {
  const navigate = useNavigate();
  const [groupSize, setGroupSize] = React.useState('')
  const [tableNum, setTableNum] = React.useState('')
  const [showError, setShowError] = React.useState(false)
  const [tableData, setTableData] = React.useState([]);
  const [currentTables, setCurrentTables] = React.useState([]);

  const changeGroupSize = (event) => {
    setGroupSize(event.target.value);

    // Change available tables
    let filteredTables = [];
    tableData.forEach(table => {
      if (table.seats_max >= event.target.value) {
        filteredTables.push(table);
      }
    })
    setCurrentTables(filteredTables);

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


  React.useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/tables');
        const data = response.data;
        let newData = [];
        data.forEach(table => {
          // Check if table is used
          if (table.table_in_use === false) {
            newData.push(table);
          }

        })
        setTableData(newData);
        setCurrentTables(newData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTables();
  }, []);

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
              {currentTables.length > 0 ? (
                currentTables.map((item, index) => (
                  <MenuItem key={index} value={item.table_number}>{item.table_number}</MenuItem>
                ))
              ) : (
                <MenuItem value="">No tables available</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <br />

      <Button variant="contained" onClick={handleConfirm} className="custom-button" color='warning' >
        Confirm
      </Button>

      <br /><br />

      <Button variant="outlined" onClick={() => navigate('/')} className="custom-button" color='warning' >
        Back
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