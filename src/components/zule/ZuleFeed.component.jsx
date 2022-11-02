import { View, TouchableOpacity, Image } from 'react-native';
import React from 'react';

import Video from 'react-native-video';

import {
	windowHeight,
	windowWidth,
	primary_color
} from '../../utils/constants.util';

import ZuleInfoCard from './ZuleInfoCard.component';

const ZuleFeed = ({
	currentPlayingTeaserPath,
	index,
	zule,
	isTeaserPaused,
	selectedIndex,
	setIsTeaserPaused
}) => {
	return (
		<View
			style={{
				backgroundColor: primary_color,
				width: windowWidth,
				height: windowHeight,
				position: 'relative',
			}}
		>
			<TouchableOpacity
				onPress={() => setIsTeaserPaused(!isTeaserPaused)}
				style={{ backgroundColor: primary_color }}
				activeOpacity={1}
			>
				{currentPlayingTeaserPath && (
						<Video
							source={{
								uri: currentPlayingTeaserPath
							}}
							style={{
								width: windowWidth,
								height: windowHeight
							}}
							resizeMode='cover'
							paused={
								selectedIndex === index ? (isTeaserPaused ? true : false) : true
							}
						/>
				)}
				<View
					style={{
						width: windowWidth / 4,
						height: windowWidth / 4,
						opacity: isTeaserPaused ? 1 : 0,
						position: 'absolute',
						top: windowHeight / 2,
						left: windowWidth / 2,
						transform: [{ translateX: -50 }, { translateY: -65 }],
						borderRadius: 100
					}}
				>
					<Image
						source={{
							uri: 'https://img.icons8.com/material-rounded/96/000000/play-button-circled--v1.png'
						}}
						style={{
							width: windowWidth / 3.5,
							height: windowWidth / 3.5,
							borderRadius: 100,
							opacity: 0.5
						}}
					/>
				</View>
			</TouchableOpacity>

			<ZuleInfoCard
				isTeaserPaused={isTeaserPaused}
				zule={zule}
				setIsTeaserPaused={setIsTeaserPaused}
				index={index}
				selectedIndex={selectedIndex}
			/>
		</View>
	);
};

export default ZuleFeed;
