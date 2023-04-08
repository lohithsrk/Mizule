import * as Yup from 'yup';

export const emailSignUpValidationSchema = Yup.object().shape({
	email: Yup.string()
		.trim()
		.lowercase()
		.email('Please enter valid email')
		.required('Email Address is Required'),
	password: Yup.string()
		.min(8, ({ min }) => `Password must be at least ${min} characters`)
		.matches(/[0-9]/, 'Password requires a number')
		.matches(/[a-z]/, 'Password requires a lowercase letter')
		.matches(/[A-Z]/, 'Password requires an uppercase letter')
		.matches(/[^\w]/, 'Password requires a symbol')
		.required('Password is required'),
	confirmpassword: Yup.string()
		.min(8, ({ min }) => `Confirm password must be at least ${min} characters`)
		.matches(/[0-9]/, 'Confirm password requires a number')
		.matches(/[a-z]/, 'Confirm password requires a lowercase letter')
		.matches(/[A-Z]/, 'Confirm password requires an uppercase letter')
		.matches(/[^\w]/, 'Confirm password requires a symbol')
		.oneOf([Yup.ref('password'), null], 'Confirm password does not match')
		.required('Confirm password is required')
});

export const phoneSignUpValidationSchema = Yup.object().shape({
	phone: Yup.number()
		.min(10, ({ min }) => `Please enter valid phone number`)
		.required('Phone number is Required'),
	password: Yup.string()
		.min(8, ({ min }) => `Password must be at least ${min} characters`)
		.matches(/[0-9]/, 'Password requires a number')
		.matches(/[a-z]/, 'Password requires a lowercase letter')
		.matches(/[A-Z]/, 'Password requires an uppercase letter')
		.matches(/[^\w]/, 'Password requires a symbol')
		.required('Password is required'),
	confirmpassword: Yup.string()
		.min(8, ({ min }) => `Confirm password must be at least ${min} characters`)
		.matches(/[0-9]/, 'Confirm password requires a number')
		.matches(/[a-z]/, 'Confirm password requires a lowercase letter')
		.matches(/[A-Z]/, 'Confirm password requires an uppercase letter')
		.matches(/[^\w]/, 'Confirm password requires a symbol')
		.oneOf([Yup.ref('password'), null], 'Passwords does not match')
		.required('Confirm password is required')
});

export const SignInValidationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Please enter valid email')
		.required('Email Address is Required'),
	password: Yup.string()
		.min(8, ({ min }) => `Password must be at least ${min} characters`)
		.matches(/[0-9]/, 'Password requires a number')
		.matches(/[a-z]/, 'Password requires a lowercase letter')
		.matches(/[A-Z]/, 'Password requires an uppercase letter')
		.matches(/[^\w]/, 'Password requires a symbol')
		.required('Password is required')
});
export const emailSignInValidationSchema = Yup.object().shape({
	email: Yup.string()
		.trim()
		.lowercase()
		.email('Please enter valid email')
		.required('Email Address is Required'),
	password: Yup.string()
		.min(8, ({ min }) => `Password must be at least ${min} characters`)
		.matches(/[0-9]/, 'Password requires a number')
		.matches(/[a-z]/, 'Password requires a lowercase letter')
		.matches(/[A-Z]/, 'Password requires an uppercase letter')
		.matches(/[^\w]/, 'Password requires a symbol')
		.required('Password is required')
});

export const ResetPasswordEmailValidationSchema = Yup.object().shape({
	email: Yup.string()
		.trim()
		.lowercase()
		.email('Please enter valid email')
		.required('Email Address is Required')
});

export const ResetPasswordValidationSchema = Yup.object().shape({
	email: Yup.string()
		.trim()
		.lowercase()
		.email('Please enter valid email')
		.required('Email Address is Required'),
	password: Yup.string()
		.min(8, ({ min }) => `Password must be at least ${min} characters`)
		.matches(/[0-9]/, 'Password requires a number')
		.matches(/[a-z]/, 'Password requires a lowercase letter')
		.matches(/[A-Z]/, 'Password requires an uppercase letter')
		.matches(/[^\w]/, 'Password requires a symbol')
		.required('Password is required'),
	confirmpassword: Yup.string()
		.min(8, ({ min }) => `Confirm password must be at least ${min} characters`)
		.matches(/[0-9]/, 'Confirm password requires a number')
		.matches(/[a-z]/, 'Confirm password requires a lowercase letter')
		.matches(/[A-Z]/, 'Confirm password requires an uppercase letter')
		.matches(/[^\w]/, 'Confirm password requires a symbol')
		.oneOf([Yup.ref('password'), null], 'Confirm password does not match')
		.required('Confirm password is required')
});
