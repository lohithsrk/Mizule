import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	ImageBackground
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const HorizontalCarousel = ({
	items,
	title,
	itemWidth = 0,
	itemHeight = 0,
	itemStyle = {},
	hideTitle = false,
	length = 6
}) => {
	if (!items) return;
	return (
		<View className='flex-1 mb-4'>
			<View className='flex-row justify-between w-full items-center'>
				<Text className='text-white text-base font-medium pb-2 '>{title}</Text>
				{/* <TouchableOpacity>
					<Text className='text-gray-300 font-medium pb-2'>View All</Text>
				</TouchableOpacity> */}
			</View>
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				overScrollMode='never'
			>
				{items.map((item, i) => {
					if (i >= length) return;
					return (
						<ImageBackground
							className='bg-neutral-800 mr-3 rounded-lg overflow-hidden justify-end'
							style={[
								itemStyle,
								{
									width: itemWidth,
									height: itemHeight
								}
							]}
							source={{
								uri: item.teaserThumbnail
							}}
							key={i}
						>
							{!hideTitle && (
								<LinearGradient
									colors={['#000', '#000000af', '#0000009f', 'transparent']}
									locations={[0, 0.4, 0.6, 1]}
									start={{ x: 0, y: 1 }}
									end={{ x: 0, y: 0 }}
									className='pt-3 px-2'
								>
									<Text className='font-black text-white'>
										{item.title.substring(0, 20)}
										{item.title.length > 20 && '...'}
									</Text>
								</LinearGradient>
							)}
						</ImageBackground>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default HorizontalCarousel;
