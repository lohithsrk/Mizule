import { View, FlatList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';

import ZuleFeed from '../components/zule/ZuleFeed.component';

import { getRandomZules } from '../axios/zule.axios';
import {
	windowHeight,
	windowWidth,
	base_URL,
	primary_color
} from '../utils/constants.util';
import { cacheVideo, getCachedVideo } from '../utils/cacheVideo.util';
import { AuthContext } from '../context/auth.context';

const Zules = () => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [randomZules, setRandomZules] = useState([]);
	const [zuleOffset, setZuleOffset] = useState(0);
	const [currentPlayingTeaserPath, setCurrentPlayingTeaserPath] = useState('');
	const [isTeaserPaused, setIsTeaserPaused] = useState(true);

	const [user] = useContext(AuthContext);
	useEffect(() => {
		getRandomZules(zuleOffset, user.token).then((res) => {
			const zules = res.data.map((zule) => {
				const zuleTeaser = `${base_URL}/zules/${zule.id_channel}/${zule.id_zule}-teaser.mp4`;
				const fullZule = `${base_URL}/zules/${zule.id_channel}/${zule.id_zule}-zule.mp4`;
				const zuleThumbnail = `${base_URL}/zules/${zule.id_channel}/${zule.id_zule}-thumbnail.jpg`;
				return { ...zule, zuleTeaser, fullZule, zuleThumbnail };
			});
			cacheVideo(zules[1].zuleTeaser);
			getCachedVideo(zules[0].zuleTeaser).then((res) =>
				setCurrentPlayingTeaserPath(res)
			);
			setRandomZules(zules);
		});
	}, []);

	// useEffect(() => {
	// 	getRandomZules(zuleOffset).then((res) =>
	// 		setRandomZules([...randomZules, ...res.data])
	// 	);
	// }, [zuleOffset]);

	useEffect(() => {
		if (selectedIndex >= 1) {
			getCachedVideo(randomZules[selectedIndex].zuleTeaser).then((res) =>
				setCurrentPlayingTeaserPath(res)
			);
		}
		randomZules[selectedIndex + 1] &&
			cacheVideo(randomZules[selectedIndex + 1].zuleTeaser);
	}, [selectedIndex]);

	return (
		<View
			style={{
				width: windowWidth,
				height: windowHeight,
				backgroundColor: primary_color
			}}
		>
			<FlatList
				data={randomZules}
				pagingEnabled
				showsVerticalScrollIndicator={false}
				onScroll={(e) => {
					setSelectedIndex(
						Math.round(e.nativeEvent.contentOffset.y.toFixed(0) / windowHeight)
					);
				}}
				onMomentumScrollEnd={() => setIsTeaserPaused(false)}
				onEndReached={() => {
					setZuleOffset(randomZules.length);
				}}
				renderItem={({ item, index }) => (
					<ZuleFeed
						zule={item}
						index={index}
						currentPlayingTeaserPath={currentPlayingTeaserPath}
						isTeaserPaused={isTeaserPaused}
						selectedIndex={selectedIndex}
						setIsTeaserPaused={setIsTeaserPaused}
					/>
				)}
			/>
		</View>
	);
};

export default Zules;
