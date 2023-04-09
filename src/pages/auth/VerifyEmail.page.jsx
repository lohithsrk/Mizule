import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import Navbar from '../../components/navbar/Navbar.component';

const VerifyEmail = () => {
	const navigate = useNavigate();
	const { state } = useLocation();

	useEffect(() => {
		if (!state) navigate('/not-found');
	}, []);

	if (!state) return navigate('/not-found');
	return (
		<div className='w-full h-screen text-white items-center justify-center '>
			<Navbar />
			<p>
				Verify your email by clicking the link which is sent to {state.email}
			</p>
			<Link to='/signup' state={state}>
				wrong email?
			</Link>
			<a href='https://mail.google.com/' target='_blank' rel='noreferrer'>
				Open Gmail
			</a>
		</div>
	);
};

export default VerifyEmail;
