import React from 'react';
import './accounts.css'
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CreateStaffAccount() {
	const navigate = useNavigate();

	const navigateTo = (link) => {
		navigate(link);
	}

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
					/>
				</div>
				<div className="input-container">
					<TextField
						label="Password"
						className="input-register"
						type="password"
					/>
				</div>
				<div className="input-container">
					<TextField
						label="Confirm Password"
						className="input-register"
						type="password"
					/>
				</div>
				<div className="input-container">
					<TextField
						label="Authentication Passkey"
						className="input-register"
						type="password"
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
								navigateTo('/staff/login');
							}}
							className="button"
						>
							Create
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateStaffAccount;