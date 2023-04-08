import { View, Text, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { openInbox } from 'react-native-email-link';
import { useDispatch } from 'react-redux';

import { signup } from '../../axios/auth.axios';
import { createUser } from '../../redux/reducers/users/user.slice';

const VerifyEmail = ({ route, navigation }) => {
	const { params } = route;
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		Linking.addEventListener('url', async (url) => {
			setLoading(true);
			await signup(params).then((res) => {
				setLoading(false);
				dispatch(createUser(res.data));
			});
		});
	}, []);
	
	return (
		<View className='flex-1 bg-black'>
			<Text>
				Verify your email by clicking the link which is sent to {params.email}
			</Text>
			<TouchableOpacity onPress={() => navigation.navigate('SignUp', params)}>
				<Text>wrong email?</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={openInbox}>
				<Text>Open Gmail</Text>
			</TouchableOpacity>
		</View>
	);
};

export default VerifyEmail;
