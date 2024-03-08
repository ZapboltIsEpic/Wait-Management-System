import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, InputLabel, MenuItem} from '@mui/material';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import './accounts.css'

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
		<div className="login-screen">
			<div className="login-container">
				<h1>
					Staff Login
				</h1>
				<div className="input-container">
					<TextField
						id="outlined-password-input"
						label="Username"
						className="input"
					/>
				</div>
				<div className="input-container">
					<TextField
						id="outlined-password-input"
						label="Password"
						type="password"
						className="input"
					/>
				</div>

				<div className='input-role-container'>
					<FormControl className="input-role">
						<InputLabel id="demo-simple-select-label">Role</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={role}
							label="Role"
							onChange={handleChange}
						>
							<MenuItem value={"/kitchen/main"}>Kitchen Staff</MenuItem>
							<MenuItem value={"/waiter/main"}>Wait Staff</MenuItem>
							<MenuItem value={"/manager/main"}>Manager</MenuItem>
						</Select>
					</FormControl>
				</div>
				<div className="button-container">
					<Button 
						variant="contained"
						onClick={() => {
							// Authentication goes here
							navigateTo(role);
						}}
						className="button"
					>
						Submit
					</Button>
				</div>
				<p> Submit for each role to access their page, no authentication needed </p>
			</div>
		</div>
	);
}

export default Login;