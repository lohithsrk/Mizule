import { Image, Text, View, Pressable, ScrollView } from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';

import { windowWidth } from '../../utils/constants.util';

import HorizontalCarousel from '../extras/HorizontalCarousel.component';

// import { colorPicker } from '../../utils/colorPicker.util';

const WatchZule = ({ zule, isWatchZuleOpen, setIsWatchZuleOpen }) => {
	// const [bgColor, setbgColor] = useState('#00000000');
	// const fetchBgColors = async () => {
	// 	let colors = await colorPicker(zule.zuleThumbnail);
	// 	setbgColor(colors.lightVibrant + '80');
	// };
	// fetchBgColors();
	const { zules } = useSelector((state) => ({ ...state }));

	if (!zule) return;
	return (
		<Modal
			isVisible={isWatchZuleOpen}
			onBackButtonPress={() => setIsWatchZuleOpen(false)}
			backdropColor='black'
			className='flex-1 m-0'
		>
			<View className='flex-1 bg-black'>
				<Video
					source={{ uri: zule.fullZule }}
					style={{ width: windowWidth, height: windowWidth / (16 / 9) }}
					resizeMode='contain'
					controls={true}
				/>
				<ScrollView showsVerticalScrollIndicator={false} overScrollMode='never'>
					<View className='flex justify-start items-start p-3 '>
						<View className='w-full'>
							<Text className='text-xl text-white font-black pb-2 pr-20'>
								{zule.title}
							</Text>

							<View className='flex-row mb-2'>
								<Image
									source={{ uri: zule.teaserThumbnail }}
									style={{
										width: windowWidth / 6,
										height: windowWidth / 6 / (3 / 4)
									}}
									className='rounded mr-2'
								/>
								<View className='p-2 pl-0'>
									<View className='flex-row items-center'>
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
									</View>
									<View style={{ flexDirection: 'row' }}>
										{zule.genre?.map((genre, index) => (
											<Text className='text-neutral-400' key={index}>
												{genre}
												{zule.genre.length - 1 !== index && ' • '}
											</Text>
										))}
									</View>
									<View className='flex-row gap-2'>
										<Text className='text-neutral-400'>{zule.CBFC_rating}</Text>
										<Text className='text-neutral-400'>
											{new Date(zule.createdAt).getFullYear()}
										</Text>
									</View>
								</View>
							</View>
							<Text className='text-justify leading-4 text-sm w-full pb-3'>
								{zule.description}
							</Text>
						</View>

						<View className='w-full bg-slate-50 h-[1px] mb-3'></View>
						<HorizontalCarousel
							items={[...zules].sort(() => Math.random() - 0.5)}
							title={'More like this'}
							itemWidth={windowWidth / 3.5}
							itemHeight={windowWidth / 3.5 / (9 / 16)}
						/>
						<HorizontalCarousel
							items={zules}
							title={'Based on your interests'}
							itemWidth={windowWidth / 3.5}
							itemHeight={windowWidth / 3.5 / (9 / 16)}
						/>
					</View>
				</ScrollView>
			</View>
		</Modal>
	);
};

export default WatchZule;
