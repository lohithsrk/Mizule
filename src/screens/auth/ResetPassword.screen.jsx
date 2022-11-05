import React, { useState, useRef } from 'react';
import {
	View,
	Text,
	StatusBar,
	TextInput,
	Pressable,
	Image
} from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';

import { primary_color } from '../../utils/constants.util';
import { resetPassword } from '../../axios/auth.axios';
import { resetPasswordValidation } from '../../utils/validationSchema.util';

const ResetPassword = () => {
	const { navigate, getState } = useNavigation();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();

	const [validated, setValidated] = useState(true);
	const [loading, setLoading] = useState(false);

	const resetPasswordHandler = async (password) => {
		setLoading(true);
		await resetPassword(
			getState().routes.filter((route) => route.name == 'ResetPassword')[0]
				.params.user_id,
			password
		)
			.then((res) => {
				navigate('Login', { msg: 'Password reset successful' });
			})
			.catch((err) => {
				navigate('Login', { msg: 'Error in resetting password' });
				setValidated(false);
			});
	};

	return (
		<View
			style={{
				flex: 1,
				padding: 25,
				justifyContent: 'center'
			}}
		>
			<Image
				source={require('../../assets/mizule-white.png')}
				style={{ width: 200, resizeMode: 'contain' }}
			/>
			<Text
				style={{
					fontSize: 50,
					fontWeight: '700',
					color: 'white',
					marginBottom: 20
				}}
			>
				Reset password
			</Text>
			<Formik
				initialValues={{ password: '', confirmPassword: '' }}
				onSubmit={(values) => resetPasswordHandler(values.password)}
				validationSchema={resetPasswordValidation}
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
								onChangeText={handleChange('password')}
								onBlur={handleBlur('password')}
								value={values.password.trim()}
								label='Password'
								keyboardType='default'
								errorMsg={errors.password}
								textContentType='password'
								passwordRef={passwordRef}
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
								confirmPasswordRef={confirmPasswordRef}
								handleSubmit={handleSubmit}
								validated={validated}
								isValid={isValid}
							/>

							<Pressable
								onPress={handleSubmit}
								style={{
									backgroundColor:
										!loading && isValid && values.password.length
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
										values.password.length &&
										values.confirmPassword.length
											? false
											: true
									}
								>
									Reset Password
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
	passwordRef,
	confirmPasswordRef,
	handleSubmit,
	validated,
	isValid
}) => {
	return (
		<>
			<TextInput
				ref={label === 'Confirm Password' ? confirmPasswordRef : passwordRef}
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
				returnKeyType={label === 'Password' ? 'next' : 'done'}
				onSubmitEditing={() => {
					if (label === 'Confirm Password') {
						return handleSubmit();
					} else if (label === 'Password') {
						return confirmPasswordRef.current.focus();
					}
				}}
				blurOnSubmit={false}
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

export default ResetPassword;
