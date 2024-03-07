import * as React from 'react';
import Button from '@mui/material/Button';

function tableSelection() {
    return (
        <>
            <h1>
                Table Selection
            </h1>
            <NumberInput min={1} max={10} />

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
    