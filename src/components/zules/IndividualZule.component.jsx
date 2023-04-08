import { View, Animated, Image, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { cacheContent, getCachedContent } from '../../utils/cacheContent.util';
import IndividualZuleInfo from './IndividualZuleInfo.component';
import { fetchZules } from '../../redux/reducers/zules/zules.slice';
import VideoPlayer from './VideoPlayer.component';
import Header from './Header.component';

const IndividualZule = ({ zule, activeIndex, fetchRandomZules, index }) => {
	const opacityAnimation = useRef(new Animated.Value(1)).current;
	const [hideThumbnail, setHideThumbnail] = useState(false);
	const [currentlyPlayingTeaser, setCurrentlyPlayingTeaser] = useState('');
	// const [currentlyZuleThumbnail, setCurrentlyZuleThumbnail] = useState('');
	const dispatch = useDispatch();

	const { user, zules } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		setHideThumbnail(false);
		if (activeIndex + 2 == zules.length - 1) {
			fetchRandomZules(activeIndex + 1).then((zules) =>
				dispatch(fetchZules(zules))
			);
		}
		if (activeIndex <= zules.length - 3) {
			cacheContent(zules[activeIndex + 1].zuleTeaser, user.token);
			// cacheContent(zules[activeIndex + 1].zuleThumbnail, user.token);
			cacheContent(zules[activeIndex + 2].zuleTeaser, user.token);
			// cacheContent(zules[activeIndex + 2].zuleThumbnail, user.token);
		}
		zules[activeIndex] &&
			getCachedContent(zules[activeIndex].zuleTeaser).then((res) =>
				setCurrentlyPlayingTeaser(res)
			);
		// randomZules[activeIndex] &&
		// 	getCachedContent(randomZules[activeIndex].zuleThumbnail).then((res) =>
		// 		setCurrentlyZuleThumbnail(res)
		// 	);
		// index === activeIndex &&
		// 	setTimeout(() => {
		// 		setHideThumbnail(true);
		// 	}, 3000);
	}, [activeIndex]);
	useEffect(() => {
		Animated.timing(opacityAnimation, {
			toValue: hideThumbnail ? 0 : 1,
			duration: 150,
			useNativeDriver: true
		}).start(() => {
			Animated.timing(opacityAnimation, {
				toValue: !hideThumbnail ? 0 : 1,
				duration: 150,
				useNativeDriver: true
			}).start();
		});
	}, [hideThumbnail]);

	if (!zule) return;

	return (
		<View className='flex-1'>
			<Header />
			<View className='h-screen w-full relative'>
				<Pressable
					className='w-full h-full'
					onPress={() => setHideThumbnail(!hideThumbnail)}
				>
					{!hideThumbnail && (
						<Image
							source={{
								uri: zule.teaserThumbnail
							}}
							className={`w-full h-full transition-opacity`}
						/>
					)}
					<VideoPlayer
						currentlyPlayingTeaser={currentlyPlayingTeaser}
						zule={zule}
						hideThumbnail={hideThumbnail}
						setHideThumbnail={setHideThumbnail}
						paused={!(index === activeIndex && hideThumbnail)}
					/>
				</Pressable>
			</View>
			<IndividualZuleInfo zule={zule} user={user} activeIndex={activeIndex} />
		</View>
	);
};

export default IndividualZule;
