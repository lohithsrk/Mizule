import React, { useRef, useState } from 'react';
import { View, Text, StatusBar, TextInput, Pressable } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';

import { primary_color } from '../../utils/constants.util';
import { signUpValidationSchema } from '../../utils/validationSchema.util';

import { generateOTP } from '../../axios/validate.axios';

const SignUp = ({ route }) => {
	const email = route.params && route.params.email;

	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();

	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const { navigate } = useNavigation();

	const generateOTPHandler = async (values) => {
		setLoading(true);
		await generateOTP(values.email)
			.then((res) => {
				navigate('VerifyOTP', { otp: res.data.otp, values });
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				navigate('Login', { error: 'User already found. Try logging in.' });
			});
	};

	return (
		<View
			style={{
				flex: 1,
				paddingTop: StatusBar.currentHeight,
				backgroundColor: primary_color,
				padding: 25,
				justifyContent: 'center'
			}}
		>
			<Formik
				initialValues={{
					email: email ? email : '',
					password: '',
					confirmPassword: ''
				}}
				onSubmit={(values) => {
					console.log(
						'🚀 ~ file: Signup.screen.jsx ~ line 52 ~ SignUp ~ values',
						values
					);
					generateOTPHandler(values);
				}}
				validationSchema={signUpValidationSchema}
			>
				{({
					handleChange,
					handleBlur,
					handleSubmit,
					values,
					errors,
					isValid
				}) => {
					return (
						<SignUpForm
							handleChange={handleChange}
							handleBlur={handleBlur}
							handleSubmit={handleSubmit}
							values={values}
							errors={errors}
							isValid={isValid}
							passwordRef={passwordRef}
							emailRef={emailRef}
							confirmPasswordRef={confirmPasswordRef}
							generateOTPHandler={generateOTPHandler}
							loading={loading}
							navigate={navigate}
							errorMsg={errorMsg}
						/>
					);
				}}
			</Formik>
		</View>
	);
};

const SignUpForm = ({
	handleChange,
	handleBlur,
	handleSubmit,
	values,
	errors,
	isValid,
	passwordRef,
	emailRef,
	confirmPasswordRef,
	generateOTPHandler,
	loading,
	navigate,
	errorMsg
}) => {
	return (
		<>
			<Text
				style={{
					fontSize: 50,
					fontWeight: '700',
					color: 'white',
					marginBottom: 20
				}}
			>
				Sign Up
			</Text>
			<FormInput
				onChangeText={handleChange('email')}
				onBlur={handleBlur('email')}
				value={values.email}
				label='Email'
				keyboardType='email-address'
				errorMsg={errors.email}
				textContentType='emailAddress'
				passwordRef={passwordRef}
				emailRef={emailRef}
				confirmPasswordRef={confirmPasswordRef}
				handleSubmit={handleSubmit}
				isValid={isValid}
			/>
			<FormInput
				onChangeText={handleChange('password')}
				onBlur={handleBlur('password')}
				value={values.password.trim()}
				label='Password'
				keyboardType='default'
				errorMsg={errors.password}
				textContentType='password'
				passwordRef={passwordRef}
				emailRef={emailRef}
				confirmPasswordRef={confirmPasswordRef}
				handleSubmit={handleSubmit}
				isValid={isValid}
			/>
			<FormInput
				onChangeText={handleChange('confirmPassword')}
				onBlur={handleBlur('confirmPassword')}
				value={values.confirmPassword.trim()}
				label='Confirm Password'
				keyboardType='default'
				errorMsg={errors.confirmPassword}
				textContentType='password'
				passwordRef={passwordRef}
				emailRef={emailRef}
				confirmPasswordRef={confirmPasswordRef}
				handleSubmit={handleSubmit}
				isValid={isValid}
			/>
			{errorMsg && <Text style={{ fontSize: 16 }}>{errorMsg}</Text>}

			<Pressable style={{ marginBottom: 15 }} onPress={() => navigate('Login')}>
				<Text style={{ fontSize: 16 }}>Already have an account?</Text>
			</Pressable>
			<Pressable
				style={{
					backgroundColor:
						!loading &&
						isValid &&
						values.email.length &&
						values.password.length &&
						values.confirmPassword.length
							? 'white'
							: 'rgb(150, 150, 150)',
					padding: 10,
					borderRadius: 10
				}}
				disabled={
					!loading &&
					isValid &&
					values.email.length &&
					values.password.length &&
					values.confirmPassword.length
						? false
						: true
				}
				onPress={handleSubmit}
			>
				<Text
					style={{
						color: primary_color,
						textAlign: 'center',
						fontSize: 20,
						fontWeight: '700',
						letterSpacing: 1,
						textTransform: 'uppercase'
					}}
				>
					{loading ? 'Sending OTP...' : 'Send OTP'}
				</Text>
			</Pressable>
		</>
	);
};

const FormInput = ({
	onChangeText,
	onBlur,
	value,
	label,
	keyboardType,
	errorMsg,
	textContentType,
	emailRef,
	passwordRef,
	confirmPasswordRef,
	handleSubmit,
	isValid
}) => {
	return (
		<>
			<TextInput
				ref={
					label === 'Email'
						? emailRef
						: label === 'Confirm Password'
						? confirmPasswordRef
						: passwordRef
				}
				onChangeText={onChangeText}
				onBlur={onBlur}
				value={value}
				style={{
					padding: 10,
					fontSize: 20,
					fontWeight: '500',
					marginBottom: 8,
					borderBottomColor: 'white',
					borderBottomWidth: 2
				}}
				placeholder={label}
				keyboardType={keyboardType}
				textContentType={textContentType}
				secureTextEntry={label === 'Password' || label === 'Confirm Password'}
				returnKeyType={
					label === 'Email' ? 'next' : label === 'Password' ? 'next' : 'done'
				}
				onSubmitEditing={() => {
					if (label === 'Confirm Password') {
						return handleSubmit();
					} else if (label === 'Password') {
						return confirmPasswordRef.current.focus();
					} else if (label === 'Email') {
						return passwordRef.current.focus();
					}
				}}
			/>
			<Text
				style={{
					color: isValid ? '#00ff00' : '#ff0000',
					marginBottom: 12
				}}
			>
				{isValid ? ' ' : value.length ? errorMsg : ''}
				{!label === 'Password' ? 'Invalid email or passwod. Try again...' : ' '}
			</Text>
		</>
	);
};

export default SignUp;
