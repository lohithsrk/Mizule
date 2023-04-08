import {
	View,
	Text,
	TouchableOpacity,
	Image,
	ActivityIndicator
} from 'react-native';
import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { Formik } from 'formik';

import FormInput from '../../components/auth/FormInput.component';
import { emailSignUpValidationSchema } from '../../utils/validationSchema/AuthValidation.utils';
import { verifyEmail } from '../../axios/auth.axios';

const SignUp = ({ navigation, route }) => {
	const { params } = route;
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleEmailSignUp = async (values) => {
		setLoading(true);
		await verifyEmail(values)
			.then((res) => {
				setLoading(false);
				navigation.navigate('VerifyEmail', values);
			})
			.catch((err) => {
				setLoading(false);
				setError('User already exist. Try signing in.');
			});
	};

	return (
		<View className='flex-1 items-center justify-center bg-black px-6 relative'>
			<View className='flex-col'>
				<View className='flex justify-end mb-5'>
					<Image
						className='w-48 h-10'
						source={require('../../assets/logo.png')}
					/>
				</View>
				<Text className='text-white font-extrabold text-3xl text-left pb-5'>
					Sign Up
				</Text>
				<Formik
					initialValues={
						params
							? params
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
							<View className='w-[85vw] '>
								<FormInput
									onChangeText={handleChange('email')}
									onBlur={handleBlur('email')}
									value={values.email}
									keyboardType={'email-address'}
									label='Email'
									placeholder='peter@mizule.com'
									handleSubmit={handleSubmit}
									isValid={isValid}
									error={errors.email}
									touched={touched.email}
								/>
								<FormInput
									onChangeText={handleChange('password')}
									onBlur={handleBlur('password')}
									value={values.password}
									label='Password'
									placeholder='Enter your Password'
									handleSubmit={handleSubmit}
									error={errors.password}
									touched={touched.password}
									secureTextEntry={true}
									/>
								<FormInput
									onChangeText={handleChange('confirmpassword')}
									onBlur={handleBlur('confirmpassword')}
									value={values.confirmpassword}
									label='Confirm password'
									placeholder='Re-enter password'
									handleSubmit={handleSubmit}
									error={errors.confirmpassword}
									touched={touched.confirmpassword}
									secureTextEntry={true}
								/>
								{error && <Text className='text-red-800'>{error}</Text>}
								<TouchableOpacity
									className='pt-2 pb-6 flex border border-gray-200 py-2 justify-center items-center bg-white rounded-md mt-2 mb-3'
									onPress={handleSubmit}
									disabled={loading}
								>
									<Text className='font-bold text-lg text-black'>
										{loading ? <ActivityIndicator /> : 'Sign Up'}
									</Text>
								</TouchableOpacity>

								<View className='flex flex-row'>
									<Text>Already have an account?</Text>
									<TouchableOpacity
										className='pb-2'
										onPress={() => navigation.navigate('SignIn')}
									>
										<Text className='pl-2 font-medium text-white'>Sign In</Text>
									</TouchableOpacity>
								</View>
							</View>
						);
					}}
				</Formik>
				{/* {signupType == 'email' ? (
					<TouchableOpacity onPress={() => setSignUpType('phone')}>
						<Text>Continue with Phone Number</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={() => setSignUpType('email')}>
						<Text>Continue with Email</Text>
					</TouchableOpacity>
				)} */}

				{/* <View className="flex flex-row w-full items-center justify-center mt-2">
          <View className="h-[1px] w-[38vw] bg-zinc-700"></View>
          <Text className="flex justify-center items-center mx-2 font-extrabold">
            OR
          </Text>
          <View className="h-[1px] w-[37vw] bg-zinc-700"></View>
        </View>
        <TouchableOpacity className="pt-6 pb-5">
          <View className="flex flex-row border border-zinc-700  py-2 justify-center items-center bg-transparent rounded-md">
            <Image
              className="w-7 h-7"
              source={require("../../assets/AuthImages/Google.png")}
            />

            <Text className="font-medium text-base py-1 pl-3 text-white">
              Continue with Google
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="flex flex-row border border-zinc-700  py-2 justify-center items-center bg-transparent rounded-md">
            <Image
              className="w-6 h-7"
              source={require("../../assets/AuthImages/Apple.png")}
            />

            <Text className=" font-medium text-base py-1 pl-3 text-white">
              Continue with Apple
            </Text>
          </View>
        </TouchableOpacity> */}
			</View>
		</View>
	);
};

export default SignUp;
