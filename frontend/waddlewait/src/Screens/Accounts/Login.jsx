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
		<div className="account-screen">
			<div className="account-container">
				<h1>
					Staff Login
				</h1>
				<div className="input-container">
					<TextField
						label="Username"
						className="input"
					/>
				</div>
				<div className="input-container">
					<TextField
						label="Password"
						type="password"
						className="input"
					/>
				</div>

				<div className='input-role-container'>
					<FormControl className="input-role">
						<InputLabel>Role</InputLabel>
						<Select
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
				<div className="login-help">
					<div className="login-help-link-container">
						<p 
							className="login-help-link-text"
							onClick={() => {
								navigateTo('/staff/forgot-password');
							}}
						>
							Forgot password?
						</p>
					</div>
					<div className="login-help-link-container">
						<p 
							className="login-help-link-text"
							onClick={() => {
								navigateTo('/staff/create-account');
							}}
						>
							Create account
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;