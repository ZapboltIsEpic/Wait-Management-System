import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, InputLabel, MenuItem} from '@mui/material';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import './accounts.css'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

function Login() {
	const navigate = useNavigate();

	const navigateTo = (link) => {
		if (link === 'kitchen_staff') {
			navigate('/kitchen/main');
		}
		else if (link === 'wait_staff') {
			navigate('/waiter/main');
		}
		else if (link === 'manager') {
			navigate('/manager/main');
		}
		else {
			navigate(link);
		}
	}

	const [role, setRole] = React.useState('');
	const [username, setUserName] = React.useState('');
	const [password, setPassword] = React.useState('');

	const roleChange = (event) => {
		setRole(event.target.value);
  };
	
	const [error, setErrorOpen] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState(false);

	return (
		<div className="account-screen">
			<div className="account-container">
				<h1>
					Login
				</h1>
				<div className="input-container">
					<TextField
						label="Username"
						className="input-login"
						onChange={(event) => {
							setUserName(event.target.value)
						}}
					/>
				</div>
				<div className="input-container">
					<TextField
						label="Password"
						type="password"
						className="input-login"
						onChange={(event) => {
							setPassword(event.target.value)
						}}
					/>
				</div>

				<div className='input-role-container'>
                    <FormControl className="input-role">
                        <InputLabel>Role</InputLabel>
                        <Select
                            id="demo-simple-select"
                            value={role}
                            label="Role"
                            onChange={roleChange}
                        >
                            <MenuItem value={"kitchen_staff"}>Kitchen Staff</MenuItem>
                            <MenuItem value={"wait_staff"}>Wait Staff</MenuItem>
                            <MenuItem value={"manager"}>Manager</MenuItem>
                        </Select>
                    </FormControl>
                </div>
				<div className="button-container">
					<Button 
						variant="outlined"
						onClick={async () => {
							// Authentication goes here

							if (username === "" || password === "" || role === "") {
								setErrorMessage("Login failed. Please ensure all fields are filled.");
								setErrorOpen(true);
								return;
							} 

							try {
								const response = await axios.post('http://127.0.0.1:8000/api/login', {
									email: username,
									password: password,
									role: role
								});

								// Handle successful login, e.g., store token in local storage
								console.log('Login successful');
								console.log(response.data)
								navigateTo(role);
							} catch (error) {
								console.log(error)
								setErrorMessage("Login failed. Please check your username/password/role and try again.")
								setErrorOpen(true);
								return;
							}
						}}
						color='warning'
						className="button"
					>
						Submit
					</Button>
					<ErrorDialog open={error} setOpen={setErrorOpen} message={errorMessage}/>
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
					<div className="login-help-link-container">
						<p 
							className="login-help-link-text"
							onClick={() => {
								navigateTo('/');
							}}
						>
							Back
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function ErrorDialog ({open, setOpen, message}) {
	return <Dialog
		open={open}
		onClose={() => {
			setOpen(false)
		}}
	>
		<DialogTitle>Error</DialogTitle>
		<p>{message}</p>
		<Button
			variant="outlined"
			onClick={() => {
				setOpen(false);
			}}
			color="warning"
		>
			Close
		</Button>
	</Dialog>
}

export default Login;