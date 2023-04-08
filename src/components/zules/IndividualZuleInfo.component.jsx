import { View, TouchableOpacity, Image, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import LikeZule from './LikeZule.component';

const IndividualZuleInfo = ({ zule, user, activeIndex }) => {
	return (
		<LinearGradient
			colors={['#000', '#000000af', '#0000009f', 'transparent']}
			locations={[0, 0.5, 0.7, 1]}
			start={{ x: 0, y: 1 }}
			end={{ x: 0, y: 0 }}
			className='w-full h-32 absolute bottom-0 px-3 justify-end'
		>
			<View>
				<View className='flex-row'>
					<Text className='font-bold text-white text-lg'>{zule.title}</Text>
					<LikeZule zule={zule} user={user} activeIndex={activeIndex} />
				</View>
				{/* <View className='flex-row items-center'>
					<Image
						source={{
							uri: zule.zuleSpot.icon
						}}
						className='w-8 h-8 rounded'
					/>
					<View>
						<Text className='text-white font-semibold'>
							{zule.zuleSpot.title}
						</Text>
						<Text className='text-[#1c9cfd] text-xs'>Follow</Text>
					</View>
				</View> */}
				<View style={{ flexDirection: 'row' }}>
					{zule.genre?.map((genre, index) => (
						<Text key={index}>
							{genre}
							{zule.genre.length - 1 !== index && ' • '}
						</Text>
					))}
				</View>
				<View className='flex-row gap-2'>
					<Text>{zule.CBFC_rating}</Text>
					<Text>{new Date(zule.createdAt).getFullYear()}</Text>
					<View className='items-center flex-row justify-center'>
						<Image
							source={{
								uri: 'https://img.icons8.com/external-basicons-solid-edtgraphics/50/ffffff/external-eye-ui-edtim-solid-edtim.png'
							}}
							className='w-4 h-4 ml-[2px]'
						/>
						<Text>{zule.views.teaser.length}</Text>
					</View>
				</View>
			</View>
			<View className='items-center justify-center'>
				<Image
					source={{
						uri: 'https://img.icons8.com/external-outline-astudio/32/ffffff/external-app-minimal-ui-outline-astudio-18.png'
					}}
					className='w-5 h-5 translate-y-1'
				/>
				<Text Text className='uppercase text-xs'>
					Slide to watch zule
				</Text>
			</View>
		</LinearGradient>
	);
};

export default IndividualZuleInfo;
