import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GestureRecognizer from 'react-native-swipe-gestures';

import { getRandomZules } from '../../axios/zule.axios';
import { base_url, windowWidth } from '../../utils/constants.util';
// import CircularNav from '../../components/extras/CircularNav.component';
import SliderCarousel from '../../components/extras/Carousel.component';
import IndividualZule from '../../components/zules/IndividualZule.component';
import WatchZule from '../../components/zules/WatchZule.component';
import { cacheContent } from '../../utils/cacheContent.util';
import { fetchZules } from '../../redux/reducers/zules/zules.slice';
import Header from '../../components/zules/Header.component';
import LoadingZule from '../../components/zules/LoadingZule.component';

const Zules = ({ navigation }) => {
	const [isWatchZuleOpen, setIsWatchZuleOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	const { user, zules } = useSelector((state) => ({ ...state }));

	const fetchRandomZules = async (zuleOffset) => {
		return await getRandomZules(zuleOffset, user.token).then(async (res) => {
			if (!res.data.length) return;
			const zules = res.data.map((zule) => {
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
			});
			return zules;
		});
	};

	useEffect(() => {
		fetchRandomZules(0).then((zules) => {
			setLoading(false);
			// zules[0] && cacheContent(zules[0].zuleTeaser, user.token);
			// // cacheContent(zules[0].zuleThumbnail, user.token);
			// zules[1] && cacheContent(zules[1].zuleTeaser, user.token);
			// cacheContent(zules[1].zuleThumbnail, user.token);
			// getCachedContent(zules[0].zuleTeaser).then((res) => {
			// 	setCurrentlyPlayingTeaser(res);
			// });
			// getCachedContent(zules[0].zuleTeaser).then((res) => {
			// 	setCurrentlyZuleThumbnail(res);
			// });
			dispatch(fetchZules(zules));
		});
	}, []);

	if (loading) return <LoadingZule />;

	return (
		<View className='bg-black flex-1'>
			<Header />
			<SliderCarousel
				items={zules}
				setActiveIndex={setActiveIndex}
				layout='default'
				itemWidth={windowWidth}
				sliderWidth={windowWidth}
				useScrollView={false}
			>
				{({ item, index }) => (
					<GestureRecognizer
						onSwipeUp={() => setIsWatchZuleOpen(true)}
						className='flex-1'
					>
						<IndividualZule
							zule={item}
							index={index}
							// currentlyPlayingTeaser={currentlyPlayingTeaser}
							// setCurrentlyPlayingTeaser={setCurrentlyPlayingTeaser}
							// currentlyZuleThumbnail={currentlyZuleThumbnail}
							// setCurrentlyZuleThumbnail={setCurrentlyZuleThumbnail}
							activeIndex={activeIndex}
							fetchRandomZules={fetchRandomZules}
						/>
					</GestureRecognizer>
				)}
			</SliderCarousel>
			<WatchZule
				zule={zules[activeIndex]}
				isWatchZuleOpen={isWatchZuleOpen}
				setIsWatchZuleOpen={setIsWatchZuleOpen}
			/>
			{/* <CircularNav navigation={navigation} /> */}
		</View>
	);
};

export default Zules;
