import { View, FlatList, Text } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';

import ZuleFeed from '../components/zule/ZuleFeed.component';

import {
	windowHeight,
	windowWidth,
	primary_color
} from '../utils/constants.util';
import { cacheVideo, getCachedVideo } from '../utils/cacheVideo.util';
import { ZulesContext } from '../context/zules.context';

const Zules = () => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [zuleOffset, setZuleOffset] = useState(0);
	const [isTeaserPaused, setIsTeaserPaused] = useState(true);

	const { fetchRandomZules, randomZules, currentPlayingTeaserPath } =
		useContext(ZulesContext);

	useEffect(() => {
		fetchRandomZules(zuleOffset);
	}, [zuleOffset]);

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
