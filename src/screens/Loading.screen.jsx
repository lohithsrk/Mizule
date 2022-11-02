import { View, Text, Image } from 'react-native';
import React from 'react';

import {
	primary_color,
	windowHeight,
	windowWidth
} from '../utils/constants.util';

const Loading = () => {
	return (
		<View
			style={{
				width: windowWidth,
				height: windowHeight,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: primary_color
			}}
		>
			<Image
				source={require('../assets/mizule-white.png')}
				style={{ width: 200, resizeMode: 'contain' }}
			/>
		</View>
	);
};

export default Loading;
