import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ImageBackground,
	ScrollView
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { base_url, windowWidth } from '../../utils/constants.util';
import BottomSheet from 'react-native-simple-bottom-sheet';
import { useSelector, useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import { logoutUser } from '../../redux/reducers/users/user.slice';
import { getTeaserHistory, getLiked } from '../../axios/user.axios';

const Profile = ({ navigation }) => {
	const panelRef = useRef(null);
	const types = [
		// { name: 'Watch later', slug: 'watchlater' },
		// { name: 'Downloads', slug: 'downloads' },
		{ name: 'Liked', slug: 'liked' },
		{ name: 'History', slug: 'history' }
	];
	const [selectedType, setSelectedType] = useState('liked');

	const [history, setHistory] = useState([]);
	const [liked, setLiked] = useState([]);

	const { user } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	useEffect(() => {
		getTeaserHistory(user.id_user, user.token).then(({ data }) =>
			setHistory(
				data.map((zule) => {
					const zuleTeaser = `${base_url}/zules/${zule.id_zuleSpot}/${user.id_user}/${zule.title}-teaser.mp4`;
					const fullZule = `${base_url}/zules/${zule.id_zuleSpot}/${user.id_user}/${zule.title}-zule.mp4`;
					const zuleThumbnail = `${base_url}/zules/${zule.id_zuleSpot}/${user.id_user}/${zule.title}-zule-thumbnail.jpg`;
					const teaserThumbnail = `${base_url}/zules/${zule.id_zuleSpot}/${user.id_user}/${zule.title}-teaser-thumbnail.jpg`;
					return {
						...zule,
						zuleTeaser,
						fullZule,
						zuleThumbnail,
						teaserThumbnail
					};
				})
			)
		);
		getLiked(user.id_user, user.token).then(({ data }) =>
			setLiked(
				data.map((zule) => {
					const zuleTeaser = `${base_url}/zules/${zule.id_zuleSpot}/${user.id_user}/${zule.title}-teaser.mp4`;
					const fullZule = `${base_url}/zules/${zule.id_zuleSpot}/${user.id_user}/${zule.title}-zule.mp4`;
					const zuleThumbnail = `${base_url}/zules/${zule.id_zuleSpot}/${user.id_user}/${zule.title}-zule-thumbnail.jpg`;
					const teaserThumbnail = `${base_url}/zules/${zule.id_zuleSpot}/${user.id_user}/${zule.title}-teaser-thumbnail.jpg`;
					return {
						...zule,
						zuleTeaser,
						fullZule,
						zuleThumbnail,
						teaserThumbnail
					};
				})
			)
		);
	}, []);

	return (
		<View className='flex-1 bg-black p-3'>
			<View className='flex flex-row justify-between items-center '>
				<View className='bg-opacity-40'>
					<Image
						source={require('../../assets/logo.png')}
						className='w-36 h-8'
					/>
				</View>
				<View
					className='flex flex-row justify-around'
					style={{ width: windowWidth / 5 }}
				>
					{/* <TouchableOpacity
						onPress={() => {
							navigation.navigate('Discover');
						}}
					>
						<Image
							className='w-5 h-5'
							source={require('../../assets/Notification.png')}
						/>
					</TouchableOpacity> */}
					<TouchableOpacity onPress={() => panelRef.current.togglePanel()}>
						<Image
							className='w-5 h-5 pr-3'
							source={require('../../assets/Setting.png')}
						/>
					</TouchableOpacity>
				</View>
			</View>
			<View className='flex flex-row items-center pt-6 pb-6'>
				<Image
					className=' rounded-3xl w-20 h-20 overflow-hidden'
					source={{
						uri: user.icon
					}}
				/>
				<View className='pl-3'>
					<Text className='font-medium text-xl text-white'>{user.name}</Text>
					{!user.zuleSpot ? (
						<TouchableOpacity onPress={() => navigation.navigate('ZuleSpot')}>
							<Text className='text-base font-normal text-center text-white'>
								Visit my Zulespot
							</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							onPress={() =>
								navigation.navigate('ZuleSpot', { screen: 'CreateZuleSpot' })
							}
						>
							<Text className='text-base font-normal text-center text-white'>
								Create Your Zulespot
							</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
			<View className='pb-6'>
				<View
					className='flex flex-row justify-between items-center bg-zinc-800 rounded-lg p-2'
					style={{ width: windowWidth - 24 }}
				>
					{/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
					{types.map((item, i) => (
						<TouchableOpacity
							onPress={() => setSelectedType(item.slug)}
							key={i}
							className={`flex-1 justify-center items-center rounded ${
								item.slug === selectedType
									? 'bg-white text-black'
									: 'text-white'
							}`}
						>
							<Text
								className={`text-base font-bold rounded-lg p-2 ${
									item.slug === selectedType
										? 'bg-white text-black'
										: 'text-white'
								}`}
							>
								{item.name}
							</Text>
						</TouchableOpacity>
					))}
					{/* </ScrollView> */}
				</View>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View className='flex-1 flex-row flex-wrap w-full h-screen'>
						{selectedType === 'liked' &&
							(liked.length > 0 ? (
								liked.map((item, i) => (
									<ImageBackground
										className='bg-neutral-800 mr-3 rounded-lg overflow-hidden justify-end mt-5'
										source={{
											uri: item.teaserThumbnail
										}}
										style={{
											width: windowWidth / 3.5,
											height: windowWidth / 3.5 / (9 / 16)
										}}
										key={i}
									>
										<LinearGradient
											colors={['#000', '#000000af', '#0000009f', 'transparent']}
											locations={[0, 0.4, 0.6, 1]}
											start={{ x: 0, y: 1 }}
											end={{ x: 0, y: 0 }}
											className='pt-3 px-2'
										>
											<Text className='font-black'>{item.title}</Text>
										</LinearGradient>
									</ImageBackground>
								))
							) : (
								<Text className='text-center mt-5 text-white font-medium text-base'>
									You haven't liked any zules
								</Text>
							))}
						{selectedType === 'history' &&
							(history.length > 0 ? (
								history.map((item, i) => (
									<ImageBackground
										className='bg-neutral-800 mr-3 rounded-lg overflow-hidden justify-end mt-5'
										source={{
											uri: item.teaserThumbnail
										}}
										style={{
											width: windowWidth / 3.5,
											height: windowWidth / 3.5 / (9 / 16)
										}}
										key={i}
									>
										<LinearGradient
											colors={['#000', '#000000af', '#0000009f', 'transparent']}
											locations={[0, 0.4, 0.6, 1]}
											start={{ x: 0, y: 1 }}
											end={{ x: 0, y: 0 }}
											className='pt-3 px-2'
										>
											<Text className='font-black'>{item.title}</Text>
										</LinearGradient>
									</ImageBackground>
								))
							) : (
								<Text className='text-center mt-5 text-white font-medium text-base'>
									You haven't watched any zules yet
								</Text>
							))}
					</View>
				</ScrollView>
			</View>
			{/* {cardType == 'Downloads' ? (
				<SliderCarousel
					items={DownloadZules}
					setActiveIndex={setActiveIndex}
					layout='default'
					itemWidth={400}
					sliderWidth={windowWidth}
				>
					{({ item, index }) => {
						return <ProfileCarousel item={item} />;
					}}
				</SliderCarousel>
			) : cardType == 'Liked Zules' ? (
				<SliderCarousel
					items={likedZules}
					setActiveIndex={setActiveIndex}
					layout='default'
					itemWidth={400}
					sliderWidth={windowWidth}
				>
					{({ item, index }) => {
						return <ProfileCarousel item={item} />;
					}}
				</SliderCarousel>
			) : cardType == 'WatchLater' ? (
				<SliderCarousel
					items={likedZules}
					setActiveIndex={setActiveIndex}
					layout='default'
					itemWidth={400}
					sliderWidth={windowWidth}
				>
					{({ item, index }) => {
						return <ProfileCarousel item={item} />;
					}}
				</SliderCarousel>
			) : (
				<SliderCarousel
					items={likedZules}
					setActiveIndex={setActiveIndex}
					layout='default'
					itemWidth={400}
					sliderWidth={windowWidth}
				>
					{({ item, index }) => {
						return <ProfileCarousel item={item} />;
					}}
				</SliderCarousel>
			)} */}
			<BottomSheet
				ref={(ref) => (panelRef.current = ref)}
				isOpen={false}
				sliderMinHeight={0}
				animationDuration={300}
				wrapperStyle={{ backgroundColor: '#1f1f1f' }}
			>
				<View className='flex justify-center items-center relative'>
					{/* <TouchableOpacity className='flex justify-center items-center'>
						<Text className='text-white font-semibold text-lg px-5 pb-3'>
							Language preference
						</Text>
						<View className='flex  bg-neutral-800 w-60 px-5 h-[0.7px]'></View>
					</TouchableOpacity>
					<TouchableOpacity className='flex justify-center items-center'>
						<Text className='text-white font-semibold text-lg px-5 pb-3 pt-3'>
							Multiple Account
						</Text>
						<View className='flex  bg-neutral-800 w-60 px-5 h-[0.8px]'></View>
					</TouchableOpacity>
					<TouchableOpacity className='flex justify-center items-center'>
						<Text className='text-white font-semibold text-lg px-5 pb-3 pt-3'>
							Parental control
						</Text>
						<View className='flex  bg-neutral-800 w-60 px-5 h-[0.8px]'></View>
					</TouchableOpacity> */}
					<TouchableOpacity
						className='flex justify-center items-center'
						onPress={() => dispatch(logoutUser())}
					>
						<Text className='text-white font-semibold text-lg px-5 pb-4 pt-3'>
							Sign Out
						</Text>
					</TouchableOpacity>
				</View>
			</BottomSheet>
		</View>
	);
};

export default Profile;
