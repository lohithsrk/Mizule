import * as yup from 'yup';


export const signUpValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter valid email')
        .required('Email Address is Required'),
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .min(8, ({ min }) => `Confirm password must be at least ${min} characters`)
        .matches(/[0-9]/, 'Confirm password requires a number')
        .matches(/[a-z]/, 'Confirm password requires a lowercase letter')
        .matches(/[A-Z]/, 'Confirm password requires an uppercase letter')
        .matches(/[^\w]/, 'Confirm password requires a symbol')
        .oneOf([yup.ref('password'), null], 'Confirm password does not match')
        .required('Password is required')
});

export const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter valid email')
        .required('Email Address is Required'),
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .required('Password is required')
});