import { Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';

const Header = () => {
	return (
		<LinearGradient
			colors={['#000000', '#000000bd', '#0000008d', 'transparent']}
			locations={[0, 0.5, 0.7, 1]}
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
			className='bg-opacity-40 absolute top-0 left-0 z-10 flex-1 p-3 pb-12 w-full'
		>
			<Image source={require('../../assets/logo.png')} className='w-36 h-8' />
		</LinearGradient>
	);
};

export default Header;
