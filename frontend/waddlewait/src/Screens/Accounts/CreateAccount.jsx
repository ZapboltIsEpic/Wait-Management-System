import React from 'react';
import './accounts.css'
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

function CreateStaffAccount() {
	const navigate = useNavigate();

	const navigateTo = (link) => {
		navigate(link);
	}

	// Use States
	// Input fields
	const [name, setName] = React.useState('');
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
	const [passkey, setPasskey] = React.useState('');

	// Dialog
	const [error, setErrorOpen] = React.useState(false);
	const [success, setSuccessOpen] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState(false);

	return (
		<div className="account-screen">
			<div className="account-container">
				<h1>
					Register
				</h1>
				<div className="input-container">
					<TextField
						label="Name"
						placeholder='Jane_Doe'
						className="input-register"
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="input-container">
					<TextField
						label="Email"
						placeholder='example@gmail.com'
						className="input-register"
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="input-container">
					<TextField
						label="Password"
						className="input-register"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="input-container">
					<TextField
						label="Confirm Password"
						className="input-register"
						type="password"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>
				<div className="input-container">
					<TextField
						label="Authentication Passkey"
						className="input-register"
						type="password"
						onChange={(e) => setPasskey(e.target.value)}
					/>
				</div>
				<div className="create-options">
					<div className="button-container">
						<Button 
							variant="outlined"
							onClick={() => {
								navigateTo('/staff/login');
							}}
							className="button"
							color='warning'
						>
							Back
						</Button>
					</div>
					<div className="button-container">
						<Button 
							variant="outlined"
							onClick={async () => {
									// Authentication goes here
									try {
										const response = await axios.post('http://127.0.0.1:8000/api/register', {
									   name: name,
											email: username,
											password: password
										});

										// Handle successful register
										console.log('Register successful');
										setSuccessOpen(true);
									} catch (error) {
										console.log(error)
										if (error.response.status === 404) {
											// Display error
											// console.error('Register failed:', error.response.data);
									   setErrorMessage("Login failed. Please check your name/username/password and try again.")
											setErrorOpen(true);
										}
									}
									
								// Temporary basic authentication
								// Check that fields cannot be empty
								if (password === "" || username === "" || passkey === "") {
									setErrorMessage("Register Faild: Please ensure all fields are filled");
									setErrorOpen(true);
									return;
								}

								// Check Passwords are the same
								if (password !== confirmPassword) {
									setErrorMessage("Register Failed: Password/Confirm Password are not the same.")
									setErrorOpen(true);
									return;
								}

								console.log(username, passkey, password, confirmPassword)
								setSuccessOpen(true);
							}}
							className="button"
							color='warning'
						>
							Create
						</Button>
						<ErrorDialog open={error} setOpen={setErrorOpen} errorMessage={errorMessage}/>
						<SuccessDialog open={success} setOpen={setSuccessOpen} navigateTo={navigateTo} />
					</div>
				</div>
			</div>
		</div>
	);
}

function ErrorDialog ({open, setOpen, errorMessage}) {
	return <Dialog
		open={open}
		onClose={() => {
			setOpen(false)
		}}
	>
		<DialogTitle>Error</DialogTitle>
		<p>{errorMessage}</p>
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

function SuccessDialog ({open, setOpen, navigateTo}) {
	return <Dialog
		open={open}
		onClose={() => {
			setOpen(false)
			navigateTo('/staff/login');
		}}
	>
		<DialogTitle>Success</DialogTitle>
		<p>Your account has been registered</p>
		<Button
			variant="outlined"
			onClick={() => {
				setOpen(false);
				navigateTo('/staff/login');
			}}	
			color="warning"
		>
			Close
		</Button>
	</Dialog>
}

export default CreateStaffAccount;