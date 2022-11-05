import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { windowWidth } from '../../utils/constants.util';

import FollowChannelCard from '../channel/FollowChannelCard.component';
import CommentSectionModal from './CommentSectionModal.component';

const ZuleInfoCard = ({ setIsTeaserPaused, zule, index, selectedIndex }) => {
	const { navigate } = useNavigation();

	const [isCommentsSectionOpen, setIsCommentsSectionOpen] = useState(false);

	return (
		<View
			style={{
				width: windowWidth,
				position: 'absolute',
				left: 0,
				zIndex: 10,
				bottom: 0,
				paddingBottom: 10,
				paddingTop: 5,
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'flex-end'
			}}
		>
			<View
				style={{
					paddingHorizontal: 15
				}}
			>
				<Text
					style={{
						fontWeight: '700',
						fontSize: 25,
						marginBottom: 3
					}}
				>
					{zule.title}
				</Text>
				<FollowChannelCard zule={zule} />
				{/* <Text
					style={{
						fontWeight: '300',
						fontSize: 16,
						paddingBottom: 5
					}}
				>
					{zule.description}
				</Text> */}
			</View>
			<View style={{ display: 'flex', alignItems: 'flex-end' }}>
				{/* https://img.icons8.com/ios/100/000000/like--v1.png*/}
				{/* https://img.icons8.com/ios-filled/100/000000/like--v1.png
				 */}

				<View style={{ display: 'flex', marginBottom: 2 }}>
					<TouchableOpacity
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginBottom: 5
						}}
					>
						<Image
							source={{
								uri: 'https://img.icons8.com/ios/50/ffffff/visible--v1.png'
							}}
							style={{ width: 25, height: 25 }}
						/>
						<Text>{zule.views}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginBottom: 5
						}}
					>
						<Image
							source={{
								uri: 'https://img.icons8.com/ios/100/ffffff/like--v1.png'
							}}
							style={{ width: 25, height: 25 }}
						/>
						<Text>
							{zule.reviews_zules
								? zule.reviews_zules.likes
								: 0}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginHorizontal: 20,
							marginBottom: 5
						}}
						onPress={() => {
							setIsCommentsSectionOpen(true);
							setIsTeaserPaused(true);
						}}
					>
						<Image
							source={{
								uri: 'https://img.icons8.com/ios/100/ffffff/messaging-.png'
							}}
							style={{ width: 25, height: 25 }}
						/>
						<Text>
							{zule.reviews_zules
								? zule.reviews_zules.comments.length
								: 0}
						</Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity onPress={() => navigate('WatchZule', { zule })}>
					<Text
						style={{
							backgroundColor: '#37AA9C',
							paddingVertical: 8,
							paddingHorizontal: 15,
							fontSize: 20,
							fontWeight: '500',
							borderRadius: 8,
							textAlign: 'center',
							marginHorizontal: 15,
							marginBottom: 5
						}}
					>
						Watch Zule
					</Text>
				</TouchableOpacity>
			</View>
			{index === selectedIndex && (
				<CommentSectionModal
					isCommentsSectionOpen={isCommentsSectionOpen}
					setIsCommentsSectionOpen={setIsCommentsSectionOpen}
					zule={zule}
				/>
			)}
		</View>
	);
};

export default ZuleInfoCard;
