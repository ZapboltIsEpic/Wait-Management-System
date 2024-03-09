import React from 'react';
import './accounts.css'
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

function CreateStaffAccount() {
	const navigate = useNavigate();

	const navigateTo = (link) => {
		navigate(link);
	}

	// Use States
	// Input fields
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
	const [passkey, setPasskey] = React.useState('');

	// Dialog
	const [error, setErrorOpen] = React.useState(false);
	const [success, setSuccessOpen] = React.useState(false);

	return (
		<div className="account-screen">
			<div className="account-container">
				<h1>
					Staff Register
				</h1>
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
							variant="contained"
							onClick={() => {
								navigateTo('/staff/login');
							}}
							className="button"
						>
							Back
						</Button>
					</div>
					<div className="button-container">
						<Button 
							variant="contained"
							onClick={() => {
								// Temporary basic authentication
								// Check that fields cannot be empty
								if (password === "" || username === "" || passkey === "") {
									setErrorOpen(true);
									return;
								}

								// Check Passwords are the same
								if (password !== confirmPassword) {
									return;
								}

								console.log(username, passkey, password, confirmPassword)
								setSuccessOpen(true);
							}}
							className="button"
						>
							Create
						</Button>
						<ErrorDialog open={error} setOpen={setErrorOpen} />
						<SuccessDialog open={success} setOpen={setSuccessOpen} navigateTo={navigateTo} />
					</div>
				</div>
			</div>
		</div>
	);
}

function ErrorDialog ({open, setOpen}) {
	return <Dialog
		open={open}
		onClose={() => {setOpen(false)}}
	>
		<DialogTitle>Error</DialogTitle>
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
	</Dialog>
}

export default CreateStaffAccount;