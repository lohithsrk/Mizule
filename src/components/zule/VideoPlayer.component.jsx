import { View, Text } from 'react-native';
import React, { useState } from 'react';
import Video from 'react-native-video';
import Slider from 'react-native-smooth-slider';

import { windowWidth } from '../../utils/constants.util';

const VideoPlayer = ({ uri }) => {
	const [playbackSpeed, setPlaybackSpeed] = useState(1);
	const [resize, setResize] = useState('contain');
	const [videoDuration, setVideoDuration] = useState(1);
	const [currentTime, setCurrentTime] = useState(0);

	return (
		<View
			style={{
				width: windowWidth,
				height: windowWidth / (16 / 9)
			}}
		>
			<Video
				source={{ uri }}
				style={{
					width: windowWidth,
					height: windowWidth / (16 / 9)
				}}
				resizeMode='contain'
				rate={playbackSpeed}
				onLoad={(e) => setVideoDuration(e.duration)}
				onProgress={(e) => setCurrentTime(e.currentTime)}
				// progressUpdateInterval={1}
				repeat
			/>
			<View
				style={{
					position: 'absolute',
					justifyContent: 'flex-end',
					width: windowWidth,
					height: windowWidth / (16 / 9)
				}}
			>
				<Slider
					style={{ width: windowWidth - 30, padding: 10 }}
					minimumValue={0}
					useNativeDriver={true}
					maximumValue={videoDuration}
					minimumTrackTintColor='#FFFFFF'
					maximumTrackTintColor='#000000'
					thumbTintColor='white'
					// onValueChange={(e) => console.log(e)}
					value={currentTime}
					step={0}
				/>
				<Text>{videoDuration}</Text>
			</View>
		</View>
	);
};

export default VideoPlayer;
