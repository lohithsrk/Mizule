import React, { useRef, useState } from 'react';
import { View, Text, StatusBar, TextInput, Pressable } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import { primary_color, windowWidth } from '../../utils/constants.util';
import { signUpValidationSchema } from '../../utils/validationSchema.util';
import { setUser } from '../../persist/auth.persist';

import { signUpUser } from '../../axios/auth.axios';
import { generateOTP } from '../../axios/validate.axios';

const SignUp = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();

	const [validated, setValidated] = useState(true);
	const [isOTPGenerateRequested, setIsOTPGenerateRequested] = useState(false);
	const [OTP, setOTP] = useState(null);
	const [loading, setLoading] = useState(false);

	const { navigate } = useNavigation();

	const handleSignUpSubmit = async (values) => {
		setLoading(true);
		await signUpUser(values)
			.then((res) => {
				setLoading(false);
				setUser(res.data);
				navigate('Main', {
					screen: 'Zule'
				});
			})
			.catch((err) => {
				setLoading(false);
				console.log(err.message);
				setValidated(false);
			});
	};

	const generateOTPHandler = async (email) => {
		setLoading(true);
		await generateOTP(email)
			.then((res) => {
				setOTP(res.data.otp);
				setIsOTPGenerateRequested(true);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
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
				initialValues={{ email: '', password: '', confirmPassword: '' }}
				onSubmit={(values) => handleSignUpSubmit(values)}
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
						<View>
							{!isOTPGenerateRequested ? (
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
									validated={validated}
									generateOTPHandler={generateOTPHandler}
									loading={loading}
									navigate={navigate}
								/>
							) : (
								<SubmitOTP
									setIsOTPGenerateRequested={setIsOTPGenerateRequested}
									handleSubmit={handleSubmit}
									OTP={OTP}
									loading={loading}
									setLoading={setLoading}
								/>
							)}
						</View>
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
	validated,
	generateOTPHandler,
	loading,
	navigate
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
				validated={validated}
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
				validated={validated}
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
				validated={validated}
				isValid={isValid}
			/>
			<Pressable style={{ marginBottom: 15 }} onPress={() => navigate('Login')}>
				<Text style={{ fontSize: 16 }}>Already have an account?</Text>
			</Pressable>
			<Pressable
				onPress={() =>
					values.email.length && isValid && generateOTPHandler(values.email)
				}
				style={{
					backgroundColor:
						isValid &&
						values.email.length &&
						values.password.length &&
						values.confirmPassword.length
							? 'white'
							: 'rgb(150, 150, 150)',
					padding: 10,
					borderRadius: 10
				}}
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
					disabled={
						!loading &&
						isValid &&
						values.email.length &&
						values.password.length &&
						values.confirmPassword.length
							? false
							: true
					}
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
	validated,
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
					color: validated && isValid ? '#00ff00' : '#ff0000',
					marginBottom: 12
				}}
			>
				{validated && isValid ? ' ' : value.length ? errorMsg : ''}
				{!validated && label === 'Password'
					? 'Invalid email or passwod. Try again...'
					: ' '}
			</Text>
		</>
	);
};

const SubmitOTP = ({
	setIsOTPGenerateRequested,
	handleSubmit,
	OTP,
	loading,
	setLoading
}) => {
	const [isOTPValid, setIsOTPValid] = useState(false);

	return (
		<>
			<Text
				style={{
					fontSize: 50,
					fontWeight: '700',
					color: 'white'
				}}
			>
				Enter OTP
			</Text>
			<Text style={{ fontSize: 16 }}>OTP is sent to your email</Text>
			<OTPInputView
				style={{ width: windowWidth / 2, height: 70 }}
				pinCount={6}
				// code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
				// onCodeChanged = {code => { this.setState({code})}}
				autoFocusOnLoad={setIsOTPGenerateRequested}
				codeInputFieldStyle={{
					width: 30,
					height: 45,
					borderWidth: 0,
					borderBottomWidth: 2,
					borderColor: 'rgb(150, 150, 150)'
				}}
				codeInputHighlightStyle={{ borderColor: '#ffffff' }}
				onCodeFilled={(code) => {
					if (parseInt(OTP) == parseInt(code)) setIsOTPValid(true);
				}}
			/>
			<Pressable
				style={{ marginBottom: 15 }}
				onPress={() => setIsOTPGenerateRequested(false)}
			>
				<Text style={{ fontSize: 16 }}>Wrong Email or Password?</Text>
			</Pressable>
			<Pressable
				style={{
					backgroundColor: isOTPValid ? 'white' : 'rgb(150,150,150)',
					padding: 10,
					borderRadius: 10
				}}
				onPress={handleSubmit}
				disabled={!loading && !isOTPValid}
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
					{loading ? 'Rolling In...' : 'Roll In!'}
				</Text>
			</Pressable>
		</>
	);
};

export default SignUp;
