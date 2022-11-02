import { View, Text, Image } from 'react-native';
import React from 'react';

const FollowChannelCard = ({ zule }) => {
	return (
		<View style={{ display: 'flex', flexDirection: 'row', marginBottom: 3 }}>
			<Image
				source={{
					uri: zule.icon
						? zule.icon
						: 'https://img.icons8.com/fluency/96/000000/test-account.png'
				}}
				style={{
					width: 20,
					height: 20,
					borderRadius: 100,
					marginRight: 5
				}}
			/>
			<Text
				style={{ fontWeight: '300', fontSize: 18, textTransform: 'capitalize' }}
			>
				{zule.id_channel}
			</Text>
		</View>
	);
};

export default FollowChannelCard;
