import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import './CustomerStyle.css';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function TableSelection() {
//     const [groupSize, setgroupSize] = useState(0);

//   const handleIncrement = () => {
//     setValue(groupSize + 1);
//   };

//   const handleDecrement = () => {
//     setValue(groupSize - 1);
//   };
    return (
        <>
            <h1 >
                Table Selection
            </h1>

            <Grid container spacing={5} style={{ justifyContent: 'center' }}>
                <Grid item>
                <TextField
                label="Number"
                type="number"
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton>
                        <ArrowUpwardIcon />
                        </IconButton>
                        <IconButton>
                        <ArrowDownwardIcon />
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
                />
                </Grid>
                <Grid item>
                    <Select label="Table Number">
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                    </Select>
                </Grid>
            </Grid>

            <br />

            <Button variant="contained">
                Confirm
            </Button>
        </>
    );
}
    
export default TableSelection