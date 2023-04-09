import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

import Logo from '../../assets/logo-silver-png.png';
import FormInput from '../../components/extras/FormInput.component';
import { emailSignInValidationSchema } from '../../utils/validation.utils';
import { login } from '../../axios/auth.axios';
import { createUser } from '../../redux/reducers/users/user.slice';
import ActivityIndicator from '../../components/extras/ActivityIndicator.component';
import Navbar from '../../components/navbar/Navbar.component';

const SignIn = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const handleLoginSubmit = async (values) => {
		setLoading(true);
		await login(values)
			.then((res) => {
				setLoading(false);
				dispatch(createUser(res.data));
				navigate(`/${res.data.name}`);
			})
			.catch(({ response }) => {
				setLoading(false);
				setError(response.data);
			});
	};
	return (
		<section className='w-full h-screen flex items-center justify-center'>
			<Navbar />
			<div>
				<Link to='/'>
					<img src={Logo} alt='Mizule' className='w-40 mb-3' />
				</Link>
				<h1 className='text-white font-bold text-3xl text-left pb-2'>
					Sign In
				</h1>
				<Formik
					initialValues={{
						email: '',
						password: ''
					}}
					onSubmit={(value) => handleLoginSubmit(value)}
					validationSchema={emailSignInValidationSchema}
				>
					{({
						handleSubmit,
						handleChange,
						handleBlur,
						values,
						errors,
						isValid,
						touched
					}) => {
						return (
							<div className='md:w-[30vw] text-white'>
								<FormInput
									onChange={handleChange('email')}
									onBlur={handleBlur('email')}
									value={values.email}
									type='email'
									label='Email'
									placeholder='peter@mizule.com'
									error={errors.email}
									touched={touched.email}
								/>
								<FormInput
									onChange={handleChange('password')}
									onBlur={handleBlur('password')}
									value={values.password}
									label='Password'
									type='password'
									placeholder='Enter your Password'
									error={errors.password}
									touched={touched.password}
								/>
								{error && (
									<p className='text-red-800 text-sm font-bold'>{error}</p>
								)}
								{/* {params && params.message && <p>{params.message}</p>} */}
								<button
									className={`w-full font-bold text-lg text-black py-3 flex justify-center items-center ${
										isValid
											? loading
												? '!bg-white/75'
												: '!bg-white'
											: '!bg-white/75'
									} rounded-md mt-4 mb-3 uppercase shadow-lg`}
									onClick={handleSubmit}
									disabled={loading}
									type='submit'
								>
									{loading ? <ActivityIndicator /> : 'Sign In'}
								</button>
								<Link to='/reset-password'>
									<p className='pb-2'>Forgot password ?</p>
								</Link>
								<div className='flex flex-row'>
									<p>Don't have an account?</p>
									<Link
										to='/signup'
										className='pl-2 pb-2 font-medium text-white'
									>
										Sign Up
									</Link>
								</div>
							</div>
						);
					}}
				</Formik>
			</div>
		</section>
	);
};

export default SignIn;
