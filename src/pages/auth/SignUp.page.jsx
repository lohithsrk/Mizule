import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik } from 'formik';

import Logo from '../../assets/logo-silver-png.png';
import FormInput from '../../components/extras/FormInput.component';
import { emailSignUpValidationSchema } from '../../utils/validation.utils';
import { verifyEmail } from '../../axios/auth.axios';
import ActivityIndicator from '../../components/extras/ActivityIndicator.component';
import Navbar from '../../components/navbar/Navbar.component';

const SignUp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const { state } = useLocation();

	const handleEmailSignUp = async (values) => {
		setLoading(true);
		await verifyEmail(values)
			.then((res) => {
				setLoading(false);
				navigate('/verify-email', { state: values });
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
					Sign Up
				</h1>
				<Formik
					initialValues={
						state
							? state
							: {
									email: '',
									password: '',
									confirmpassword: ''
							  }
					}
					onSubmit={(value) => handleEmailSignUp(value)}
					validationSchema={emailSignUpValidationSchema}
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
									{loading ? <ActivityIndicator /> : 'Sign Up'}
								</button>
								<Link to='/reset-password'>
									<p className='pb-2'>Forgot password ?</p>
								</Link>
								<div className='flex flex-row'>
									<p>Don't have an account?</p>
									<Link
										to='/signin'
										className='pl-2 pb-2 font-medium text-white'
									>
										Sign In
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

export default SignUp;
