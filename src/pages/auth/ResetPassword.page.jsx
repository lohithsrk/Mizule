import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import Logo from '../../assets/logo-silver-png.png';
import FormInput from '../../components/extras/FormInput.component';
import ActivityIndicator from '../../components/extras/ActivityIndicator.component';
import Navbar from '../../components/navbar/Navbar.component';
import {
	ResetPasswordEmailValidationSchema,
	ResetPasswordValidationSchema
} from '../../utils/validation.utils';
import {
	verifyResetPasswordEmail,
	resetPassword
} from '../../axios/auth.axios';

const ResetPassword = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [isVerified, setIsVerified] = useState(false);
	const [message, setMessage] = useState('');
	const navigate = useNavigate();
	const { state } = useLocation();

	// useEffect(() => {
	// 	Linking.addEventListener('url', async (url) => {
	// 		setMessage('');
	// 		setIsVerified(true);
	// 	});
	// }, []);

	const handleVerifyEmail = async (values) => {
		setLoading(true);
		await verifyResetPasswordEmail(values)
			.then((res) => {
				setLoading(false);
				setMessage('Check your email');
			})
			.catch(({ response }) => {
				setLoading(false);
				setError(response.data);
			});
	};

	const handleResetPassword = async (values) => {
		setLoading(true);
		await resetPassword(values)
			.then((res) => {
				setLoading(false);
				navigate('/signin', {
					state: 'Password resetted successfully. Try signing in.'
				});
			})
			.catch(({ response }) => {
				setLoading(false);
				setError(response.data);
			});
	};

	return (
		<div className='w-full h-screen flex items-center justify-center'>
			<Navbar />
			<div>
				<Link to='/'>
					<img src={Logo} alt='Mizule' className='w-40 mb-3' />
				</Link>
				<h1 className='text-white font-bold text-3xl text-left pb-2'>
					Sign In
				</h1>
				<Formik
					initialValues={
						isVerified
							? { email: '', password: '', confirmpassword: '' }
							: { email: '' }
					}
					onSubmit={(value) => {
						isVerified ? handleResetPassword(value) : handleVerifyEmail(value);
					}}
					validationSchema={
						isVerified
							? ResetPasswordValidationSchema
							: ResetPasswordEmailValidationSchema
					}
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
									label='Email'
									type='email'
									placeholder='peter@mizule.com'
									error={errors.email}
									touched={touched.email}
									disabled={loading || Boolean(message.length)}
								/>
								{isVerified && (
									<>
										<FormInput
											onChange={handleChange('password')}
											onBlur={handleBlur('password')}
											value={values.password}
											label='Password'
											placeholder='Enter your Password'
											type='password'
											error={errors.password}
											touched={touched.password}
										/>
										<FormInput
											onChange={handleChange('confirmpassword')}
											onBlur={handleBlur('confirmpassword')}
											value={values.confirmpassword}
											label='Confirm password'
											type='password'
											placeholder='Re-enter password'
											error={errors.confirmpassword}
											touched={touched.confirmpassword}
										/>
									</>
								)}
								{error && (
									<p className='text-red-800 text-sm font-bold'>{error}</p>
								)}
								<button
									className={`w-full font-bold text-lg text-black py-3 flex justify-center items-center ${
										isValid
											? loading
												? '!bg-white/75'
												: '!bg-white'
											: '!bg-white/75'
									} rounded-md mt-4 mb-3 uppercase shadow-lg`}
									onClick={handleSubmit}
									disabled={
										loading
											? true
											: loading || Boolean(message.length)
											? true
											: isVerified || !Boolean(message.length)
											? false
											: true
									}
									type='submit'
								>
									{loading ? (
										<ActivityIndicator />
									) : !message.length || isVerified ? (
										'Verify Email'
									) : message ? (
										message
									) : (
										'Reset Password'
									)}
								</button>
								<div className='flex flex-row'>
									<span>Know your password already? </span>
									<Link to='/signin' className='pb-2'>
										<span className='pl-2 font-medium text-white'>Sign In</span>
									</Link>
								</div>
							</div>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default ResetPassword;
