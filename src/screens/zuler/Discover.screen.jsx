import {
	View,
	TextInput,
	Image,
	Text,
	ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// import CircularNav from '../../components/extras/CircularNav.component';
import HorizontalCarousel from '../../components/extras/HorizontalCarousel.component';
import { windowWidth } from '../../utils/constants.util';

const Discover = ({ navigation }) => {
	const { zules } = useSelector((state) => ({ ...state }));

	const [query, setQuery] = useState('');
	const items = [
		{
			title: 'Thriller'
		},
		{
			title: 'Love'
		},
		{
			title: 'Comedy'
		},
		{
			title: 'Music'
		},
		{
			title: 'Entertainment'
		}
	];

	return (
		<View className='flex-1 w-full bg-black justify-start items-center p-4 '>
			<View className='flex flex-row justify-start items-center bg-stone-800 rounded-lg pl-3 w-full'>
				<Image className='w-5 h-5 ' source={require('../../assets/search.png')} />

				<TextInput
					className=' font-normal text-xs placeholder:text-xs h-9  pl-2 text-white '
					placeholder='Discover your favorite Zules '
					onChangeText={(e) => setQuery(e)}
					autoCapitalize='none'
					autoCorrect={false}
				/>
			</View>

			<View>
				{items && (
					<View className='flex flex-row py-4 '>
						<ScrollView
							horizontal={true}
							showsHorizontalScrollIndicator={false}
						>
							<View className='bg-white  rounded-xl px-3 py-1 mx-1'>
								<Text className='text-base text-black'>All</Text>
							</View>
							{items.map((item, i) => {
								return (
									<View
										className='bg-stone-800  rounded-lg px-3 py-1 mx-1'
										key={i}
									>
										<Text className='text-base text-white'>{item.title}</Text>
									</View>
								);
							})}
						</ScrollView>
					</View>
				)}
			</View>
			<View>
				<ScrollView overScrollMode='never' showsVerticalScrollIndicator={false}>
					<HorizontalCarousel
						items={zules}
						hideTitle={true}
						title='Follower Zule Spots'
						itemWidth={64}
						itemHeight={64}
					/>
					<HorizontalCarousel
						items={zules}
						title='Trending'
						itemWidth={windowWidth / 3.5}
						itemHeight={windowWidth / 3.5 / (9 / 16)}
					/>
					<HorizontalCarousel
						items={zules}
						title='Trending'
						itemWidth={windowWidth / 3.5}
						itemHeight={windowWidth / 3.5 / (9 / 16)}
					/>
					<HorizontalCarousel
						items={zules}
						title='Trending'
						itemWidth={windowWidth / 3.5}
						itemHeight={windowWidth / 3.5 / (9 / 16)}
					/>
					<HorizontalCarousel
						items={zules}
						title='Trending'
						itemWidth={windowWidth / 3.5}
						itemHeight={windowWidth / 3.5 / (9 / 16)}
					/>
				</ScrollView>
			</View>
			{/* <CircularNav navigation={navigation} /> */}
		</View>
	);
};

export default Discover;
