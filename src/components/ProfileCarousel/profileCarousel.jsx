import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { windowHeight, windowWidth } from '../../utils/constants.util';

const ProfileCarousel = ({ item }) => {
	return (
		<View className='px-4 py-2'>
			<View
				className='bg-[#1E1E1E]'
				style={{ width: windowWidth - 70, height: windowHeight / 3 }}
			>
				<View className='flex justify-center items-center'>
					<Image
						style={{ width: windowWidth - 70, height: windowHeight / 4.1 }}
						source={{
							uri: item.url
						}}
					/>
				</View>
				<Text className='text-white text-xl font-bold pl-2 pt-1'>
					{item.title}
				</Text>
				<View className='justify-end items-center flex-row pr-3 '>
					<View className=' pr-2'>
						{false ? (
							<Image
								source={{
									uri: 'https://img.icons8.com/ios/50/ffffff/hearts--v1.png'
								}}
								className='w-8 h-8'
							/>
						) : (
							<Image
								source={{
									uri: 'https://img.icons8.com/ios-filled/50/ff0000/hearts.png'
								}}
								className='w-9 h-9'
							/>
						)}
					</View>
					<View className=''>
						{false ? (
							<Image
								source={{
									uri: 'https://img.icons8.com/ios/50/ffffff/video-playlist.png'
								}}
								className='w-9 h-9'
							/>
						) : (
							<Image
								source={{
									uri: 'https://img.icons8.com/ios-filled/50/ffffff/video-playlist.png'
								}}
								className='w-8 h-8'
							/>
						)}
					</View>
				</View>
			</View>
		</View>
	);
};

export default ProfileCarousel;
