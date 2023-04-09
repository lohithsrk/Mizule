import axios from 'axios'

import { base_url } from '../utils/constants.util'

export const login = async (values) => await axios.post(`${base_url}/login`, values)

export const signup = async (values) => await axios.post(`${base_url}/signup`, values)

export const loginWithGoogle = async (values) => await axios.post(`${base_url}/login-with-google`, values)

export const verifyEmail = async (values) => await axios.post(`${base_url}/signup/verify`, values)

export const verifyResetPasswordEmail = async (values) => await axios.post(`${base_url}/reset-password/verify`, values)

export const resetPassword = async (values) => await axios.post(`${base_url}/reset-password`, values)

