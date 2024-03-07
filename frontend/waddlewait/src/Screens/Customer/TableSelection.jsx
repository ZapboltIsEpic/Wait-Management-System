import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function TableSelection() {
    return (
        <>
            <h1>
                Table Selection
            </h1>

            <Select label="Table Number">
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
            </Select>

            <Button variant="contained">
                Confirm
            </Button>
        </>
    );
}
    
export default TableSelection