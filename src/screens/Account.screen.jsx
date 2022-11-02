import { View, Text, Pressable, StatusBar } from 'react-native';
import React from 'react';

import { primary_color } from '../utils/constants.util';

const Account = () => {
	return (
		<View
			style={{
				paddingTop: StatusBar.currentHeight,
				backgroundColor: primary_color
			}}
		>
			<Text>Account</Text>
		</View>
	);
};

export default Account;
