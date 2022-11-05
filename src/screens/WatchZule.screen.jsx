import { View, Text, StatusBar, Image } from 'react-native';
import React from 'react';
import Video from 'react-native-video';

import { primary_color, windowWidth } from '../utils/constants.util';

const WatchZule = ({ route }) => {
	const { zule } = route.params;
	return (
		<View
			style={{
				backgroundColor: primary_color,
				paddingTop: StatusBar.currentHeight,
				flex: 1
			}}
		>
			<Video
				source={{ uri: zule.fullZule }}
				style={{ width: windowWidth, height: windowWidth / (16 / 9) }}
				resizeMode='contain'
				controls={true}
				muted
			/>
			<View style={{ display: 'flex', flexDirection: 'row', padding: 15 }}>
				<Image
					source={{ uri: zule.zuleThumbnail }}
					style={{ width: 70, height: 70 * (16 / 9) }}
				/>
				<View>
					<Text>{zule.title}</Text>
					<View style={{ flexDirection: 'row' }}>
						{zule.category?.map((category, index) => (
							<Text>
								{category}
								{zule.category.length - 1 !== index && ' • '}
							</Text>
						))}
					</View>
					<Text>{zule.CBFC_rating}</Text>
					<Text>{new Date(zule.created_at).getFullYear()}</Text>
				</View>
			</View>
			<Text style={{ marginTop: 10 }}>{zule.description}</Text>
		</View>
	);
};

export default WatchZule;
