import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function Login() {
	const navigate = useNavigate();

	const navigateTo = (link) => {
		navigate(link);
	}

	return (
		<div className="App">
				<p>
					This is Login <code>src/App.js</code> and save to reload.
				</p>
				<Button 
        	variant='outlined'
        	onClick={() => {navigateTo('/kitchen/main')}}
				>
					Go to Kitchen Staff
				</Button>
				<Button 
        	variant='outlined'
        	onClick={() => {navigateTo('/waiter/main')}}
				>
					Go to Wait Staff
				</Button>
				<Button 
        	variant='outlined'
        	onClick={() => {navigateTo('/manager/main')}}
				>
					Go to Managers
				</Button>
		</div>
	);
}

export default Login;