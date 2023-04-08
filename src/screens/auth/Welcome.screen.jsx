import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
	GoogleSignin,
	statusCodes
} from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';

import { loginWithGoogle } from '../../axios/auth.axios';
import { createUser } from '../../redux/reducers/users/user.slice';

const WelcomeScreen = ({ navigation }) => {
	const [user, setUser] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		GoogleSignin.configure({
			// scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
			webClientId:
				'611763272117-p2149tn0hu0u142bgjtq18qct2md5bj6.apps.googleusercontent.com',
			// client ID of type WEB for your server (needed to verify user ID and offline access)
			offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
			forceCodeForRefreshToken: true // [Android] related to `serverAuthCode`, read the docs link below *.
		});
		// signIn();
	}, []);
	signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const { user } = await GoogleSignin.signIn();
			await loginWithGoogle(user).then((res) => dispatch(createUser(res.data)));
		} catch (error) {
			'🚀 ~ file: SignIn.screen.jsx:30 ~ signIn= ~ error:', error;
			// if (error.code === statusCodes.SIGN_IN_CANCELLED) {
			// 	return;
			// } else if (error.code === statusCodes.IN_PROGRESS) {
			// 	return;
			// } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
			// 	return;
			// } else {
			// }
		}
	};
	return (
		<View className='flex-1 w-full items-center justify-center w- px-6 relative bg-black'>
			<View className='flex  mb-10'>
				<Image
					className='w-80  h-16'
					source={require('../../assets/logo.png')}
				/>
			</View>
			<View className='w-[85vw]'>
				<TouchableOpacity
					className='pt-2 pb-2'
					onPress={() => navigation.navigate('SignUp')}
				>
					<View className='flex border border-gray-200 py-2 justify-center items-center bg-white rounded-md'>
						<Text className='font-bold text-lg text-black'>Sign Up</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					className='pt-2 pb-2'
					onPress={() => navigation.navigate('SignIn')}
				>
					<View className='flex border border-gray-200 py-2 justify-center items-center bg-transparent rounded-md'>
						<Text className='font-bold text-lg text-white'>Sign In</Text>
					</View>
				</TouchableOpacity>
				<View className='flex flex-row w-full items-center justify-center my-4'>
					<View className='h-[1px] w-[38vw] bg-zinc-700'></View>
					<Text className='flex justify-center items-center mx-2 font-extrabold'>
						OR
					</Text>
					<View className='h-[1px] w-[37vw] bg-zinc-700'></View>
				</View>
				<TouchableOpacity className='pt-3 pb-5' onPress={signIn}>
					<View className='flex flex-row border border-zinc-700  py-2 justify-center items-center bg-transparent rounded-md'>
						<Image
							className='w-7 h-7'
							source={require('../../assets/AuthImages/Google.png')}
						/>

						<Text className='font-medium text-base py-1 pl-3 text-white'>
							Continue with Google
						</Text>
					</View>
				</TouchableOpacity>
				{/* <TouchableOpacity>
					<View className='flex flex-row border border-zinc-700  py-2 justify-center items-center bg-transparent rounded-md'>
						<Image
							className='w-6 h-7'
							source={require('../../assets/AuthImages/Apple.png')}
						/>

						<Text className=' font-medium text-base py-1 pl-3 text-white'>
							Continue with Apple
						</Text>
					</View>
				</TouchableOpacity> */}
			</View>
		</View>
	);
};

export default WelcomeScreen;
