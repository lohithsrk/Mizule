import { Text, Pressable, TextInput } from 'react-native';

import { primary_color } from '../utils/constants.util';

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

export default SignUpForm;
