import { StyleSheet, Image } from 'react-native';
import React from 'react';
import ActionButton from 'react-native-circular-action-menu';
import { useSelector } from 'react-redux';

const CircularNav = ({ navigation }) => {
	const { user } = useSelector((state) => ({ ...state }));
	return (
		<ActionButton
			buttonColor='#111'
			position='right'
			size={75}
			itemSize={50}
			degrees={0}
			icon={
				<Image
					source={require('../../assets/Z-silver-png.png')}
					className='w-8 h-8'
				/>
			}
		>
			<ActionButton.Item
				buttonColor='#111'
				title='New Task'
				onPress={() => navigation.navigate('Zules')}
				className='items-center justify-center'
			>
				<Image
					source={{
						uri: 'https://img.icons8.com/ios-glyphs/30/ffffff/play--v1.png'
					}}
					className='w-6 h-6 translate-x-[2px] -translate-y-[1px]'
				/>
			</ActionButton.Item>

			<ActionButton.Item
				buttonColor='#111'
				title='New Task'
				onPress={() => navigation.navigate('Discover')}
				className='items-center justify-center'
			>
				<Image
					source={{
						uri: 'https://img.icons8.com/ios-filled/50/ffffff/search-more.png'
					}}
					className='w-6 h-6'
				/>
			</ActionButton.Item>
			<ActionButton.Item
				buttonColor='#111'
				title='New Task'
				onPress={() => navigation.navigate('Profile')}
				className='items-center justify-center overflow-hidden'
			>
				<Image
					source={{
						uri: user.icon
					}}
					className='w-full h-full translate-x-[2px] -translate-y-[1px] rounded-full'
				/>
			</ActionButton.Item>
		</ActionButton>
	);
};

const styles = StyleSheet.create({
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white'
	}
});

export default CircularNav;
