import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, InputLabel, MenuItem} from '@mui/material';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';

function Login() {
	const navigate = useNavigate();

	const navigateTo = (link) => {
		navigate(link);
	}

	const [role, setRole] = React.useState('');

	const handleChange = (event) => {
    setRole(event.target.value);
  };

	return (
		<div className="App">
				<h1>
					Staff Login
				</h1>
				<div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
				<TextField
						id="outlined-password-input"
						label="Username"
					/>

					<TextField
						id="outlined-password-input"
						label="Password"
						type="password"
					/>

					<InputLabel id="demo-simple-select-label">Role</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={role}
						label="Role"
						onChange={handleChange}
					>
						<MenuItem value={"/waiter/main"}>Kitchen Staff</MenuItem>
						<MenuItem value={"/kitchen/main"}>Wait Staff</MenuItem>
						<MenuItem value={"/manager/main"}>Manager</MenuItem>
					</Select>

					<Button 
						variant="contained"
						onClick={() => {
							// Authentication goes here
							navigateTo(role);
						}}
					>
						Submit
					</Button>
					<h2> Submit for each role to access their page, no authentication needed </h2>
				</div>
		</div>
	);
}

export default Login;