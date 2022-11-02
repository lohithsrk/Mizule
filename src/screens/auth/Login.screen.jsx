import React, { useRef, useState } from 'react';
import { View, Text, StatusBar, TextInput, Pressable } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';

import { primary_color } from '../../utils/constants.util';
import { loginValidationSchema } from '../../utils/validationSchema.util';
import { setUser } from '../../persist/auth.persist';

import { loginUser } from '../../axios/auth.axios';

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();

	const [validated, setValidated] = useState(true);
	const [loading, setLoading] = useState(false);

	const { navigate } = useNavigation();

	const handleLoginSubmit = async (values) => {
		setLoading(true);
		await loginUser(values)
			.then((res) => {
				setLoading(false);
				setUser(res.data);
				// navigate('Zules', {
				// 	screen: 'Main'
				// });
			})
			.catch((err) => {
				console.log(err.message);
				setValidated(false);
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
			<Text
				style={{
					fontSize: 50,
					fontWeight: '700',
					color: 'white',
					marginBottom: 20
				}}
			>
				Login
			</Text>
			<Formik
				initialValues={{ email: '', password: '' }}
				onSubmit={(values) => handleLoginSubmit(values)}
				validationSchema={loginValidationSchema}
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
								handleSubmit={handleSubmit}
								validated={validated}
								isValid={isValid}
							/>
							<Pressable
								style={{ marginBottom: 15 }}
								onPress={() => navigate('ForgotPassword')}
							>
								<Text style={{ fontSize: 16 }}>Forgot paaaword?</Text>
							</Pressable>
							<Pressable
								style={{ marginBottom: 15 }}
								onPress={() => navigate('Signup')}
							>
								<Text style={{ fontSize: 16 }}>Dont have an account?</Text>
							</Pressable>
							<Pressable
								onPress={handleSubmit}
								style={{
									backgroundColor:
										!loading &&
										isValid &&
										values.email.length &&
										values.password.length
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
										values.password.length
											? false
											: true
									}
								>
									{loading ? 'Rolling In...' : 'Roll In!'}
								</Text>
							</Pressable>
						</View>
					);
				}}
			</Formik>
		</View>
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
	handleSubmit,
	validated,
	isValid
}) => {
	return (
		<>
			<TextInput
				ref={label === 'Email' ? emailRef : passwordRef}
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
				secureTextEntry={label === 'Password'}
				returnKeyType={label === 'Email' ? 'next' : 'done'}
				onSubmitEditing={() => {
					if (label === 'Password') {
						return handleSubmit();
					} else {
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

export default Login;
